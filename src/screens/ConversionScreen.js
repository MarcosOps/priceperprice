import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './styles'; // Importing styles

const units = [
  "ml", "L", "oz", "gal", "cm", "m", "inch", "ft", "mg", "g", "kg", "lb", "oz", "unit"
];

// Function to render text with different colors
const renderColoredText = (text) => {
  const parts = text.split('Per'); // Split the text into parts
  return parts.map((part, index) => {
    if (index < parts.length - 1) {
      return (
        <Text key={index}>
          <Text style={{ color: '#000000' }}>{part}</Text>
          <Text style={{ color: '#FF0000' }}>Per</Text>
        </Text>
      );
    } else {
      return <Text key={index} style={{ color: '#000000' }}>{part}</Text>;
    }
  });
};

// Function to format the value as currency
const formatCurrency = (value) => {
  const numericValue = value.replace(/[^0-9]/g, '');
  const number = parseFloat(numericValue) / 100;
  return number.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export default function ConversionScreen() {
  const [unit1, setUnit1] = useState(units[0]);
  const [quantity1, setQuantity1] = useState('');
  const [price1, setPrice1] = useState('');

  const [unit2, setUnit2] = useState(units[0]);
  const [quantity2, setQuantity2] = useState('');
  const [price2, setPrice2] = useState('');

  const [result, setResult] = useState('');

  // Function to calculate price per unit
  const calculatePricePerUnit = (quantity, price) => {
    if (quantity && price) {
      return parseFloat(price) / parseFloat(quantity);
    }
    return null;
  };

  // Function to compare prices
  const comparePrices = () => {
    if (unit1 === "unit" && unit2 !== "unit") {
      setResult({
        message: 'The "unit" unit can only be compared with itself.',
        winner: null,
        difference: null,
      });
      return;
    }

    if (unit2 === "unit" && unit1 !== "unit") {
      setResult({
        message: 'The "unit" unit can only be compared with itself.',
        winner: null,
        difference: null,
      });
      return;
    }

    const pricePerUnit1 = calculatePricePerUnit(quantity1, price1.replace(/[^0-9.]/g, ''));
    const pricePerUnit2 = calculatePricePerUnit(quantity2, price2.replace(/[^0-9.]/g, ''));

    if (pricePerUnit1 !== null && pricePerUnit2 !== null) {
      const difference = Math.abs(pricePerUnit1 - pricePerUnit2).toFixed(2);

      if (pricePerUnit1 < pricePerUnit2) {
        setResult({
          message: `Product 1 is cheaper than Product 2 per ${unit1}`,
          winner: 'Product 1',
          difference: `Difference: $${difference} per ${unit1}`,
        });
      } else if (pricePerUnit1 > pricePerUnit2) {
        setResult({
          message: `Product 2 is cheaper than Product 1 per ${unit2}`,
          winner: 'Product 2',
          difference: `Difference: $${difference} per ${unit2}`,
        });
      } else {
        setResult({
          message: `Both products have the same price per ${unit1}.`,
          winner: null,
          difference: null,
        });
      }
    } else {
      setResult({
        message: 'Please enter valid values for quantity and price.',
        winner: null,
        difference: null,
      });
    }
  };

  // Function to clear fields and result
  const clearFields = () => {
    setUnit1(units[0]);
    setQuantity1('');
    setPrice1('');
    setUnit2(units[0]);
    setQuantity2('');
    setPrice2('');
    setResult('');
  };

  return (
    <View style={styles.conversionContainer}>
      {/* Title with "Per" in red */}
      <Text style={styles.conversionTitle}>
        {renderColoredText('PricePerPrice')}
      </Text>

      {/* Product 1 */}
      <Text style={styles.conversionLabel}>Product 1</Text>
      <View style={styles.conversionInputGroup}>
        <Picker
          selectedValue={unit1}
          onValueChange={(itemValue) => setUnit1(itemValue)}
          style={styles.conversionPicker}
        >
          {units.map((unit) => (
            <Picker.Item key={unit} label={unit} value={unit} />
          ))}
        </Picker>
        <TextInput
          style={styles.conversionInput}
          placeholder="Quantity"
          placeholderTextColor="#666"
          keyboardType="numeric"
          value={quantity1}
          onChangeText={setQuantity1}
        />
        <TextInput
          style={styles.conversionInput}
          placeholder="Price"
          placeholderTextColor="#666"
          keyboardType="numeric"
          value={price1}
          onChangeText={(text) => setPrice1(formatCurrency(text))}
        />
      </View>

      {/* Product 2 */}
      <Text style={styles.conversionLabel}>Product 2</Text>
      <View style={styles.conversionInputGroup}>
        <Picker
          selectedValue={unit2}
          onValueChange={(itemValue) => setUnit2(itemValue)}
          style={styles.conversionPicker}
        >
          {units.map((unit) => (
            <Picker.Item key={unit} label={unit} value={unit} />
          ))}
        </Picker>
        <TextInput
          style={styles.conversionInput}
          placeholder="Quantity"
          placeholderTextColor="#666"
          keyboardType="numeric"
          value={quantity2}
          onChangeText={setQuantity2}
        />
        <TextInput
          style={styles.conversionInput}
          placeholder="Price"
          placeholderTextColor="#666"
          keyboardType="numeric"
          value={price2}
          onChangeText={(text) => setPrice2(formatCurrency(text))}
        />
      </View>
            {/* Botões de Calcular e Limpar */}
            <View style={styles.conversionButtonContainer}>
        <TouchableOpacity style={styles.conversionClearButton} onPress={clearFields}>
          <Text style={styles.conversionButtonText}>CLean</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.conversionCalculateButton} onPress={comparePrices}>
          <Text style={styles.conversionButtonText}>Calculate</Text>
        </TouchableOpacity>
      </View>

      {/* Exibir o resultado */}
      {result.message && (
        <View style={styles.conversionResultContainer}>
          <Text style={styles.conversionResultMessage}>{result.message}</Text>
          {result.winner && (
            <Text style={styles.conversionResultWinner}>
              {result.winner} it's cheaper!
            </Text>
          )}
          {result.difference && (
            <Text style={styles.conversionResultDifference}>
              {result.difference}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}
