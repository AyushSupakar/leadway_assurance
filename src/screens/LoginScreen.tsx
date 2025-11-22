// src/screens/LoginScreen.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types'; 
import Button from '../components/Button';
import { colors } from '../themes/colors';
import { spacing } from '../themes/spacing';
import { Feather } from '@expo/vector-icons'; 

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('08012345678');
    const [password, setPassword] = useState('password123');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = () => {
        setIsLoading(true);
        // Simulate an API call delay
        setTimeout(() => {
            setIsLoading(false);
            // On successful login, navigate to the MainTabs
            navigation.replace('MainTabs'); 
        }, 1500);
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <View style={styles.flex}>
            <KeyboardAvoidingView 
                style={styles.flex}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={0}
            >
                <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                    {/* Brand/Logo Area */}
                    <View style={styles.logoContainer}>
                        <Text style={styles.logoText}>Leadway Assurance</Text>
                        <Text style={styles.logoTagline}>Get your Car Insurance</Text>
                    </View>

                    <Text style={styles.title}>Welcome Back!</Text>
                    <Text style={styles.subtitle}>Sign in to access your policies and services.</Text>

                    {/* Phone Number Input */}
                    <Text style={styles.label}>Phone Number</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            keyboardType="phone-pad"
                            placeholder="e.g., 08012345678"
                            placeholderTextColor={colors.textPlaceholder}
                        />
                    </View>

                    {/* Password Input */}
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!isPasswordVisible}
                            placeholder="Enter your password"
                            placeholderTextColor={colors.textPlaceholder}
                        />
                        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconButton}>
                            <Feather 
                                name={isPasswordVisible ? 'eye' : 'eye-off'} 
                                size={20} 
                                color={colors.textSecondary} 
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Forgot Password Link */}
                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>
                    
                    {/* Sign In Button */}
                    <View style={styles.buttonWrapper}>
                        <Button 
                            title="Sign In" 
                            onPress={handleLogin} 
                            disabled={isLoading || !phoneNumber || !password}
                            isLoading={isLoading}
                        />
                    </View>

                    {/* Register Link */}
                    <View style={styles.registerContainer}>
                        <Text style={styles.registerText}>Don't have an account? </Text>
                        <TouchableOpacity>
                            <Text style={styles.registerLink}>Register Now</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    flex: { flex: 1, backgroundColor: colors.lightBackground },
    container: {
        paddingHorizontal: spacing.l,
        paddingVertical: spacing.xxl,
    },
    // --- Logo Styles ---
    logoContainer: {
        alignItems: 'center',
        marginBottom: spacing.xxl * 0.75,
        marginTop: spacing.xl,
    },
    logoText: {
        fontSize: 40,
        fontWeight: '900',
        color: colors.primary,
        letterSpacing: 2,
    },
    logoTagline: {
        fontSize: 14,
        color: colors.textSecondary,
        marginTop: spacing.xs,
    },
    // --- Text Styles ---
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: colors.textPrimary,
        marginBottom: spacing.s,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: colors.textSecondary,
        marginBottom: spacing.xxl,
        textAlign: 'center',
    },
    // --- Form Styles ---
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.textPrimary,
        marginTop: spacing.m,
        marginBottom: spacing.s,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.secondary, // White input background
        borderRadius: spacing.s,
        paddingHorizontal: spacing.m,
        height: 50,
        borderWidth: 1,
        borderColor: colors.border,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: colors.textPrimary,
    },
    iconButton: {
        paddingLeft: spacing.s,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginTop: spacing.s,
        marginBottom: spacing.l,
    },
    forgotPasswordText: {
        fontSize: 14,
        color: colors.primary,
        fontWeight: '600',
    },
    buttonWrapper: {
        marginTop: spacing.m,
        marginBottom: spacing.xxl,
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: spacing.xl,
    },
    registerText: {
        fontSize: 14,
        color: colors.textSecondary,
    },
    registerLink: {
        fontSize: 14,
        color: colors.primary,
        fontWeight: '600',
    }
});

export default LoginScreen;