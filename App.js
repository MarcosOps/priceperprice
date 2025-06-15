import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
import { LanguageProvider } from './src/context/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </LanguageProvider>
  );
}
