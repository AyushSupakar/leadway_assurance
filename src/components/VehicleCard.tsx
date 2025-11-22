// src/components/VehicleCard.tsx

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors } from '../themes/colors'; // Assuming colors are defined here
import { spacing } from '../themes/spacing'; // Assuming spacing is defined here
import { Feather } from '@expo/vector-icons';

interface VehicleCardProps {
    id: string;
    model: string;
    claims: number;
    isSelected: boolean;
    onSelect: (id: string) => void;
    // Optional: for rendering a specific car image
    imageSource?: number; 
}

const VehicleCard: React.FC<VehicleCardProps> = ({ id, model, claims, isSelected, onSelect, imageSource }) => {
    
    const cardStyle = [
        styles.card,
        // Blue background and distinct styling for the selected card
        isSelected ? styles.cardSelected : styles.cardDefault,
        model === 'Add New' && styles.cardAddNew,
    ];
    
    // Special rendering for 'Add New' card
    if (model === 'Add New') {
        return (
            <TouchableOpacity style={[styles.card, styles.cardAddNew]} onPress={() => onSelect(id)}>
                <View style={styles.plusContainer}>
                    <Feather name="plus" size={20} color={colors.primary} />
                </View>
                <Text style={styles.addNewText}>{model}</Text>
            </TouchableOpacity>
        );
    }

    // Normal Vehicle Card
    return (
        <TouchableOpacity style={cardStyle} onPress={() => onSelect(id)} activeOpacity={0.8}>
            {/* Car Image Placeholder */}
            {imageSource ? (
                <Image 
                    source={imageSource}
                    style={styles.vehicleImage} 
                    resizeMode="contain"
                />
            ) : (
                // Generic placeholder if no image source is provided
                <View style={styles.imagePlaceholder}>
                    <Feather 
                        name="truck" 
                        size={30} 
                        color={isSelected ? colors.secondary : colors.textSecondary} 
                    />
                </View>
            )}
            
            {/* Vehicle Model and Year */}
            <Text style={[styles.modelText, isSelected && styles.textSelected]}>{model}</Text>
            <Text style={[styles.yearText, isSelected && styles.textSelected]}>claims: {claims}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 110, // Slightly wider than before to fit text nicely
        height: 120,
        borderRadius: spacing.s,
        marginRight: spacing.m,
        padding: spacing.s,
        alignItems: 'center',
        justifyContent: 'center',
        // Common shadow for both states
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    // Default (Inactive) state
    cardDefault: {
        backgroundColor: colors.secondary, // White
        borderWidth: 1,
        borderColor: colors.border,
    },
    // Selected (Active) state - Blue background
    cardSelected: {
        backgroundColor: '#007AFF', // Blue (activeCard inferred color)
        borderWidth: 0, // No border when background is colored
    },
    cardAddNew: {
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: colors.border,
        backgroundColor: colors.background, // Light background
        justifyContent: 'center',
    },
    imagePlaceholder: {
        height: 40,
        marginBottom: spacing.xs,
        justifyContent: 'center',
    },
    vehicleImage: {
        width: '100%',
        height: 50,
        resizeMode: 'contain',
        marginBottom: spacing.xs,
    },
    modelText: {
        fontSize: 14,
        fontWeight: '700', // Bolder model text
        color: colors.textPrimary,
        textAlign: 'center',
    },
    yearText: {
        fontSize: 12,
        color: colors.textSecondary,
        textAlign: 'center',
    },
    // White text for selected card
    textSelected: {
        color: colors.secondary, 
    },
    plusContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.xs,
    },
    addNewText: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.textSecondary,
    }
});

export default VehicleCard;