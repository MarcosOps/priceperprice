import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function ComparisonScreen({ route }) {
  const { unit } = route.params;

  // Estados para armazenar os valores inseridos pelo usuário
  const [quantity1, setQuantity1] = useState('');
  const [price1, setPrice1] = useState('');
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
      if (pricePerUnit1 < pricePerUnit2) {
        setResult(`Produto 1 é mais barato que o Produto 2 (${pricePerUnit1.toFixed(2)}/${unit} vs ${pricePerUnit2.toFixed(2)}/${unit})`);
      } else if (pricePerUnit1 > pricePerUnit2) {
        setResult(`Produto 2 é mais barato que o Produto 1 (${pricePerUnit2.toFixed(2)}/${unit} vs ${pricePerUnit1.toFixed(2)}/${unit})`);
      } else {
        setResult('Os produtos têm o mesmo preço por unidade.');
      }
    } else {
      setResult('Por favor, insira valores válidos para quantidade e preço.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comparação de Preço ({unit})</Text>

      {/* Campos para o Produto 1 */}
      <Text style={styles.label}>Produto 1</Text>
      <TextInput
        style={styles.input}
        placeholder={`Quantidade (${unit})`}
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

      {/* Campos para o Produto 2 */}
      <Text style={styles.label}>Produto 2</Text>
      <TextInput
        style={styles.input}
        placeholder={`Quantidade (${unit})`}
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

      {/* Botão para calcular */}
      <TouchableOpacity style={styles.button} onPress={comparePrices}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>

      {/* Exibir o resultado */}
      {result ? <Text style={styles.result}>{result}</Text> : null}
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
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
});