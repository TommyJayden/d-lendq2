import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { firebaseAuth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProfileScreen'>;

export default function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = firebaseAuth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(firebaseAuth);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Logout Failed', (error as Error).message);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#90CAF9" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.center}>
        <Text style={{ color: '#FFF' }}>No user found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>👤 Profile</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Full Name</Text>
        <Text style={styles.value}>{user.displayName || 'N/A'}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user.email}</Text>

        <Text style={styles.label}>UID</Text>
        <Text style={styles.value}>{user.uid}</Text>
      </View>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>🚪 Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#201E2E',
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#2C2A3A',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  label: {
    fontSize: 14,
    color: '#B0BEC5',
    marginTop: 10,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ECEFF1',
    marginBottom: 10,
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#FF3B30',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
