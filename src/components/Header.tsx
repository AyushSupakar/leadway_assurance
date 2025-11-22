import React from 'react';
import { View, Pressable, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../themes/colors'; // Assuming colors are defined here
import { spacing } from '../themes/spacing'; // Assuming spacing is defined here
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
    isHomeHeader?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isHomeHeader = false }) => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    if (!isHomeHeader) {
        return (
            <View style={[styles.container, { paddingTop: insets.top + spacing.s }]}>
                <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Feather name="arrow-left" size={24} color={colors.textPrimary} />
                </Pressable>
            </View>
        );
    }

    // Home Screen Header (Logo, Notification, Profile)
    return (
        <View style={[styles.homeContainer, { paddingTop: insets.top + spacing.s }]}>
           
            
            

            {/* 2. Right Icons */}
            
                {/* Notification Bell */}
                <Pressable onPress={() => console.log('Notifications')} style={styles.iconButton}>
                   <Feather name="align-left" size={24} color="black" />
                    {/* Placeholder for notification badge */}
                    <View style={styles.badge} />
                </Pressable>
                <Image 
                // !!! NOTE: Update this path to your actual logo image in assets !!!
                source={require('../../assets/leadwayassurance_icon.png')}
                style={styles.logo} 
                resizeMode='contain'
            />

                {/* Profile Icon */}
                <Pressable onPress={() => console.log('Profile')} style={styles.iconButton}>
                    <Image 
                
                source={require('../../assets/profile_image.png')}
                style={styles.plogo} 
                
            />
                </Pressable>
            
        </View>
    );
};

const styles = StyleSheet.create({
    // --- General Back Button Header (Original) ---
    container: {
        paddingHorizontal: spacing.m,
        paddingBottom: spacing.s,
        backgroundColor: colors.secondary, // White background
    },
    backButton: {
        padding: spacing.xs,
    },
    
    // --- Home Screen Header (New) ---
    homeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: spacing.m,
        backgroundColor: colors.secondary, // White background
        margin:10,
        padding:10,
        paddingHorizontal:20,
        width:'90%',
      },
    logo: {
        width: 100, // Adjust size as needed
        height: 70,
         borderRadius:50
    },
    plogo: {
      borderRadius:50,
        width: 30, // Adjust size as needed
        height: 30,
         
    },
    iconGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        width:'100%',
    },
    iconButton: {
      flexDirection:'row',
        padding: 5,
        marginLeft: spacing.m,
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.primary, // Red/Orange badge color
        borderWidth: 1.5,
        borderColor: colors.secondary,
    }
});

export default Header;