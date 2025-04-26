import React from 'react';
import { View, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../styles/styles';
import { units } from '../helpers/units';

export default function ProductInputGroup({ unit, setUnit, quantity, setQuantity, price, setPrice, formatCurrency }) {
  return (
    <View style={styles.conversionInputGroup}>
      <Picker
        selectedValue={unit}
        onValueChange={(itemValue) => setUnit(itemValue)}
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
        value={quantity}
        onChangeText={setQuantity}
      />
      <TextInput
        style={styles.conversionInput}
        placeholder="Price"
        placeholderTextColor="#666"
        keyboardType="numeric"
        value={price}
        onChangeText={(text) => setPrice(formatCurrency(text))}
      />
    </View>
  );
}
