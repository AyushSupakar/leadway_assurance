// src/screens/ClaimsScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../themes/colors';
import { spacing } from '../themes/spacing';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../navigation/types'; // RESOLVES ERROR 1

// Define the type for a single Claim object (RESOLVES ERROR 2)
type Claim = {
    id: string;
    title: string;
    date: string;
    status: string;
    color: string;
};

type ClaimsScreenProps = BottomTabScreenProps<BottomTabParamList, 'ClaimsTab'>;

const MOCK_CLAIMS: Claim[] = [
    { id: '1', title: 'Accident Report - Toyota Yaris', date: '2025-10-25', status: 'Pending', color: '#FFCC00' }, // Yellow
    { id: '2', title: 'Windshield Replacement - Benz CL250', date: '2025-09-10', status: 'Settled', color: '#34C759' }, // Green
    { id: '3', title: 'Theft Report - Motorcycle', date: '2025-08-01', status: 'Rejected', color: '#FF3B30' }, // Red
];

// Define Props for the ClaimItem
interface ClaimItemProps {
    claim: Claim; // Use the defined Claim type
}

// Component for a single Claim List Item
const ClaimItem: React.FC<ClaimItemProps> = ({ claim }) => (
    <TouchableOpacity style={styles.itemContainer} activeOpacity={0.7}>
        <View style={[styles.statusIndicator, { backgroundColor: claim.color }]} />
        <View style={styles.textContainer}>
            <Text style={styles.itemTitle}>{claim.title}</Text>
            <Text style={styles.itemDate}>{claim.date}</Text>
        </View>
        <View style={styles.statusBox}>
            <Text style={styles.statusText}>{claim.status}</Text>
        </View>
    </TouchableOpacity>
);


const ClaimsScreen: React.FC<ClaimsScreenProps> = () => {
  return (
    <View style={styles.safeArea}>
        {/* Consistent App Header */}
        <View style={styles.header}>
            <Text style={styles.headerTitle}>My Claims</Text>
            <Feather name="plus-circle" size={24} color={colors.primary} />
        </View>

        <FlatList
            data={MOCK_CLAIMS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ClaimItem claim={item} />}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={() => <Text style={styles.emptyText}>You have no filed claims.</Text>}
        />
    </View>
  );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    listContainer: {
        padding: spacing.m,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.secondary,
        borderRadius: spacing.s,
        padding: spacing.m,
        marginBottom: spacing.s,
        borderWidth: 1,
        borderColor: colors.border,
    },
    statusIndicator: {
        width: 6,
        height: '80%',
        borderRadius: 3,
        marginRight: spacing.m,
    },
    textContainer: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.textPrimary,
    },
    itemDate: {
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: spacing.xs,
    },
    statusBox: {
        backgroundColor: colors.lightBackground,
        paddingHorizontal: spacing.s,
        paddingVertical: spacing.xs,
        borderRadius: spacing.xs,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '700',
        color: colors.textPrimary,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: spacing.xxl,
        color: colors.textSecondary,
    }
});

export default ClaimsScreen;