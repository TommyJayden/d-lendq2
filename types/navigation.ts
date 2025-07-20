// types.ts

import { NativeStackScreenProps } from '@react-navigation/native-stack';

// ✅ This is your complete stack navigator screen list
export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Dashboard: undefined;
  Main: undefined;
  AuthScreen: undefined;
  Settings: undefined;

  // Profile-related
  UserProfileScreen: undefined;
  EditProfileScreen: undefined;
  ProfileScreen: undefined;

  // KYC
  KYCFormScreen: undefined;

  // Informational Screens
  ContactUsScreen: undefined;
  HowItWorksScreen: undefined;
};

// ✅ Helper type to use in screens
export type ScreenProps<RouteName extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, RouteName>;
