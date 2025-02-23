import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const subcategories = {
  Volume: ["ml", "L", "oz", "gal"],
  Length: ["cm", "m", "inch", "ft"],
  Mass: ["mg", "g", "kg", "lb", "oz"],
};

const unitIcons = {
  ml: 'water',
  L: 'water',
  oz: 'bottle-wine',
  gal: 'gas-cylinder',
  cm: 'ruler',
  m: 'ruler',
  inch: 'ruler',
  ft: 'ruler',
  mg: 'weight-gram',
  g: 'weight',
  kg: 'weight-kilogram',
  lb: 'weight-pound',
};

export default function CategoryScreen({ route, navigation }) {
  const { category } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha uma Unidade ({category})</Text>
      
      {subcategories[category].map((unit) => (
        <TouchableOpacity
          key={unit}
          style={styles.button}
          onPress={() => navigation.navigate('Comparison', { unit })}
        >
          <Icon name={unitIcons[unit]} size={24} color="#000" />
          <Text style={styles.buttonText}>{unit}</Text>
        </TouchableOpacity>
      ))}

      {/* Ícone de Home no corpo da tela */}
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Icon name="home" size={24} color="#000" />
        <Text style={styles.homeButtonText}>Voltar para Início</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    width: '80%',
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 18,
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
  },
  homeButtonText: {
    marginLeft: 10,
    fontSize: 16,
  },
});