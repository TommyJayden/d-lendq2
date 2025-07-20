import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function HowItWorksScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📘 How D‑LendQ Works</Text>

      <Text style={styles.sectionTitle}>1. Sign Up</Text>
      <Text style={styles.text}>Create an account with your email and complete your profile.</Text>

      <Text style={styles.sectionTitle}>2. Complete KYC</Text>
      <Text style={styles.text}>Verify your identity by submitting your KYC information.</Text>

      <Text style={styles.sectionTitle}>3. Request a Loan</Text>
      <Text style={styles.text}>Choose a loan amount and submit your request. You'll receive a decision instantly.</Text>

      <Text style={styles.sectionTitle}>4. Repay on Time</Text>
      <Text style={styles.text}>Make weekly or bi-weekly payments. Timely repayments help you build credit.</Text>

      <Text style={styles.sectionTitle}>5. Grow Your Limit</Text>
      <Text style={styles.text}>The more you repay responsibly, the higher your loan limit grows.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f9ff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#003366',
    marginTop: 15,
    marginBottom: 5,
  },
  text: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
});
