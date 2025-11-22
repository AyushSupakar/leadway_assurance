// src/components/SelectionCard.tsx (New File)

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../themes/colors';
import { spacing } from '../themes/spacing';

interface SelectionCardProps {
    title: string;
    iconName: 'user' | 'briefcase'; // Use relevant icons
    isSelected: boolean;
    onSelect: () => void;
}

const SelectionCard: React.FC<SelectionCardProps> = ({ title, iconName, isSelected, onSelect }) => {
    
    const cardStyle = [
        styles.card,
        isSelected && styles.cardSelected,
    ];

    return (
        <TouchableOpacity style={cardStyle} onPress={onSelect} activeOpacity={0.8}>
            <View style={styles.iconContainer}>
                <Feather name={iconName} size={24} color={isSelected ? colors.primary : colors.textPrimary} />
            </View>
            <Text style={styles.titleText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background, // White background
        borderRadius: spacing.s,
        padding: spacing.m,
        marginBottom: spacing.m,
        borderWidth: 1,
        borderColor: colors.border,
    },
    cardSelected: {
        borderColor: colors.primary, // Orange border when selected
        borderWidth: 2,
    },
    iconContainer: {
        marginRight: spacing.m,
    },
    titleText: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.textPrimary,
    }
});

export default SelectionCard;