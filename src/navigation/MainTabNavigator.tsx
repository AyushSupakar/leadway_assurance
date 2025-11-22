// src/navigation/MainTabNavigator.tsx (Corrected Code)

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { colors } from '../themes/colors';
import { BottomTabParamList } from './types';

// Import all Tab Screens
import HomeScreen from '../screens/HomeScreen';
import ClaimsScreen from '../screens/ClaimsScreen';
import InsuranceScreen from '../screens/InsuranceScreen';
import HelpScreen from '../screens/HelpScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
const Tab = createBottomTabNavigator<BottomTabParamList>();

export const MainTabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="HomeTab"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSecondary,
                tabBarStyle: {
                    backgroundColor: colors.secondary, // White tab bar background
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    paddingBottom: 2,
                    height: 60,
                },
                tabBarIcon: ({ color, size }) => {
                    let iconName: keyof typeof Feather.glyphMap;

                    if (route.name === 'HomeTab') {
                        iconName = 'home';
                    } else if (route.name === 'InsuranceTab') {
                        iconName = 'shield';
                    } else if (route.name === 'ClaimsTab') {
                        iconName = 'file-text';
                    } else if (route.name === 'HelpTab') {
                        iconName = 'help-circle';
                    } else {
                        iconName = 'alert-circle'; // Fallback
                    }

                    return <Feather name={iconName} size={size} color={color} />;
                },
            })}
        >
            {/* CORRECT MAPPING: Route Name -> Screen Component */}
            <Tab.Screen 
                name="HomeTab" 
                component={HomeScreen} 
                options={{ title: 'Home' }} 
            />
            <Tab.Screen 
                name="InsuranceTab" 
                component={InsuranceScreen} 
                options={{ headerShown: false, title:"Insurance", tabBarIcon:({color, size})=>(<Ionicons name="car-sport-sharp" size={size} color={color} />),}} 
            />
            <Tab.Screen 
                name="ClaimsTab" 
                component={ClaimsScreen} 
                options={{ headerShown: false, title:"Claims", tabBarIcon:({color, size})=>(<MaterialCommunityIcons name="view-grid-plus-outline" size={size} color={color} />),}}
            />
            <Tab.Screen 
                name="HelpTab" 
                component={HelpScreen} 
                options={{ title: 'Help' }} 
            />
        </Tab.Navigator>
    );
};