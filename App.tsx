// App.tsx

import React, { useCallback, useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { AppNavigator } from './src/navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';

// Prevents the native splash screen from hiding automatically.
// This gives you control over when to hide it (e.g., after fonts are loaded).
SplashScreen.preventAutoHideAsync();

export default function App() {
  // 1. Load Fonts
  // Replace with actual font paths if the Figma uses custom fonts.
  // Example: 'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf')
  const [fontsLoaded] = useFonts({
    // If you don't use custom fonts, you can just set this to an empty object
    // or load one system-safe icon font like this:
    // 'MaterialIcons': require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialIcons.ttf'),
  });

  // 2. Hide Splash Screen Once Assets are Ready
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // Hides the splash screen after fonts are loaded
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Wait until fonts are loaded before proceeding
  if (!fontsLoaded) {
    return null; 
  }

  // 3. Render the App
  // We attach the onLayoutRootView to the main container (View) to ensure 
  // the app is measured and ready before hiding the splash screen.
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, marginBottom:40 }} onLayout={onLayoutRootView}>
        <AppNavigator />
      </View>
    </SafeAreaProvider>
  );
}