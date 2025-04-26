import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';

import ColoredTitle from '../components/ColoredTitle';
import ProductInputGroup from '../components/ProductInputGroup';
import ResultDisplay from '../components/ResultDisplay';

import { units, areUnitsCompatible } from '../helpers/units';
import { formatCurrency } from '../helpers/format';
import { calculatePricePerUnit } from '../helpers/validation';

export default function ConversionScreen() {
  const [unit1, setUnit1] = useState(units[0]);
  const [quantity1, setQuantity1] = useState('');
  const [price1, setPrice1] = useState('');

  const [unit2, setUnit2] = useState(units[0]);
  const [quantity2, setQuantity2] = useState('');
  const [price2, setPrice2] = useState('');

  const [result, setResult] = useState({});

  const comparePrices = () => {
    if (!areUnitsCompatible(unit1, unit2)) {
      setResult({
        message: 'Units are not compatible. Please compare liquid with liquid, weight with weight, or quantity with quantity.',
      });
      return;
    }

    const pricePerUnit1 = calculatePricePerUnit(quantity1, price1.replace(/[^0-9.]/g, ''));
    const pricePerUnit2 = calculatePricePerUnit(quantity2, price2.replace(/[^0-9.]/g, ''));

    if (pricePerUnit1 !== null && pricePerUnit2 !== null) {
      const difference = Math.abs(pricePerUnit1 - pricePerUnit2).toFixed(2);

      if (difference < 0.01) {
        setResult({ message: 'Both products have the same price.' });
      } else if (pricePerUnit1 < pricePerUnit2) {
        setResult({
          message: `Product 1 is cheaper than Product 2 per ${unit1}`,
          winner: 'Product 1',
          difference: `Difference: $${difference} per ${unit1}`,
        });
      } else {
        setResult({
          message: `Product 2 is cheaper than Product 1 per ${unit2}`,
          winner: 'Product 2',
          difference: `Difference: $${difference} per ${unit2}`,
        });
      }
    } else {
      setResult({ message: 'Please enter valid values for quantity and price.' });
    }
  };

  const clearFields = () => {
    setUnit1(units[0]);
    setQuantity1('');
    setPrice1('');
    setUnit2(units[0]);
    setQuantity2('');
    setPrice2('');
    setResult({});
  };

  return (
    <View style={styles.conversionContainer}>
      <Text style={styles.conversionTitle}>
        <ColoredTitle text="PricePerPrice" />
      </Text>

      <Text style={styles.conversionLabel}>Product 1</Text>
      <ProductInputGroup
        unit={unit1} setUnit={setUnit1}
        quantity={quantity1} setQuantity={setQuantity1}
        price={price1} setPrice={setPrice1}
        formatCurrency={formatCurrency}
      />

      <Text style={styles.conversionLabel}>Product 2</Text>
      <ProductInputGroup
        unit={unit2} setUnit={setUnit2}
        quantity={quantity2} setQuantity={setQuantity2}
        price={price2} setPrice={setPrice2}
        formatCurrency={formatCurrency}
      />

      <View style={styles.conversionButtonContainer}>
        <TouchableOpacity style={styles.conversionClearButton} onPress={clearFields}>
          <Text style={styles.conversionButtonText}>Clean</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.conversionCalculateButton} onPress={comparePrices}>
          <Text style={styles.conversionButtonText}>Calculate</Text>
        </TouchableOpacity>
      </View>

      <ResultDisplay result={result} />
    </View>
  );
}
