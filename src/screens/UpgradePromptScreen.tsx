// src/screens/UpgradePromptScreen.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types'; 
import Button from '../components/Button';
import SelectionCard from '../components/SelectionCard'; // Import the new component
import { colors } from '../themes/colors';
import { spacing } from '../themes/spacing';
import { Feather } from '@expo/vector-icons'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type PromptProps = NativeStackScreenProps<RootStackParamList, 'UpgradePrompt'>;

const UpgradePromptScreen: React.FC<PromptProps> = ({ navigation }) => {
    
    const [userType, setUserType] = useState<'individual' | 'corporate' | null>(null);
    const [isAgreed, setIsAgreed] = useState(false);
    const insets = useSafeAreaInsets();

    const handleContinue = () => {
        if (userType && isAgreed) {
            // Dismiss this modal and navigate to the dedicated form stack
            navigation.replace('UpgradeForm'); 
        } else {
            // Handle error/validation feedback
            console.warn("Please select an account type and agree to the privacy notice.");
        }
    };
    
    // The screen has a simple back arrow like the form, but it dismisses the modal
    const handleGoBack = () => {
        navigation.goBack(); 
    };

    return (
        <View style={[styles.flex, { paddingBottom: insets.bottom }]}>
            {/* Header with Back Button */}
            <View style={styles.header}>
                <Pressable onPress={handleGoBack} style={styles.backButton}>
                    <Feather name="arrow-left" size={24} color={colors.textPrimary} />
                </Pressable>
            </View>
            
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Upgrade to Comprehensive Motor Insurance Plan</Text>
                <Text style={styles.subtitle}>Kindly select & update your information and we'll get your vehicle covered in no time.</Text>
                
                {/* Selection Cards */}
                <SelectionCard 
                    title="I am an Individual"
                    iconName="user"
                    isSelected={userType === 'individual'}
                    onSelect={() => setUserType('individual')}
                />
                <SelectionCard 
                    title="I am a Corporate"
                    iconName="briefcase"
                    isSelected={userType === 'corporate'}
                    onSelect={() => setUserType('corporate')}
                />

                {/* Privacy Checkbox */}
                <Pressable style={styles.checkboxContainer} onPress={() => setIsAgreed(!isAgreed)}>
                    {isAgreed ? (
                        <Feather name="check-square" size={20} color={colors.primary} />
                    ) : (
                        <Feather name="square" size={20} color={colors.textSecondary} />
                    )}
                    <Text style={styles.checkboxText}>I agree to the Data Privacy Notice</Text>
                </Pressable>

            </ScrollView>

            {/* Fixed Button at the Bottom */}
            <View style={styles.footer}>
                <Button 
                    title="Continue" 
                    onPress={handleContinue} 
                    disabled={!userType || !isAgreed}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    flex: { 
        flex: 1, 
        backgroundColor: colors.secondary, // White background 
    },
    header: {
        paddingHorizontal: spacing.m,
        paddingBottom: spacing.s,
    },
    backButton: {
        padding: spacing.xs,
    },
    container: {
        paddingHorizontal: spacing.l,
        paddingTop: spacing.m,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: colors.textPrimary,
        marginBottom: spacing.s,
    },
    subtitle: {
        fontSize: 14,
        color: colors.textSecondary,
        marginBottom: spacing.xl,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: spacing.m,
        marginBottom: spacing.xxl * 1.5,
    },
    checkboxText: {
        marginLeft: spacing.s,
        fontSize: 14,
        color: colors.textPrimary,
    },
    footer: {
        padding: spacing.l,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    }
});

export default UpgradePromptScreen;