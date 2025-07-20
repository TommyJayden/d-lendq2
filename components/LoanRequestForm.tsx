import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { firebaseAuth, firebaseFirestore } from '../firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function LoanRequestForm() {
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [income, setIncome] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const loanAmount = parseFloat(amount);
    const incomeAmount = parseFloat(income);

    if (!loanAmount || !reason.trim() || !incomeAmount) {
      Alert.alert('Error', 'Please fill all fields correctly.');
      return;
    }

    if (loanAmount < 50 || loanAmount > 300) {
      Alert.alert('Invalid Amount', 'Loan must be between $50 and $300');
      return;
    }

    if (incomeAmount < 300) {
      Alert.alert('Ineligible', 'Minimum income to request a loan is $300');
      return;
    }

    const user = firebaseAuth.currentUser;
    if (!user) {
      Alert.alert('Error', 'User not logged in');
      return;
    }

    setLoading(true);
    try {
      const loanRef = collection(firebaseFirestore, 'loanRequests');
      await addDoc(loanRef, {
        userId: user.uid,
        amount: loanAmount,
        reason: reason.trim(),
        income: incomeAmount,
        status: 'pending',
        createdAt: Timestamp.now(),
      });

      Alert.alert('Success', 'Loan request submitted!');
      setAmount('');
      setReason('');
      setIncome('');
    } catch (error) {
      console.error('Loan request error:', error);
      Alert.alert('Error', 'Failed to submit loan request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.wrapper}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>💸 Request a Loan</Text>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Amount ($50 - $300)"
          value={amount}
          onChangeText={setAmount}
          placeholderTextColor="#666"
        />

        <TextInput
          style={styles.input}
          placeholder="Reason for Loan"
          value={reason}
          onChangeText={setReason}
          placeholderTextColor="#666"
        />

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Monthly Income ($)"
          value={income}
          onChangeText={setIncome}
          placeholderTextColor="#666"
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Submit Loan Request</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#1A1925', // dark background
  },
  container: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#ffffff',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#ffffff', // white input field
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    color: '#000000',
  },
  button: {
    backgroundColor: '#00B2A9',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
