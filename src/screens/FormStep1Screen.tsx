// src/screens/FormStep1Screen.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FormStackParamList } from '../navigation/types'; 
import Button from '../components/Button';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
import { colors } from '../themes/colors';
import { spacing } from '../themes/spacing';
import { Feather } from '@expo/vector-icons'; 

type Step1Props = NativeStackScreenProps<FormStackParamList, 'Step1'>;

// Define Props for the StepIndicator component (FIXES THE 'ANY' ERROR)
interface StepIndicatorProps {
    step: number;
}

const FormStep1Screen: React.FC<Step1Props> = ({ navigation }) => {
  const [firstName, setFirstName] = useState('Damola');
  const [lastName, setLastName] = useState('Benson-Okoh');
  const [dob, setDob] = useState<Date>(new Date(1890, 0, 25)); 
  const [email, setEmail] = useState('damola.benson@example.com');
  const [phone, setPhone] = useState('0801 234 5678');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // --- Handlers ---
  const handleContinue = () => {
    // Basic validation and navigate to the next step
    navigation.navigate('Step2');
  };

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleConfirmDate = (date: Date) => {
    setDob(date);
    hideDatePicker();
  };
  
  // Custom Step indicator component 
  const StepIndicator: React.FC<StepIndicatorProps> = ({ step }) => (
      <View style={styles.indicatorContainer}>
          <View style={step >= 1 ? styles.stepActive : styles.stepInactive}>
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
        
        {/* Step Indicator (1.jpg) */}
        <StepIndicator step={1} />
        <View style={styles.indicatorLabels}>
            <Text style={styles.labelActive}>Personal Info</Text>
            <Text style={styles.labelInactive}>ID/Vehicle Details</Text>
            <Text style={styles.labelInactive}>Quote</Text>
        </View>

        {/* Form Fields */}
        <Text style={styles.label}>First Name</Text>
        <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />
        
        <Text style={styles.label}>Last Name</Text>
        <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />
        
        <Text style={styles.label}>Email Address</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
        
        <Text style={styles.label}>Phone Number</Text>
        <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        
        {/* Date of Birth Field */}
        <Text style={styles.label}>Date of Birth</Text>
        <Pressable style={styles.inputDate} onPress={showDatePicker}>
            <Text style={styles.dateText}>{format(dob, 'dd - MMMM - yyyy')}</Text>
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
        date={dob}
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
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.s,
    paddingHorizontal: spacing.m,
  },
  stepActive: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepInactive: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepText: {
    color: colors.secondary,
    fontWeight: 'bold',
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: colors.border,
    marginHorizontal: spacing.s,
  },
  indicatorLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xxl,
  },
  labelActive: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 12,
    textAlign: 'center',
    flex: 1,
  },
  labelInactive: {
    color: colors.textSecondary,
    fontSize: 12,
    textAlign: 'center',
    flex: 1,
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
    backgroundColor: colors.background, // White input background
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

export default FormStep1Screen;