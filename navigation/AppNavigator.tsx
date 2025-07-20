// AppNavigator.tsx

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Screens
import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DashboardScreen from '../screens/DashboardScreen';
import SettingsScreen from '../screens/SettingsScreen';
import KYCFormScreen from '../screens/KYCFormScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import HowItWorksScreen from '../screens/HowItWorksScreen';
import LoanRequestScreen from '../screens/LoanRequestScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ✅ Tabs for logged-in users
const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName: keyof typeof Ionicons.glyphMap = 'home-outline';

        switch (route.name) {
          case 'Dashboard':
            iconName = 'home-outline';
            break;
          case 'Profile':
            iconName = 'person-circle-outline';
            break;
          case 'Settings':
            iconName = 'settings-outline';
            break;
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      headerShown: false,

      // ✅ Updated styling here:
      tabBarStyle: {
        backgroundColor: '#111827', // Dark background
        borderTopWidth: 0,
        height: 70,
        paddingBottom: 10,
        paddingTop: 10,
        elevation: 8, // Android shadow
      },
      tabBarActiveTintColor: '#00B2A9', // Your primary color
      tabBarInactiveTintColor: '#CCCCCC', // Light gray
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '600',
      },
    })}
  >
    <Tab.Screen name="Dashboard" component={DashboardScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);


// ✅ Main navigation
const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Landing" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Main" component={MainTabs} />
      <Stack.Screen name="KYCForm" component={KYCFormScreen} />
      <Stack.Screen name="LoanRequestScreen" component={LoanRequestScreen} />
      <Stack.Screen name="ContactUs" component={ContactUsScreen} />
      <Stack.Screen name="HowItWorks" component={HowItWorksScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
