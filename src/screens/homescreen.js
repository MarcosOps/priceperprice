import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha uma Categoria</Text>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Category', { category: 'Volume' })}
      >
        <Icon name="cup-water" size={24} color="#000" />
        <Text style={styles.buttonText}>Volume</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Category', { category: 'Length' })}
      >
        <Icon name="ruler" size={24} color="#000" />
        <Text style={styles.buttonText}>Length</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Category', { category: 'Mass' })}
      >
        <Icon name="weight" size={24} color="#000" />
        <Text style={styles.buttonText}>Mass</Text>
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
});