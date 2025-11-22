// src/navigation/types.ts (Final Update)

// ... (BottomTabParamList remains the same)

// Root Stack Navigator (controls full screen navigation)
export type RootStackParamList = {
  Login: undefined; 
  MainTabs: undefined; 
  // This is the new full-screen modal/sheet that pops up from the Home Screen
  UpgradePrompt: undefined; 
  // This is the dedicated stack that manages the multi-step form
  UpgradeForm: undefined; 
};

// Form Stack Navigator (controls the flow inside the upgrade process)
export type FormStackParamList = {
  Step1: undefined;
  Step2: undefined;
  Step3: undefined;
  Success: undefined;
};

// src/navigation/types.ts (Must include 'export')

export type BottomTabParamList = {
  HomeTab: undefined; 
  InsuranceTab: undefined; 
  ClaimsTab: undefined; 
  HelpTab: undefined;
};
// ... other types like RootStackParamList should also be exported