import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Available languages
export const languages = {
  en: {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    countryCode: 'us'
  },
  es: {
    code: 'es',
    name: 'Español',
    flag: '🇪🇸',
    countryCode: 'es'
  },
  pt: {
    code: 'pt',
    name: 'Português',
    flag: '🇧🇷',
    countryCode: 'br'
  },
  fr: {
    code: 'fr',
    name: 'Français',
    flag: '🇫🇷',
    countryCode: 'fr'
  }
};

// Create the language context
const LanguageContext = createContext();

// Language provider component
export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(languages.en);

  // Load saved language preference on app start
  useEffect(() => {
    const loadLanguagePreference = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('userLanguage');
        if (savedLanguage && languages[savedLanguage]) {
          setCurrentLanguage(languages[savedLanguage]);
        }
      } catch (error) {
        console.error('Failed to load language preference:', error);
      }
    };

    loadLanguagePreference();
  }, []);

  // Change language function
  const changeLanguage = async (languageCode) => {
    if (languages[languageCode]) {
      setCurrentLanguage(languages[languageCode]);
      try {
        await AsyncStorage.setItem('userLanguage', languageCode);
      } catch (error) {
        console.error('Failed to save language preference:', error);
      }
    }
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);
