// src/components/Button.tsx (Updated Code)

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../themes/colors';
import { spacing } from '../themes/spacing';

// 1. UPDATE THE INTERFACE TO INCLUDE isLoading and styles
interface ButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    // ADDED: The prop that caused the error
    isLoading?: boolean; 
    // ADDED: Optional styles for customization
    style?: ViewStyle;
    textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, disabled = false, isLoading = false, style, textStyle }) => {
    
    // Determine the final style based on state
    const buttonStyle = [
        styles.button,
        style,
        (disabled || isLoading) && styles.buttonDisabled,
    ];

    return (
        <TouchableOpacity 
            style={buttonStyle} 
            onPress={onPress} 
            disabled={disabled || isLoading} // Disable when loading
            activeOpacity={0.8}
        >
            {/* 2. ADD LOGIC TO SHOW LOADING INDICATOR */}
            {isLoading ? (
                <ActivityIndicator color={colors.secondary} size="small" />
            ) : (
                <Text style={[styles.buttonText, textStyle]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary, // Orange
        paddingVertical: spacing.m,
        borderRadius: spacing.s,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
    },
    buttonText: {
        color: colors.secondary, // White text
        fontSize: 16,
        fontWeight: '700',
    },
    buttonDisabled: {
        backgroundColor: colors.border, // Light gray when disabled/loading
    },
});

export default Button;