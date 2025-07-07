import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
import { LanguageProvider } from './src/context/LanguageContext';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <LanguageProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <StackNavigator />
      </NavigationContainer>
    </LanguageProvider>
  );
}
