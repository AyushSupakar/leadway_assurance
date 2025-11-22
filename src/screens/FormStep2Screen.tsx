// src/screens/FormStep2Screen.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FormStackParamList } from '../navigation/types'; 
import Button from '../components/Button';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import VehicleCard from '../components/VehicleCard'; 
import { format } from 'date-fns';
import { colors } from '../themes/colors';
import { spacing } from '../themes/spacing';
import { Feather } from '@expo/vector-icons'; 

type Step2Props = NativeStackScreenProps<FormStackParamList, 'Step2'>;

// Define the type for a Claim object (if needed)
interface Vehicle {
    id: string;
    model: string;
    claims: number;
    imageSource?: number;
}

// Mock data for cars
const VEHICLES_MOCK: Vehicle[] = [{ id: '1', model: 'Toyota Yaris', claims: 0, imageSource: require('../../assets/toyota.png') }, // Assuming a Yaris image
    { id: '2', model: 'Benz CL250', claims: 3, imageSource: require('../../assets/benz.png') }, // Assuming a Tesla image
    
    { id: '3', model: 'Add New', claims: 0 }, // Special card
];

// Define Props for the StepIndicator component (FIXES THE 'ANY' ERROR)
interface StepIndicatorProps {
    step: number;
}

const FormStep2Screen: React.FC<Step2Props> = ({ navigation }) => {
  const [vehicles, setVehicles] = useState(VEHICLES_MOCK);
  const [selectedVehicleId, setSelectedVehicleId] = useState('1'); 
  const [carName, setCarName] = useState('Toyota Yaris');
  const [numberPlate, setNumberPlate] = useState('KSF102HS07');
  const [dateOfPurchase, setDateOfPurchase] = useState<Date>(new Date(1890, 0, 25)); 
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // --- Handlers ---
  const handleSelectVehicle = (id: string) => {
    setSelectedVehicleId(id);
    // Logic to load existing car data if it's not 'Add New'
    if (id !== '3') {
        setCarName(VEHICLES_MOCK.find(v => v.id === id)?.model || '');
    } else {
        setCarName('');
        setNumberPlate('');
        setDateOfPurchase(new Date());
    }
  };

  const handleContinue = () => {
    navigation.navigate('Step3');
  };

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleConfirmDate = (date: Date) => {
    setDateOfPurchase(date);
    hideDatePicker();
  };
  
  // Custom Step indicator component 
  const StepIndicator: React.FC<StepIndicatorProps> = ({ step }) => (
      <View style={styles.indicatorContainer}>
          <View style={styles.stepActive}>
              {step > 1 ? <Feather name="check" size={16} color={colors.secondary} /> : <Text style={styles.stepText}>1</Text>}
          </View>
          <View style={styles.line} />
          <View style={step >= 2 ? styles.stepActive : styles.stepInactive}>
              {step > 2 ? <Feather name="check" size={16} color={colors.secondary} /> : <Text style={styles.stepText}>2</Text>}
          </View>
          <View style={styles.line} />
          <View style={step >= 3 ? styles.stepActive : styles.stepInactive}>
              {step > 3 ? <Feather name="check" size={16} color={colors.secondary} /> : <Text style={styles.stepText}>3</Text>}
          </View>
      </View>
  );

  return (
    <View style={styles.flex}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Upgrade to Comprehensive Motor Insurance Plan</Text>
        <Text style={styles.subtitle}>Fill or Update your information and we'll get your vehicle covered in no time.</Text>
        
        {/* Step Indicator (2.jpg) */}
        <StepIndicator step={2} />
        <View style={styles.indicatorLabels}>
            <Text style={styles.labelInactive}>Personal Info</Text>
            <Text style={styles.labelActive}>ID/Vehicle Details</Text>
            <Text style={styles.labelInactive}>Quote</Text>
        </View>

        {/* Upload Status Bar (Top of 2.jpg) */}
        <View style={styles.uploadContainer}>
            <Feather name="file-text" size={20} color={colors.primary} />
            <View style={styles.uploadStatusBar}>
                <Text style={styles.uploadText}>Driver's License/Dami-Benson</Text>
                <Text style={styles.uploadPercentage}>87%</Text>
                <View style={styles.uploadBar}>
                    <View style={[styles.uploadProgress, { width: '87%' }]} />
                </View>
            </View>
            <Pressable>
                <Text style={styles.uploadMoreText}>+ Upload more</Text>
            </Pressable>
        </View>

        {/* Vehicle Selection List */}
        <Text style={styles.sectionTitle}>Vehicle Information</Text>
        <FlatList
            data={vehicles}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <VehicleCard 
                    {...item} 
                    isSelected={item.id === selectedVehicleId}
                    onSelect={handleSelectVehicle}
                />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
        />
        
        {/* Form Fields */}
        <Text style={styles.label}>Car Name</Text>
        <TextInput style={styles.input} value={carName} onChangeText={setCarName} />
        
        <Text style={styles.label}>Number Plate</Text>
        <TextInput style={styles.input} value={numberPlate} onChangeText={setNumberPlate} />
        
        {/* Date of Purchase Field */}
        <Text style={styles.label}>Date of Purchase</Text>
        <Pressable style={styles.inputDate} onPress={showDatePicker}>
            <Text style={styles.dateText}>{format(dateOfPurchase, 'dd - MMMM - yyyy')}</Text>
            <Feather name="calendar" size={20} color={colors.textSecondary} />
        </Pressable>

      </ScrollView>

      {/* Fixed Button at the Bottom */}
      <View style={styles.footer}>
        <Button title="Continue" onPress={handleContinue} />
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={dateOfPurchase}
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
      />
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
  // --- Step Indicator Styles ---
  indicatorContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.s, paddingHorizontal: spacing.m },
  stepActive: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  stepInactive: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  stepText: { color: colors.secondary, fontWeight: 'bold' },
  line: { flex: 1, height: 2, backgroundColor: colors.border, marginHorizontal: spacing.s },
  indicatorLabels: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xl },
  labelActive: { color: colors.primary, fontWeight: '600', fontSize: 12, textAlign: 'center', flex: 1 },
  labelInactive: { color: colors.textSecondary, fontSize: 12, textAlign: 'center', flex: 1 },
  // --- Upload Status Bar Styles ---
  uploadContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: colors.background, 
      borderRadius: spacing.s,
      padding: spacing.m,
      marginBottom: spacing.l,
      borderWidth: 1,
      borderColor: colors.border,
  },
  uploadStatusBar: {
      flex: 1,
      marginHorizontal: spacing.m,
  },
  uploadText: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.textPrimary,
  },
  uploadPercentage: {
      fontSize: 12,
      color: colors.primary,
      alignSelf: 'flex-end',
      marginTop: -spacing.m,
      marginBottom: spacing.xs,
  },
  uploadBar: {
      height: 5,
      backgroundColor: colors.border,
      borderRadius: 2.5,
  },
  uploadProgress: {
      height: '100%',
      backgroundColor: colors.primary,
      borderRadius: 2.5,
  },
  uploadMoreText: {
      fontSize: 12,
      color: colors.primary,
      textDecorationLine: 'underline',
      paddingTop: spacing.xs,
  },
  // --- Vehicle List Styles ---
  sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.textPrimary,
      marginBottom: spacing.m,
      paddingLeft: spacing.xs,
  },
  horizontalList: {
      marginBottom: spacing.l,
      paddingRight: spacing.m,
  },
  // --- Form Input Styles ---
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: spacing.m,
    marginBottom: spacing.s,
  },
  input: {
    backgroundColor: colors.background, 
    borderRadius: spacing.s,
    paddingHorizontal: spacing.m,
    fontSize: 16,
    color: colors.textPrimary,
    height: 50,
    borderWidth: 0,
  },
  inputDate: {
    backgroundColor: colors.background, 
    borderRadius: spacing.s,
    paddingHorizontal: spacing.m,
    height: 50,
    borderWidth: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  footer: {
    padding: spacing.l,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  }
});

export default FormStep2Screen;