import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './styles'; // Importing styles

// Categorias de unidades
const unitCategories = {
  liquid: ["ml", "L", "oz", "gal"],
  weight: ["mg", "g", "kg", "lb", "oz"],
  quantity: ["unit"]
};

const units = [...unitCategories.liquid, ...unitCategories.weight, ...unitCategories.quantity];

// Função para verificar se duas unidades estão na mesma categoria
const areUnitsCompatible = (unit1, unit2) => {
  const category1 = Object.keys(unitCategories).find(category => unitCategories[category].includes(unit1));
  const category2 = Object.keys(unitCategories).find(category => unitCategories[category].includes(unit2));
  return category1 === category2;
};

// Função para renderizar texto com cores diferentes
const renderColoredText = (text) => {
  const parts = text.split('Per'); // Divide o texto em partes
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

// Função para formatar o valor como moeda
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

  // Função para calcular o preço por unidade
  const calculatePricePerUnit = (quantity, price) => {
    if (quantity && price) {
      return parseFloat(price) / parseFloat(quantity);
    }
    return null;
  };

  // Função para comparar preços
  const comparePrices = () => {
    if (!areUnitsCompatible(unit1, unit2)) {
      setResult({
        message: 'Units are not compatible. Please compare liquid with liquid, weight with weight, or quantity with quantity.',
        winner: null,
        difference: null,
      });
      return;
    }

    const pricePerUnit1 = calculatePricePerUnit(quantity1, price1.replace(/[^0-9.]/g, ''));
    const pricePerUnit2 = calculatePricePerUnit(quantity2, price2.replace(/[^0-9.]/g, ''));

    if (pricePerUnit1 !== null && pricePerUnit2 !== null) {
      const difference = Math.abs(pricePerUnit1 - pricePerUnit2).toFixed(2);

      if (difference < 0.01) {
        setResult({
          message: 'Both products have the same price.',
          winner: null,
          difference: null,
        });
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
      setResult({
        message: 'Please enter valid values for quantity and price.',
        winner: null,
        difference: null,
      });
    }
  };

  // Função para limpar campos e resultado
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
      {/* Título com "Per" em vermelho */}
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
          <Text style={styles.conversionButtonText}>Clean</Text>
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