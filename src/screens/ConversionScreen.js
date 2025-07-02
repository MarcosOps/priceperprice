import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import styles from '../styles/styles';

import ColoredTitle from '../components/ColoredTitle';
import ProductInputGroup from '../components/ProductInputGroup';
import ResultDisplay from '../components/ResultDisplay';
import LanguageSelector from '../components/LanguageSelector';

import { formatCurrency } from '../helpers/format';
import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../translations/translations';
import { getTranslatedUnits, compareProducts } from '../helpers/translatedUnits';

export default function ConversionScreen() {
  const { currentLanguage } = useLanguage();
  const lang = currentLanguage.code;
  
  const units = getTranslatedUnits(lang);

  const [unit1, setUnit1] = useState(units[0]);
  const [quantity1, setQuantity1] = useState('');
  const [price1, setPrice1] = useState('');

  const [unit2, setUnit2] = useState(units[0]);
  const [quantity2, setQuantity2] = useState('');
  const [price2, setPrice2] = useState('');

  const [result, setResult] = useState({});

  const comparePrices = () => {
    if (Platform.OS === 'ios') {
      Keyboard.dismiss();
    }
    
    const numericPrice1 = (parseFloat(price1.replace(/[^0-9]/g, '')) || 0) / 100;
    const numericPrice2 = (parseFloat(price2.replace(/[^0-9]/g, '')) || 0) / 100;
    
    const numericQuantity1 = parseFloat(quantity1);
    const numericQuantity2 = parseFloat(quantity2);

    if (isNaN(numericPrice1) || isNaN(numericPrice2) || 
        isNaN(numericQuantity1) || isNaN(numericQuantity2) ||
        numericQuantity1 <= 0 || numericQuantity2 <= 0) {
      setResult({ error: 'INVALID_INPUT' });
      return;
    }
  
    const product1 = {
      price: numericPrice1,
      quantity: numericQuantity1,
      unit: unit1
    };
  
    const product2 = {
      price: numericPrice2,
      quantity: numericQuantity2,
      unit: unit2
    };
  
    const comparisonResult = compareProducts(product1, product2, lang);
    setResult(comparisonResult);
  };

  const clearFields = () => {
    if (Platform.OS === 'ios') {
      Keyboard.dismiss();
    }
    
    setUnit1(units[0]);
    setQuantity1('');
    setPrice1('');
    setUnit2(units[0]);
    setQuantity2('');
    setPrice2('');
    setResult({});
  };

  return (
    <TouchableWithoutFeedback onPress={() => Platform.OS === 'ios' && Keyboard.dismiss()}>
    <View style={styles.conversionContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.conversionTitle}>
          <ColoredTitle text="PricePerPrice" />
        </Text>
        <View style={{ position: 'absolute', right: 0 }}>
          <LanguageSelector />
        </View>
      </View>

      <Text style={styles.conversionLabel}>{getTranslation(lang, 'product1')}</Text>
      <ProductInputGroup
        unit={unit1} setUnit={setUnit1}
        quantity={quantity1} setQuantity={setQuantity1}
        price={price1} setPrice={setPrice1}
        formatCurrency={(text) => setPrice1(formatCurrency(text, lang))}
      />

      <Text style={styles.conversionLabel}>{getTranslation(lang, 'product2')}</Text>
      <ProductInputGroup
        unit={unit2} setUnit={setUnit2}
        quantity={quantity2} setQuantity={setQuantity2}
        price={price2} setPrice={setPrice2}
        formatCurrency={(text) => setPrice2(formatCurrency(text, lang))}
      />

      <View style={styles.conversionButtonContainer}>
        <TouchableOpacity style={styles.conversionClearButton} onPress={clearFields}>
          <Text style={styles.conversionButtonText}>{getTranslation(lang, 'clean')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.conversionCalculateButton} onPress={comparePrices}>
          <Text style={styles.conversionButtonText}>{getTranslation(lang, 'calculate')}</Text>
        </TouchableOpacity>
      </View>

      <ResultDisplay result={result} />
    </View>
    </TouchableWithoutFeedback>
  );
}
