import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { firebaseAuth, firebaseDB } from '../firebaseConfig'; // Adjust the import path as needed
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing Info', 'Please enter email and password');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
      const user = userCredential.user;
      console.log('✅ Logged in:', user.email);

      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    } catch (err: any) {
      console.error('Login error:', err);
      Alert.alert('Login Failed', err.message || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
        placeholderTextColor="#ccc"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        onChangeText={setPassword}
        value={password}
        placeholderTextColor="#ccc"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#201E2E',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 36,
    alignSelf: 'center',
    color: '#fff',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#00B2A9',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#ffffff',
    color: '#000000',
  },
  button: {
    backgroundColor: '#00B2A9',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  linkText: {
    marginTop: 20,
    color: '#fff',
    textAlign: 'center',
  },
  link: {
    marginTop: 16,
    textAlign: 'center',
  },
});
