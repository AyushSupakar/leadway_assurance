// src/screens/InsuranceScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../themes/colors';
import { spacing } from '../themes/spacing';
import Button from '../components/Button';

// Component for a Policy Summary Card
const PolicyCard = () => (
    <View style={styles.policyCard}>
        <View style={styles.cardHeader}>
            <MaterialCommunityIcons name="car-outline" size={30} color={colors.primary} />
            <Text style={styles.policyStatus}>Active</Text>
        </View>
        <Text style={styles.policyTitle}>Comprehensive Motor Insurance</Text>
        <Text style={styles.policyDetail}>Policy No: LWY-MOTOR-00783</Text>
        <Text style={styles.policyDetail}>Expires: 2026/11/20</Text>
        <View style={styles.cardFooter}>
            <Text style={styles.viewDetailsText}>View Details</Text>
            <Button title="Renew" onPress={() => {}} style={styles.renewButton} textStyle={styles.renewButtonText} />
        </View>
    </View>
);


const InsuranceScreen: React.FC = () => {
  return (
    <View style={styles.safeArea}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>My Insurance</Text>
        </View>
        <ScrollView contentContainerStyle={styles.container}>
            <PolicyCard />
            <PolicyCard />
            <PolicyCard />
            <Text style={styles.disclaimerText}>Contact support if you need to add a new policy.</Text>
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        padding: spacing.m,
        backgroundColor: colors.secondary,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.textPrimary,
    },
    container: {
        padding: spacing.m,
    },
    // Policy Card Styles
    policyCard: {
        backgroundColor: colors.secondary,
        borderRadius: spacing.s,
        padding: spacing.m,
        marginBottom: spacing.m,
        borderLeftWidth: 5,
        borderLeftColor: colors.primary,
        shadowColor: colors.border,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.s,
    },
    policyStatus: {
        backgroundColor: colors.success,
        color: colors.secondary,
        paddingHorizontal: spacing.s,
        paddingVertical: spacing.xs,
        borderRadius: spacing.xs,
        fontSize: 12,
        fontWeight: '700',
    },
    policyTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.textPrimary,
        marginBottom: spacing.xs,
    },
    policyDetail: {
        fontSize: 14,
        color: colors.textSecondary,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: spacing.m,
        paddingTop: spacing.s,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    viewDetailsText: {
        color: colors.primary,
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
    renewButton: {
        paddingVertical: spacing.s,
        paddingHorizontal: spacing.m,
        minHeight: 30, // Make button smaller
        width: 100,
        borderRadius: spacing.xs,
    },
    renewButtonText: {
        fontSize: 14,
        fontWeight: '600',
    },
    disclaimerText: {
        fontSize: 12,
        textAlign: 'center',
        color: colors.textSecondary,
        marginTop: spacing.l,
    }
});

export default InsuranceScreen;