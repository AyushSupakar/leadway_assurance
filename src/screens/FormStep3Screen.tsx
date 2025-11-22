// src/screens/FormStep3Screen.tsx

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FormStackParamList } from '../navigation/types'; 
import Button from '../components/Button';
import { colors } from '../themes/colors';
import { spacing } from '../themes/spacing';
import { Feather } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

type Step3Props = NativeStackScreenProps<FormStackParamList, 'Step3'>;

// Define a type for a single Quote Item (Fixes 'any' error for QuoteItem props)
interface Vehicle {
    id: string;
    model: string;
    claims: number;
    imageSource?: number;
}
interface QuoteItemType {
    id: string;
    description: string;
    price: string;
}

const VEHICLES: Vehicle[] = [{ id: '1', model: 'Toyota Yaris', claims: 0, imageSource: require('../../assets/toyota.png') }, // Assuming a Yaris image
    { id: '2', model: 'Benz CL250', claims: 3, imageSource: require('../../assets/benz.png') }, // Assuming a Tesla image
    
    { id: '3', model: 'Add New', claims: 0 }, // Special card
];

// Mock data for the quote line items, using the defined type
const QUOTE_ITEMS: QuoteItemType[] = [
    { id: '1', description: 'Toyota Yaris', price: '190,000.30' },
    { id: '2', description: 'Toyota Yaris', price: '190,000.30' },
    { id: '3', description: 'Toyota Yaris', price: '190,000.30' },
    { id: '4', description: 'Toyota Yaris', price: '190,000.30' },
    { id: '5', description: 'Comprehensive Plan', price: '190,000.30' },
];

const TOTAL_AMOUNT = '7,230,000.30'; 

// Define Props for the QuoteItem component
interface QuoteItemProps {
    description: string;
    price: string;
}

// Component for a single Quote line item
const QuoteItem: React.FC<QuoteItemProps> = ({ description, price }) => (
    <View style={styles.quoteItem}>
        <Text style={styles.itemDescription}>{description}</Text>
        <Text style={styles.itemPrice}>N{price}</Text>
    </View>
);

// Define Props for the StepIndicator component (Fixes 'any' error for StepIndicator prop)
interface StepIndicatorProps {
    step: number;
}

// Custom Step indicator component 
const StepIndicator: React.FC<StepIndicatorProps> = ({ step: _step }) => ( // Use _step to ignore the unused value
    <View style={styles.indicatorContainer}>
        <View style={styles.stepActive}>
            {/* Logic implies step 1 is complete */}
            <Feather name="check" size={16} color={colors.secondary} />
        </View>
        <View style={styles.line} />
        <View style={styles.stepActive}>
            {/* Logic implies step 2 is complete */}
            <Feather name="check" size={16} color={colors.secondary} />
        </View>
        <View style={styles.line} />
        <View style={styles.stepActive}>
            {/* Step 3 is the current/last step in this view */}
            {_step >= 3 ? <Text style={styles.stepText}>3</Text> : null}
        </View>
    </View>
);


const FormStep3Screen: React.FC<Step3Props> = ({ navigation }) => {
    
    const handleProceedToPay = () => {
        // Handle payment logic here
        navigation.navigate('Success');
    };

    const handleDownloadQuote = () => {
        console.log('Downloading quote...');
        // Implement file download logic
    };

    return (
        <View style={styles.flex}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Upgrade to Comprehensive Motor Insurance Plan</Text>
                <Text style={styles.subtitle}>Fill or Update your information and we'll get your vehicle covered in no time.</Text>
                
                {/* Step Indicator (3.jpg) */}
                <StepIndicator step={3} />
                <View style={styles.indicatorLabels}>
                    <Text style={styles.labelActive}>Personal Info</Text>
                    <Text style={styles.labelActive}>ID/Vehicle Details</Text>
                    <Text style={styles.labelActive}>Quote</Text>
                </View>

                {/* Quote Icon */}
                <View style={styles.quoteIconContainer}>
                    <MaterialCommunityIcons name="file-document-outline" size={36} color={colors.primary} />
                </View>

                {/* Quote Items List */}
                {QUOTE_ITEMS.map(item => (
                    <QuoteItem key={item.id} description={item.description} price={item.price} />
                ))}

                {/* Total Section */}
                <View style={styles.totalSeparator} />
                <View style={styles.totalContainer}>
                    <Text style={styles.totalTextLabel}>Total</Text>
                    <Text style={styles.totalTextValue}>N{TOTAL_AMOUNT}</Text>
                </View>
                
            </ScrollView>

            {/* Fixed Footer Buttons */}
            <View style={styles.footer}>
                <Pressable onPress={handleDownloadQuote} style={styles.downloadButton}>
                    <Feather name="download" size={18} color={colors.textSecondary} style={styles.downloadIcon} />
                    <Text style={styles.downloadText}>Download Quote</Text>
                </Pressable>
                <Button title="Proceed to Pay" onPress={handleProceedToPay} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    flex: { flex: 1, backgroundColor: colors.secondary },
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
    // --- Step Indicator Styles (Ensuring Active styling) ---
    indicatorContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.s, paddingHorizontal: spacing.m },
    stepActive: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
    // stepInactive: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.border, alignItems: 'center', justifyContent: 'center' },
    stepText: { color: colors.secondary, fontWeight: 'bold' },
    line: { flex: 1, height: 2, backgroundColor: colors.primary, marginHorizontal: spacing.s }, // Line between active steps is also primary
    indicatorLabels: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xl },
    labelActive: { color: colors.primary, fontWeight: '600', fontSize: 12, textAlign: 'center', flex: 1 },
    // --- Quote Styles ---
    quoteIconContainer: {
        width: 80,
        height: 80,
        borderRadius: 12,
        backgroundColor: colors.lightBackground, // Assuming a light gray for the background of the icon
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.xl,
        borderWidth: 1,
        borderColor: colors.border,
    },
    quoteItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: spacing.s,
    },
    itemDescription: {
        fontSize: 14,
        color: colors.textSecondary,
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.textPrimary,
    },
    totalSeparator: {
        height: 1,
        backgroundColor: colors.border,
        marginVertical: spacing.m,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.xxl,
    },
    totalTextLabel: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.textPrimary,
    },
    totalTextValue: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.primary, // Highlight the total price in orange
    },
    // --- Footer Styles ---
    footer: {
        padding: spacing.l,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    downloadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.m,
        padding: spacing.s,
    },
    downloadIcon: {
        marginRight: spacing.s,
    },
    downloadText: {
        fontSize: 16,
        color: colors.textSecondary,
        fontWeight: '500',
    },
});

export default FormStep3Screen;