import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  Register: undefined;
  MainTabs: undefined;
};

type LandingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Landing'
>;

const LandingScreen = () => {
  const navigation = useNavigation<LandingScreenNavigationProp>();

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* 🔷 Logo without embedded slogan */}
        <Image
          source={require('../assets/logo-hero.png')} // ✅ Make sure this version only has the D‑LendQ with icon
          style={styles.logo}
          resizeMode="contain"
        />

        {/* 🔷 External slogan */}
        <Text style={styles.slogan}>
          Borrow Smart. Build Credit. Break the Cycle.
        </Text>

        {/* 🔷 Buttons */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.link}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.linkText}>Create an Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LandingScreen;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#201E2E',
  },
  container: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  logo: {
    width: width * 0.85, // ✅ Bigger size for screen fit
    height: width * 0.85,
    marginBottom: 20,
  },
  slogan: {
    fontSize: 16,
    color: '#ffff',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#00B2A9',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    elevation: 3,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  link: {
    marginTop: 20,
  },
  linkText: {
    color: '#ffff',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});
