// src/screens/FormSuccessScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FormStackParamList, RootStackParamList } from '../navigation/types'; 
import Button from '../components/Button';
import { colors } from '../themes/colors';
import { spacing } from '../themes/spacing';
import { Feather } from '@expo/vector-icons';
import { StackActions, useNavigation } from '@react-navigation/native';

type SuccessProps = NativeStackScreenProps<FormStackParamList, 'Success'>;

// Define Props for the StepIndicator component
interface StepIndicatorProps {
    step: number;
}

// Custom Step indicator component (All steps are checked)
const StepIndicator: React.FC<StepIndicatorProps> = ({ step: _step }) => ( // Used _step to ignore unused value
    <View style={styles.indicatorContainer}>
        {/* Step 1: Checked */}
        <View style={styles.stepActive}>
            <Feather name="check" size={16} color={colors.secondary} />
        </View>
        <View style={styles.line} />
        {/* Step 2: Checked */}
        <View style={styles.stepActive}>
            <Feather name="check" size={16} color={colors.secondary} />
        </View>
        <View style={styles.line} />
        {/* Step 3: Checked */}
        <View style={styles.stepActive}>
            <Feather name="check" size={16} color={colors.secondary} />
        </View>
    </View>
);


const FormSuccessScreen: React.FC<SuccessProps> = ({ navigation }) => {
    
    const rootNavigation = useNavigation<NativeStackScreenProps<RootStackParamList>['navigation']>();

    const handleReturnHome = () => {
        // Use StackActions.PopToTop to dismiss the entire UpgradeFormStack 
        // and return to the main tabs (or Home screen if Home is the first tab).
        rootNavigation.dispatch(StackActions.popToTop());
    };

    return (
        <View style={styles.flex}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Upgrade to Comprehensive Motor Insurance Plan</Text>
                <Text style={styles.subtitle}>Fill or Update your information and we'll get your vehicle covered in no time.</Text>
                
                {/* Step Indicator (All active) */}
                <StepIndicator step={4} />
                <View style={styles.indicatorLabels}>
                    <Text style={styles.labelText}>Personal Info</Text>
                    <Text style={styles.labelText}>ID/Vehicle Details</Text>
                    <Text style={styles.labelText}>Quote</Text>
                </View>

                {/* Success Icon (Main visual element) */}
                <View style={styles.successIconOuter}>
                    <View style={styles.successIconInner}>
                        <Feather name="check" size={60} color={colors.secondary} />
                    </View>
                </View>

                <Text style={styles.successText}>Successful!</Text>
                
            </ScrollView>

            {/* Fixed Button at the Bottom */}
            <View style={styles.footer}>
                <Button title="Return to Home" onPress={handleReturnHome} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    flex: { flex: 1, backgroundColor: colors.secondary },
    container: {
        paddingHorizontal: spacing.l,
        paddingTop: spacing.m,
        alignItems: 'center', // Center content horizontally
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: colors.textPrimary,
        marginBottom: spacing.s,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: colors.textSecondary,
        marginBottom: spacing.xxl,
        textAlign: 'center',
    },
    // --- Step Indicator Styles (All Green/Orange) ---
    indicatorContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: spacing.s, paddingHorizontal: spacing.m },
    stepActive: { 
        width: 28, height: 28, borderRadius: 14, 
        backgroundColor: colors.primary, // Orange for success in steps
        alignItems: 'center', justifyContent: 'center' 
    },
    line: { flex: 1, height: 2, backgroundColor: colors.primary, marginHorizontal: spacing.s }, 
    indicatorLabels: { 
        flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xxl, width: '100%', 
    },
    labelText: { 
        color: colors.primary, fontWeight: '600', fontSize: 12, textAlign: 'center', flex: 1 
    },
    // --- Success Icon Styles ---
    successIconOuter: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: colors.background, // White background
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: colors.success, // Green outline
        marginBottom: spacing.l,
        elevation: 5,
        shadowColor: colors.success,
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    successIconInner: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: colors.success, // Green center
        alignItems: 'center',
        justifyContent: 'center',
    },
    successText: {
        fontSize: 28,
        fontWeight: '700',
        color: colors.textPrimary,
        marginBottom: spacing.xxl * 2,
    },
    // --- Footer Styles ---
    footer: {
        width: '100%',
        padding: spacing.l,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    }
});

export default FormSuccessScreen;