import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function DashboardScreen() {
  const navigation = useNavigation<any>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Welcome Back 👋</Text>

      {/* KYC Completion Prompt */}
      <View style={styles.kycCard}>
        <Text style={styles.kycText}>Complete your KYC to unlock full access</Text>
        <TouchableOpacity style={styles.kycButton} onPress={() => navigation.navigate('KYCForm')}>
          <Text style={styles.kycButtonText}>Complete KYC</Text>
        </TouchableOpacity>
      </View>

      {/* Loan Limit Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Loan Limit</Text>
        <Text style={styles.amount}>$500</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '70%' }]} />
        </View>
        <Text style={styles.limitText}>$350 used of $500</Text>
      </View>

      {/* Actions */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('LoanRequestScreen')}
        >
          <Ionicons name="cash-outline" size={28} color="#fff" />
          <Text style={styles.actionLabel}>Request Loan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={() => {}}>
          <Ionicons name="wallet-outline" size={28} color="#fff" />
          <Text style={styles.actionLabel}>Repay</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={() => {}}>
          <Ionicons name="trending-up-outline" size={28} color="#fff" />
          <Text style={styles.actionLabel}>Credit Boost</Text>
        </TouchableOpacity>
      </View>

      {/* Recommended Loans */}
      <Text style={styles.sectionTitle}>Recommended Loans</Text>

      <View style={styles.loanCard}>
        <Text style={styles.loanType}>Gig Worker Instant</Text>
        <Text style={styles.loanDetails}>Up to $200 • Weekly repayment</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoanRequestScreen')}>
          <Text style={styles.loanApply}>Apply Now</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.loanCard}>
        <Text style={styles.loanType}>Paycheck Advance</Text>
        <Text style={styles.loanDetails}>Up to $500 • Bi-weekly</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoanRequestScreen')}>
          <Text style={styles.loanApply}>Apply Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#201E2E', // Dark brand background
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00B2A9', // Teal brand color
    marginBottom: 16,
  },
  kycCard: {
    backgroundColor: '#1F3B57', // Cool deep blue
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#00B2A9',
  },
  kycText: {
    fontSize: 15,
    color: '#ffffff',
    marginBottom: 8,
  },
  kycButton: {
    backgroundColor: '#00B2A9',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  kycButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#2B2A3D', // Dark card background
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    color: '#cccccc',
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00B2A9',
    marginVertical: 8,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#444',
    borderRadius: 6,
    overflow: 'hidden',
    marginVertical: 8,
  },
  progressFill: {
    height: 10,
    backgroundColor: '#00B2A9',
  },
  limitText: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionButton: {
    backgroundColor: '#2B2A3D',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionLabel: {
    marginTop: 8,
    color: '#00B2A9',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#ffffff',
  },
  loanCard: {
    backgroundColor: '#2B2A3D',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  loanType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00B2A9',
    marginBottom: 4,
  },
  loanDetails: {
    color: '#cccccc',
    fontSize: 14,
    marginBottom: 8,
  },
  loanApply: {
    color: '#00B2A9',
    fontWeight: '600',
  },
});
