// navigation/KYCStackNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/DashboardScreen';
import KYCFormScreen from '../screens/KYCFormScreen';

const Stack = createNativeStackNavigator();

export default function KYCStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DashboardMain" component={DashboardScreen} />
      <Stack.Screen name="KYCForm" component={KYCFormScreen} />
    </Stack.Navigator>
  );
}
