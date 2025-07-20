import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { firebaseAuth } from '../firebaseConfig';
import { Picker } from '@react-native-picker/picker';

export default function KYCFormScreen() {
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [dobMonth, setDobMonth] = useState('');
  const [dobDay, setDobDay] = useState('');
  const [dobYear, setDobYear] = useState('');
  const [ssn, setSsn] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [citizenship, setCitizenship] = useState('');
  const [employment, setEmployment] = useState('');
  const [idType, setIdType] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [stateOfIssuance, setStateOfIssuance] = useState('');
  const [idImage, setIdImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [selfieImage, setSelfieImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);

  const storage = getStorage();
  const db = getFirestore();

  const pickImage = async (type: 'id' | 'selfie') => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please allow access to media library.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      type === 'id' ? setIdImage(result.assets[0]) : setSelfieImage(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    const dob = `${dobMonth}/${dobDay}/${dobYear}`;

    if (
      !fullName.trim() || !dobMonth || !dobDay || !dobYear || !ssn.trim() || !address.trim() ||
      !email.trim() || !phone.trim() || !citizenship || !employment || !idType || !idNumber.trim() ||
      !stateOfIssuance || !idImage || !selfieImage || !consent
    ) {
      Alert.alert('Missing Info', 'Please complete all fields and upload required images.');
      return;
    }

    try {
      setLoading(true);
      const user = firebaseAuth.currentUser;
      if (!user) throw new Error('User not authenticated');

      const timestamp = Date.now();
      const idRef = ref(storage, `kyc_docs/${user.uid}/${timestamp}_id.jpg`);
      const selfieRef = ref(storage, `kyc_docs/${user.uid}/${timestamp}_selfie.jpg`);

      const idBlob = await (await fetch((idImage as ImagePicker.ImagePickerAsset).uri)).blob();
      await uploadBytes(idRef, idBlob);
      const idImageUrl = await getDownloadURL(idRef);

      const selfieBlob = await (await fetch((selfieImage as ImagePicker.ImagePickerAsset).uri)).blob();
      await uploadBytes(selfieRef, selfieBlob);
      const selfieImageUrl = await getDownloadURL(selfieRef);

      await addDoc(collection(db, 'kyc'), {
        userId: user.uid,
        fullName,
        dob,
        ssn,
        address,
        email,
        phone,
        citizenship,
        employment,
        idType,
        idNumber,
        stateOfIssuance,
        idImageUrl,
        selfieImageUrl,
        submittedAt: new Date(),
        consent,
      });

      Alert.alert('KYC Submitted', 'Your KYC information has been successfully submitted.');
      resetForm();
    } catch (error: any) {
      console.log('KYC ERROR:', error);
      Alert.alert('Submission Failed', error.message || 'Unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFullName('');
    setDobMonth('');
    setDobDay('');
    setDobYear('');
    setSsn('');
    setAddress('');
    setEmail('');
    setPhone('');
    setCitizenship('');
    setEmployment('');
    setIdType('');
    setIdNumber('');
    setStateOfIssuance('');
    setIdImage(null);
    setSelfieImage(null);
    setConsent(false);
    setStep(1);
  };

  const BackButton = () =>
    step > 1 && (
      <TouchableOpacity style={styles.backButton} onPress={() => setStep(step - 1)}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
    );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <TextInput placeholder="Full Name" style={styles.input} value={fullName} onChangeText={setFullName} />
            <Text style={{ marginBottom: 4, color: '#fff' }}>Date of Birth</Text>
            <View style={styles.row}>
              <View style={[styles.pickerWrapper, styles.flex1]}>
                <Picker selectedValue={dobMonth} onValueChange={setDobMonth}>
                  <Picker.Item label="Month" value="" />
                  {Array.from({ length: 12 }, (_, i) => {
                    const val = String(i + 1).padStart(2, '0');
                    return <Picker.Item key={val} label={val} value={val} />;
                  })}
                </Picker>
              </View>
              <View style={[styles.pickerWrapper, styles.flex1]}>
                <Picker selectedValue={dobDay} onValueChange={setDobDay}>
                  <Picker.Item label="Day" value="" />
                  {Array.from({ length: 31 }, (_, i) => {
                    const val = String(i + 1).padStart(2, '0');
                    return <Picker.Item key={val} label={val} value={val} />;
                  })}
                </Picker>
              </View>
              <View style={[styles.pickerWrapper, styles.flex1]}>
                <Picker selectedValue={dobYear} onValueChange={setDobYear}>
                  <Picker.Item label="Year" value="" />
                  {Array.from({ length: 70 }, (_, i) => {
                    const year = 2007 - i;
                    return <Picker.Item key={year} label={`${year}`} value={`${year}`} />;
                  })}
                </Picker>
              </View>
            </View>
            <TextInput
              placeholder="SSN (Last 4 digits)"
              style={styles.input}
              value={ssn}
              onChangeText={setSsn}
              keyboardType="numeric"
              maxLength={4}
            />
            <TouchableOpacity style={styles.submitButton} onPress={() => setStep(2)}>
              <Text style={styles.submitText}>Next</Text>
            </TouchableOpacity>
          </>
        );
      case 2:
        return (
          <>
            <TextInput placeholder="Residential Address" style={styles.input} value={address} onChangeText={setAddress} />
            <TextInput placeholder="Email Address" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
            <TextInput placeholder="Phone Number" style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
            <View style={styles.pickerWrapper}>
              <Picker selectedValue={citizenship} onValueChange={setCitizenship}>
                <Picker.Item label="Select Citizenship/Residency" value="" />
                <Picker.Item label="U.S. Citizen" value="us_citizen" />
                <Picker.Item label="Permanent Resident" value="permanent_resident" />
                <Picker.Item label="Non-Resident Alien" value="non_resident" />
              </Picker>
            </View>
            <View style={styles.pickerWrapper}>
              <Picker selectedValue={employment} onValueChange={setEmployment}>
                <Picker.Item label="Select Employment Status" value="" />
                <Picker.Item label="Employed" value="employed" />
                <Picker.Item label="Self-Employed" value="self_employed" />
                <Picker.Item label="Unemployed" value="unemployed" />
                <Picker.Item label="Student" value="student" />
                <Picker.Item label="Retired" value="retired" />
              </Picker>
            </View>
            {BackButton()}
            <TouchableOpacity style={styles.submitButton} onPress={() => setStep(3)}>
              <Text style={styles.submitText}>Next</Text>
            </TouchableOpacity>
          </>
        );
      case 3:
        return (
          <>
            <View style={styles.pickerWrapper}>
              <Picker selectedValue={idType} onValueChange={setIdType}>
                <Picker.Item label="Select ID Type" value="" />
                <Picker.Item label="Driver's License" value="driver_license" />
                <Picker.Item label="Passport" value="passport" />
                <Picker.Item label="State ID" value="state_id" />
                <Picker.Item label="Military ID" value="military_id" />
              </Picker>
            </View>
            <TextInput placeholder="ID Number" style={styles.input} value={idNumber} onChangeText={setIdNumber} />
            <View style={styles.pickerWrapper}>
              <Picker selectedValue={stateOfIssuance} onValueChange={setStateOfIssuance}>
                <Picker.Item label="Select State of Issuance" value="" />
                {[
                  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
                  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
                  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
                  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
                  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
                  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
                  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
                ].map(state => (
                  <Picker.Item key={state} label={state} value={state} />
                ))}
              </Picker>
            </View>
            {BackButton()}
            <TouchableOpacity style={styles.submitButton} onPress={() => setStep(4)}>
              <Text style={styles.submitText}>Next</Text>
            </TouchableOpacity>
          </>
        );
      case 4:
        return (
          <>
            <TouchableOpacity style={styles.uploadButton} onPress={() => pickImage('id')}>
              <Text style={styles.uploadText}>{idImage ? 'Change ID Image' : 'Upload ID Image'}</Text>
            </TouchableOpacity>
            {idImage && <Image source={{ uri: idImage.uri }} style={styles.imagePreview} />}
            <TouchableOpacity style={styles.uploadButton} onPress={() => pickImage('selfie')}>
              <Text style={styles.uploadText}>{selfieImage ? 'Change Selfie' : 'Upload Selfie Photo'}</Text>
            </TouchableOpacity>
            {selfieImage && <Image source={{ uri: selfieImage.uri }} style={styles.imagePreview} />}
            {BackButton()}
            <TouchableOpacity style={styles.submitButton} onPress={() => setStep(5)}>
              <Text style={styles.submitText}>Next</Text>
            </TouchableOpacity>
          </>
        );
      case 5:
        return (
          <>
            <TouchableOpacity onPress={() => setConsent(!consent)} style={{ marginBottom: 16 }}>
              <Text style={{ color: consent ? '#1976d2' : '#999' }}>
                {consent ? '☑' : '☐'} I agree to the terms and authorize identity verification.
              </Text>
            </TouchableOpacity>
            {BackButton()}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitText}>Submit</Text>}
            </TouchableOpacity>
          </>
        );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>KYC Verification (Step {step} of 5)</Text>
      {renderStep()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#201E2E',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#00B2A9',
  },
  input: {
    backgroundColor: '#fff',
    color: '#000',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    borderRadius: 6,
  },
  pickerWrapper: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 16,
    overflow: 'hidden',
  },
  uploadButton: {
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadText: {
    color: '#333',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: '#00B2A9',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    marginBottom: 12,
  },
  backText: {
    color: '#00B2A9',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  flex1: {
    flex: 1,
    marginRight: 8,
  },
});
