// src/screens/HomeScreen.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Pressable, Image } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

// --- Local Imports ---
import { colors } from '../themes/colors'; 
import { spacing } from '../themes/spacing';
import { BottomTabParamList, RootStackParamList } from '../navigation/types'; 
import Header from '../components/Header'; // Updated Header
import VehicleCard from '../components/VehicleCard'; // Updated VehicleCard

// --- TYPE DEFINITIONS & NAVIGATION SETUP ---
type HomeScreenProps = BottomTabScreenProps<BottomTabParamList, 'HomeTab'>;
type RootNavigation = NativeStackNavigationProp<RootStackParamList>;

interface Vehicle {
    id: string;
    model: string;
    claims: number;
    imageSource?: number;
}

interface Service {
    name: string;
    icon: keyof typeof Feather.glyphMap;
    onPress: () => void;
}

interface Claim {
    id: string;
    title: string;
    date: string;
    status: 'Pending' | 'Settled';
    color: string;
}

// --- MOCK DATA ---
const VEHICLES: Vehicle[] = [{ id: '1', model: 'Toyota Yaris', claims: 0, imageSource: require('../../assets/toyota.png') }, // Assuming a Yaris image
    { id: '2', model: 'Benz CL250', claims: 3, imageSource: require('../../assets/benz.png') }, // Assuming a Tesla image
    
    { id: '3', model: 'Add New', claims: 0 }, // Special card
];

const SERVICES: Service[] = [
    { name: 'Roadside Assistance', icon: 'tool', onPress: () => console.log('Roadside') },
    { name: 'Report Claim', icon: 'alert-triangle', onPress: () => console.log('Report Claim') },
    { name: 'Renew Policy', icon: 'shield', onPress: () => console.log('Renew Policy') },
    { name: 'Find Garage', icon: 'map-pin', onPress: () => console.log('Find Garage') },
];

const CLAIMS: Claim[] = [
    { id: 'c1', title: 'Accident Claim - Policy #1234', date: '15 Nov 2023', status: 'Settled', color: colors.success },
    { id: 'c2', title: 'Windshield Repair - Policy #5678', date: '01 Dec 2023', status: 'Pending', color: colors.warning },
];

// --- COMPONENTS ---

// 1. Service Grid Item
const ServiceItem: React.FC<{ service: Service }> = ({ service }) => (
    <TouchableOpacity style={styles.serviceCard} onPress={service.onPress}>
        <Feather name={service.icon} size={28} color={colors.primary} />
        <Text style={styles.serviceText}>{service.name}</Text>
    </TouchableOpacity>
);

// 2. Claim List Item
const ClaimItem: React.FC<{ claim: Claim }> = ({ claim }) => (
    <Pressable style={styles.claimCard} onPress={() => console.log(`View claim ${claim.id}`)}>
        <View style={[styles.claimStatus, { backgroundColor: claim.color }]} />
        <View style={styles.claimContent}>
            <Text style={styles.claimTitle} numberOfLines={1}>{claim.title}</Text>
            <Text style={styles.claimDate}>{claim.date}</Text>
        </View>
        <Feather name="chevron-right" size={20} color={colors.textSecondary} />
    </Pressable>
);

const HomeScreen: React.FC<HomeScreenProps> = () => {
    const navigation = useNavigation<RootNavigation>();
    const [selectedVehicleId, setSelectedVehicleId] = useState<string>('1'); // Default to Tesla

    const handleUpgradePress = () => {
        // Navigate to the modal for Individual/Corporate selection
        navigation.navigate('UpgradePrompt');
    };

    const renderVehicle = ({ item }: { item: Vehicle }) => (
        <VehicleCard
            id={item.id}
            model={item.model}
            claims={item.claims}
            isSelected={item.id === selectedVehicleId}
            onSelect={setSelectedVehicleId}
            imageSource={item.imageSource}
        />
    );

    return (
        <View style={styles.flex}>
            {/* Custom Header (Logo, Notif, Profile) */}
            <Header isHomeHeader={true} />

            <ScrollView 
                style={styles.flex}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* 1. My Vehicles Section */}
                

                {/* 2. Upgrade to Corporate Account Banner */}
                <TouchableOpacity 
                    style={styles.upgradeBanner} 
                    onPress={handleUpgradePress}
                    activeOpacity={0.8}
                >
                    <View style={styles.upgradeContent}>
                        
                        <View style={{ flex: 1, marginLeft: spacing.m }}>
                            <Text style={styles.upgradeTitle}>Upgrade to Motor Insurance Plan</Text>
                            <Text style={styles.upgradeSubtitle}>
                                Enjoy reduced insurance rates and fleet management tools.
                            </Text>
                        </View>
                    </View>
                    <View style={styles.upgradeButton}>
                        <Text style={styles.upgradeButtonText}>Upgrade Now</Text>
                    </View>
                     <Image 
                                    // !!! NOTE: Update this path to your actual logo image in assets !!!
                                    source={require('../../assets/homecar.png')}
                                    style={styles.vehicleImage} 
                                    
                                />
                </TouchableOpacity>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Your Insured Cars</Text>
                    <FlatList
                        data={VEHICLES}
                        renderItem={renderVehicle}
                        keyExtractor={item => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.vehicleList}
                    />
                </View>
                {/* 3. Services Section */}
               

                {/* 4. Claims Section */}
                <View style={[styles.section, { marginBottom: spacing.xxl }]}>
                    <View style={styles.claimsHeader}>
                        <Text style={styles.sectionTitle}>Claims</Text>
                        <Pressable onPress={() => console.log('View All Claims')}>
                            <Text style={styles.viewAllText}>View All</Text>
                        </Pressable>
                    </View>
                    <FlatList
                        data={CLAIMS}
                        renderItem={({ item }) => <ClaimItem claim={item} />}
                        keyExtractor={item => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.claimsList}
                    />
                </View>

            </ScrollView>
        </View>
    );
};

// --- STYLESHEET ---
const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: colors.background, // Light gray background
    },
    scrollContent: {
        paddingBottom: spacing.l, // Extra space at the bottom for scroll
    },
    section: {
        paddingTop: spacing.l,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.textPrimary,
        paddingHorizontal: spacing.l,
        marginBottom: spacing.m,
    },

    // --- Vehicle Section Styles ---
    vehicleList: {
        paddingHorizontal: spacing.l,
    },

    // --- Upgrade Banner Styles ---
    upgradeBanner: {
        backgroundColor: colors.primary, // Orange/Red background
        marginHorizontal: spacing.l,
        borderRadius: spacing.m,
        padding: spacing.m,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginTop: spacing.m, // Space from vehicle list
        // Subtle shadow
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    upgradeContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flexShrink: 1,
        marginBottom: spacing.m,
    },
    upgradeIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white
        alignItems: 'center',
        justifyContent: 'center',
    },
    upgradeTitle: {
        fontSize: 25,
        fontWeight: '700',
        color: colors.secondary, // White
        marginBottom: spacing.xs / 2,
    },
    upgradeSubtitle: {
        fontSize: 15,
        color: colors.secondary, // White
    },
    upgradeButton: {
        backgroundColor: '#f4faffff', // Dark Blue/Gray button
        paddingVertical: spacing.s,
        paddingHorizontal: spacing.m,
        borderRadius: spacing.m,
        marginLeft: spacing.m,
        marginTop: spacing.m,
    },
    upgradeButtonText: {
        color: colors.primary, // White
        fontWeight: '700',
        fontSize: 14,
    },
    vehicleImage: {
        width: '100%',
        height: 160,
        resizeMode: 'contain',
        marginBottom: spacing.xs,
    },

    // --- Services Section Styles ---
    serviceGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.l,
    },
    serviceCard: {
        width: '48%', // Approx. half of the width minus spacing
        backgroundColor: colors.secondary, // White
        borderRadius: spacing.s,
        padding: spacing.m,
        marginBottom: spacing.m,
        alignItems: 'center',
        justifyContent: 'center',
        height: 120,
        // Card shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    serviceText: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.textPrimary,
        marginTop: spacing.s,
        textAlign: 'center',
    },

    // --- Claims Section Styles ---
    claimsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.l,
    },
    viewAllText: {
        fontSize: 14,
        color: colors.primary, // Orange/Red color
        fontWeight: '600',
    },
    claimsList: {
        paddingHorizontal: spacing.l,
        paddingVertical: spacing.xs,
    },
    claimCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.secondary, // White
        borderRadius: spacing.s,
        padding: spacing.m,
        marginRight: spacing.m,
        width: 280, 
        borderWidth: 1,
        borderColor: colors.border,
    },
    claimStatus: {
        width: 6,
        height: '80%',
        borderRadius: 3,
        marginRight: spacing.m,
    },
    claimContent: {
        flex: 1,
        marginRight: spacing.m,
    },
    claimTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.textPrimary,
    },
    claimDate: {
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 2,
    },
});

export default HomeScreen;