🚗 LeadWay Assurance Mobile App 

This repository contains the source code for the LeadWay Insurance Mobile Application, built using Expo and React Native. This application allows users to manage their vehicles, view insurance claims, access services (like roadside assistance), and initiate an upgrade to a Corporate Account.

The core user experience is focused on a modern, clean, and highly responsive design, implemented according to the provided Figma specification.

🌟 Key Features

Vehicle Management: View and select individual vehicles with a clear, card-based interface.

Core Services: Quick access to essential functions like Roadside Assistance, Reporting Claims, Policy Renewal, and finding a local Garage.

Claims Overview: A horizontal list showing the status of recent claims (Pending/Settled).

Corporate Account Upgrade Flow: A prominent banner and multi-step form to guide users through upgrading their individual policy to a corporate one.

Prompt screen for selecting Individual or Corporate account type.

Dedicated stack navigator (UpgradeFormStack) for the multi-step upgrade process.

Intuitive Navigation: Uses @react-navigation/native-stack for core flow and @react-navigation/bottom-tabs for the main application screens (Home, Insurance, Claims, Help).

🛠️ Technology Stack

Framework: React Native (Managed by Expo)

Navigation: @react-navigation (Stack and Bottom Tabs)

Styling: React Native StyleSheet (Theming with colors.ts and spacing.ts)

Icons: @expo/vector-icons (Feather, MaterialCommunityIcons)

🚀 Getting Started

Prerequisites

You must have the following installed on your machine:

Node.js (LTS version recommended)

Expo CLI (npm install -g expo-cli) or use npx expo

Yarn or npm (Yarn is generally preferred in the Expo ecosystem)

Installation

Clone the repository:

git clone https://github.com/AyushSupakar/leadway_assurance.git
cd leadway


Install dependencies:

npm install
# or
yarn install


Start the Expo Development Server:

npm start
# or
expo start


This will open the Expo DevTools in your browser. You can then:

Scan the QR code with the Expo Go app on your phone (iOS or Android).

Run the app on an Android emulator (a).

Run the app on an iOS simulator (i).

📁 Project Structure

The key files involved in the implementation are:

File Path

Description

App.tsx

Main entry point; handles font loading and Splash Screen management.

src/navigation/AppNavigator.tsx

Defines the root navigation stack (Login -> MainTabs, UpgradePrompt Modal, UpgradeForm Stack).

src/navigation/MainTabNavigator.tsx

Defines the bottom tab bar structure (Home, Claims, Insurance, Help).

src/screens/HomeScreen.tsx

Implements the main screen layout based on the Figma design, including the vehicle list, upgrade banner, services grid, and claims list.

src/screens/UpgradePromptScreen.tsx

The modal screen that appears for the user to select between Individual and Corporate upgrade types.

src/components/Header.tsx

A reusable header component, customized for the Home screen to show the Logo, Notification, and Profile icons.

src/components/VehicleCard.tsx

The component used to display and select a single vehicle, featuring distinct styling for the active (selected) state.

src/themes/colors.ts

(Assumed file) Defines the primary color palette (e.g., primary for Orange/Red, secondary for White, Blue for selected cards).

assets/

Directory for all local assets, including logo.png, car_tesla.png, etc.

🎨 Design Reference

The application screens, particularly the HomeScreen, are designed to be pixel-accurate to the provided Figma screenshot, ensuring a high-fidelity user experience.

🤝 Contributing

(Add your specific contribution guidelines here)

License

(Add your license information here)