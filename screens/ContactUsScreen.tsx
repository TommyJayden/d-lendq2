import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

export default function ContactUsScreen() {
  const handleEmail = () => {
    Linking.openURL('mailto:support@dlendq.com');
  };

  const handlePhone = () => {
    Linking.openURL('tel:+1234567890');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📞 Contact Us</Text>
      <Text style={styles.text}>Have questions or issues? We're here to help.</Text>

      <TouchableOpacity style={styles.button} onPress={handleEmail}>
        <Text style={styles.buttonText}>📧 Email Us</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handlePhone}>
        <Text style={styles.buttonText}>📱 Call Us</Text>
      </TouchableOpacity>
    </View>
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
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#444',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#003366',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
