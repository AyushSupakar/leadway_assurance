// src/navigation/AppNavigator.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import Types
import { RootStackParamList } from './types'; 

// Import Navigators
import { MainTabNavigator } from './MainTabNavigator';      // Contains Home, Claims, Insurance, Help Tabs
import { UpgradeFormStack } from './UpgradeFormStack';      // Contains Step 1, 2, 3, Success

// Import Screens
import LoginScreen from '../screens/LoginScreen'; 
import UpgradePromptScreen from '../screens/UpgradePromptScreen'; // The 'Individual/Corporate' Modal

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          // Initial screen should typically be a Splash screen or Login
          initialRouteName="Login" 
          screenOptions={{ 
            headerShown: false, // We use custom headers for all screens
          }}
        >
          
          {/* 1. Authentication Flow */}
          <Stack.Screen name="Login" component={LoginScreen} />

          {/* 2. Main App Container (The Tabs) */}
          <Stack.Screen name="MainTabs" component={MainTabNavigator} />
          
          {/* 3. The Upgrade Prompt Modal (Home1.jpg) 
             - Presented as a modal/sheet on top of the Home screen
             - Use 'card' presentation for slide-up/down effect on Android/iOS
          */}
          <Stack.Screen 
            name="UpgradePrompt" 
            component={UpgradePromptScreen} 
            options={{ 
              presentation: 'modal', 
              gestureEnabled: true,
            }}
          />

          {/* 4. The Multi-Step Form Stack (1.jpg -> 4.jpg)
             - Presented as a new full-screen flow, pushed over MainTabs 
             - Note: The UpgradeFormStack handles the back button and steps internally
          */}
          <Stack.Screen 
            name="UpgradeForm" 
            component={UpgradeFormStack} 
            options={{ 
                // We keep headerShown: false here, as the UpgradeFormStack 
                // itself defines the custom Header for Step 1, 2, 3, and Success.
            }}
          />
          
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};