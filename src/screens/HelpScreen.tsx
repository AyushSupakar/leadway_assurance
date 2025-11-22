// src/screens/HelpScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../themes/colors';
import { spacing } from '../themes/spacing';

// Define the type for a single help option (RESOLVES THE ERROR)
type HelpOption = {
    id: string;
    title: string;
    icon: string; 
};

const HELP_OPTIONS: HelpOption[] = [
    { id: '1', title: 'Frequently Asked Questions (FAQ)', icon: 'message-circle' },
    { id: '2', title: 'Contact Customer Support', icon: 'phone' },
    { id: '3', title: 'Report a Bug/Feedback', icon: 'flag' },
    { id: '4', title: 'Privacy Policy & Terms', icon: 'file-text' },
];

// Define Props for the HelpItem component
interface HelpItemProps {
    item: HelpOption;
}

// Component for a single Help Item
const HelpItem: React.FC<HelpItemProps> = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} activeOpacity={0.7}>
        <Feather name={item.icon as 'message-circle'} size={20} color={colors.textPrimary} style={styles.icon} />
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Feather name="chevron-right" size={20} color={colors.textSecondary} />
    </TouchableOpacity>
);


const HelpScreen: React.FC = () => {
  return (
    <View style={styles.safeArea}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Help & Support</Text>
        </View>
        <FlatList
            data={HELP_OPTIONS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <HelpItem item={item} />}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
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
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.l,
        paddingHorizontal: spacing.l,
        backgroundColor: colors.secondary,
    },
    icon: {
        marginRight: spacing.m,
    },
    itemTitle: {
        flex: 1,
        fontSize: 16,
        color: colors.textPrimary,
    },
    separator: {
        height: 1,
        backgroundColor: colors.border,
        marginLeft: spacing.xl,
    },
});

export default HelpScreen;