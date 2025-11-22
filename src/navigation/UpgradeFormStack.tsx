// src/navigation/UpgradeFormStack.tsx

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FormStackParamList } from './types'; 

// Import all form screens
import FormStep1Screen from '../screens/FormStep1Screen'; 
import FormStep2Screen from '../screens/FormStep2Screen';
import FormStep3Screen from '../screens/FormStep3Screen';
import FormSuccessScreen from '../screens/FormSuccessScreen';
import Header from '../components/Header';

const FormStack = createNativeStackNavigator<FormStackParamList>();

export const UpgradeFormStack = () => {
  return (
    <FormStack.Navigator
      initialRouteName="Step1"
      screenOptions={{
        header: () => <Header />, // Use the custom header for all screens in this stack
      }}
    >
      <FormStack.Screen name="Step1" component={FormStep1Screen} />
      <FormStack.Screen name="Step2" component={FormStep2Screen} />
      <FormStack.Screen name="Step3" component={FormStep3Screen} />
      <FormStack.Screen name="Success" component={FormSuccessScreen} />
    </FormStack.Navigator>
  );
};