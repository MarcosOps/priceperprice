import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
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

  const handleComparePrices = useCallback(() => {
    Keyboard.dismiss();
    
    const nPrice1 = parseFloat(price1.replace(/[^0-9]/g, '')) / 100 || 0;
    const nPrice2 = parseFloat(price2.replace(/[^0-9]/g, '')) / 100 || 0;
    const nQuantity1 = parseFloat(quantity1) || 0;
    const nQuantity2 = parseFloat(quantity2) || 0;

    if (nQuantity1 <= 0 || nQuantity2 <= 0 || nPrice1 <= 0 || nPrice2 <= 0) {
      setResult({ error: 'INVALID_INPUT' });
      return;
    }
  
    const product1 = { price: nPrice1, quantity: nQuantity1, unit: unit1 };
    const product2 = { price: nPrice2, quantity: nQuantity2, unit: unit2 };
  
    const comparisonResult = compareProducts(product1, product2, lang);
    setResult(comparisonResult);
  }, [price1, price2, quantity1, quantity2, unit1, unit2, lang]);

  const handleClearFields = useCallback(() => {
    Keyboard.dismiss();
    setUnit1(units[0]);
    setQuantity1('');
    setPrice1('');
    setUnit2(units[0]);
    setQuantity2('');
    setPrice2('');
    setResult({});
  }, [units]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.conversionContainer} contentContainerStyle={{ flexGrow: 1 }}>
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
          <TouchableOpacity style={styles.conversionClearButton} onPress={handleClearFields}>
            <Text style={styles.conversionButtonText}>{getTranslation(lang, 'clean')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.conversionCalculateButton} onPress={handleComparePrices}>
            <Text style={styles.conversionButtonText}>{getTranslation(lang, 'calculate')}</Text>
          </TouchableOpacity>
        </View>

        <ResultDisplay result={result} />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
