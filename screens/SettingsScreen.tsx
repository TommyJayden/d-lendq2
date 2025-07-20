import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { firebaseAuth, firebaseDB } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation'; // Make sure you create this type file

type SettingsScreenNavProp = NativeStackNavigationProp<
  RootStackParamList,
  'Settings'
>;

export default function SettingsScreen() {
  const navigation = useNavigation<SettingsScreenNavProp>();
  const [userData, setUserData] = useState<any>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = firebaseAuth.currentUser;
        if (!user) return;

        const docRef = doc(firebaseDB, 'users', user.uid);
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

  const handleLogout = async () => {
    try {
      await signOut(firebaseAuth);
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Logout Failed', 'Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>

      {userData && (
        <View style={styles.card}>
          <Text style={styles.label}>👤 {userData.fullName || 'User'}</Text>
          <Text style={styles.subtext}>{firebaseAuth.currentUser?.email}</Text>
        </View>
      )}

      <View style={styles.card}>
        <Text style={styles.label}>🛡️ KYC Status:</Text>
        <Text style={styles.subtext}>
          {userData?.kycVerified ? '✅ Verified' : '❌ Not Verified'}
        </Text>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('KYCFormScreen')}
        >
          <Text style={styles.primaryButtonText}>
            {userData?.kycVerified ? 'View KYC' : 'Submit KYC'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>🔔 Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#ccc', true: '#007bff' }}
            thumbColor={notificationsEnabled ? '#0051a3' : '#888'}
          />
        </View>
      </View>

      <View style={styles.card}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('ContactUsScreen')}
        >
          <Text style={styles.secondaryButtonText}>📞 Contact Us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('HowItWorksScreen')}
        >
          <Text style={styles.secondaryButtonText}>📘 How It Works</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>🚪 Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#201E2E', // Dark theme background
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF', // White text for contrast
    marginBottom: 25,
  },
  card: {
    backgroundColor: '#2C2A3A', // Dark card background
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  subtext: {
    fontSize: 14,
    color: '#CCCCCC',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#00B2A9',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#44425A', // Solid secondary background
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  secondaryButtonText: {
    color: '#FFFFFF', // White text for better contrast
    textAlign: 'center',
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 10,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
  },
});

