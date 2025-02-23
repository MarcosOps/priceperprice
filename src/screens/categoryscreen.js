import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ComparisonScreen({ route, navigation }) {
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
      const difference = Math.abs(pricePerUnit1 - pricePerUnit2).toFixed(2);

      if (pricePerUnit1 < pricePerUnit2) {
        setResult({
          message: 'Produto 1 é mais barato que o Produto 2',
          winner: 'Produto 1',
          difference: `${difference} ${unit}`,
        });
      } else if (pricePerUnit1 > pricePerUnit2) {
        setResult({
          message: 'Produto 2 é mais barato que o Produto 1',
          winner: 'Produto 2',
          difference: `${difference} ${unit}`,
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

      {/* Botões de navegação no corpo da tela */}
      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color="#000" />
          <Text style={styles.navButtonText}>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Icon name="home" size={24} color="#000" />
          <Text style={styles.navButtonText}>Início</Text>
        </TouchableOpacity>
      </View>
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
    color: '#28a745',
    marginTop: 10,
  },
  resultDifference: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  navButtonText: {
    marginLeft: 5,
    fontSize: 16,
  },
});