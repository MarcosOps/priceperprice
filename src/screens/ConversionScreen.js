import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

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
          message: 'Produto 1 é mais barato que o Produto 2',
          winner: 'Produto 1',
          difference: `${difference} por unidade`,
        });
      } else if (pricePerUnit1 > pricePerUnit2) {
        setResult({
          message: 'Produto 2 é mais barato que o Produto 1',
          winner: 'Produto 2',
          difference: `${difference} por unidade`,
        });
      } else {
        setResult({
          message: 'Os produtos têm o mesmo preço por unidade.',
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
              Diferença: {result.difference}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5,
  },
  inputGroup: {
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  calculateButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  resultMessage: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  resultWinner: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#28a745', // Verde para o vencedor
    marginTop: 10,
  },
  resultDifference: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
});