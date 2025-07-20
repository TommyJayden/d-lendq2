import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { firebaseAuth, firebaseDB } from '../firebaseConfig';
import { auth } from '../firebaseConfig'; // Ensure this is the correct import for your auth
import { doc, getDoc } from 'firebase/firestore';

export default function UserProfileScreen({ navigation }) {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const docRef = doc(db, 'users', auth.currentUser?.uid || '');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>👤 My Profile</Text>

      {userData ? (
        <>
          <View style={styles.profileBox}>
            <Text style={styles.label}>Full Name:</Text>
            <Text style={styles.value}>{userData.fullName}</Text>

            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{auth.currentUser?.email}</Text>

            <Text style={styles.label}>KYC Status:</Text>
            <Text style={[styles.value, { color: userData.kycVerified ? 'green' : 'red' }]}>
              {userData.kycVerified ? '✅ Verified' : '❌ Not Verified'}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('KYCFormScreen')}
          >
            <Text style={styles.buttonText}>
              {userData.kycVerified ? 'View KYC Info' : 'Complete KYC'}
            </Text>
          </TouchableOpacity>

          {/* Optional Credit Boost Tracker */}
          <View style={styles.creditBox}>
            <Text style={styles.label}>📈 Credit Boost Progress:</Text>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBarFill, { width: '50%' }]} /> 
            </View>
            <Text style={styles.creditText}>3 of 6 on-time payments</Text>
          </View>
        </>
      ) : (
        <Text>Loading profile...</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f9ff',
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 20,
  },
  profileBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 2,
    marginBottom: 20,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    marginTop: 10,
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#111',
    marginTop: 2,
  },
  button: {
    backgroundColor: '#003366',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  creditBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 2,
  },
  progressBarContainer: {
    height: 10,
    width: '100%',
    backgroundColor: '#ccc',
    borderRadius: 5,
    marginTop: 8,
    marginBottom: 5,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#0066cc',
    borderRadius: 5,
  },
  creditText: {
    color: '#555',
    fontSize: 14,
  },
});
