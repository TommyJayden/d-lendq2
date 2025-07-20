import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import LoanRequestForm from '../components/LoanRequestForm';

export default function LoanRequestScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📄 Loan Request</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Fill out this form to apply for a loan. Make sure your KYC is complete and income details are up to date.
        </Text>
      </View>

      <View style={styles.card}>
        <LoanRequestForm />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#1A1925', // deep dark background
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: '#2B2A3D',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#00B2A9',
  },
  infoText: {
    color: '#cde1ff',
    fontSize: 14,
    lineHeight: 20,
  },
  card: {
    backgroundColor: '#2B2A3D', // match form section
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
});
