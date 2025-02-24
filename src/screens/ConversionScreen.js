import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './styles'; // Importando os estilos

const units = [
  "ml", "L", "oz", "gal", "cm", "m", "inch", "ft", "mg", "g", "kg", "lb", "oz"
];

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

  // Função para comparar os preços
  const comparePrices = () => {
    const pricePerUnit1 = calculatePricePerUnit(quantity1, price1);
    const pricePerUnit2 = calculatePricePerUnit(quantity2, price2);

    if (pricePerUnit1 !== null && pricePerUnit2 !== null) {
      const difference = Math.abs(pricePerUnit1 - pricePerUnit2).toFixed(2);

      if (pricePerUnit1 < pricePerUnit2) {
        setResult({
          message: `Produto 1 é mais barato que o Produto 2 por ${unit1}`,
          winner: 'Produto 1',
          difference: `Diferença: ${difference} por ${unit1}`,
        });
      } else if (pricePerUnit1 > pricePerUnit2) {
        setResult({
          message: `Produto 2 é mais barato que o Produto 1 por ${unit2}`,
          winner: 'Produto 2',
          difference: `Diferença: ${difference} por ${unit2}`,
        });
      } else {
        setResult({
          message: `Os produtos têm o mesmo preço por ${unit1}.`,
          winner: null,
          difference: null,
        });
      }
    } else {
      setResult({
        message: 'Por favor, insira valores válidos para quantidade e preço.',
        winner: null,
        difference: null,
      });
    }
  };

  // Função para limpar os campos e o resultado
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
    <View style={styles.container}>
      <Text style={styles.title}>Comparação de Preços</Text>

      {/* Produto 1 */}
      <Text style={styles.label}>Produto 1</Text>
      <View style={styles.inputGroup}>
        <Picker
          selectedValue={unit1}
          onValueChange={(itemValue) => setUnit1(itemValue)}
          style={styles.picker}
        >
          {units.map((unit) => (
            <Picker.Item key={unit} label={unit} value={unit} />
          ))}
        </Picker>
        <TextInput
          style={styles.input}
          placeholder="Quantidade"
          keyboardType="numeric"
          value={quantity1}
          onChangeText={setQuantity1}
        />
        <TextInput
          style={styles.input}
          placeholder="Preço"
          keyboardType="numeric"
          value={price1}
          onChangeText={setPrice1}
        />
      </View>

      {/* Produto 2 */}
      <Text style={styles.label}>Produto 2</Text>
      <View style={styles.inputGroup}>
        <Picker
          selectedValue={unit2}
          onValueChange={(itemValue) => setUnit2(itemValue)}
          style={styles.picker}
        >
          {units.map((unit) => (
            <Picker.Item key={unit} label={unit} value={unit} />
          ))}
        </Picker>
        <TextInput
          style={styles.input}
          placeholder="Quantidade"
          keyboardType="numeric"
          value={quantity2}
          onChangeText={setQuantity2}
        />
        <TextInput
          style={styles.input}
          placeholder="Preço"
          keyboardType="numeric"
          value={price2}
          onChangeText={setPrice2}
        />
      </View>

      {/* Botões de Calcular e Limpar */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.calculateButton} onPress={comparePrices}>
          <Text style={styles.buttonText}>Calcular</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.clearButton} onPress={clearFields}>
          <Text style={styles.buttonText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {/* Exibir o resultado */}
      {result.message && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultMessage}>{result.message}</Text>
          {result.winner && (
            <Text style={styles.resultWinner}>
              {result.winner} é mais barato!
            </Text>
          )}
          {result.difference && (
            <Text style={styles.resultDifference}>
              {result.difference}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}