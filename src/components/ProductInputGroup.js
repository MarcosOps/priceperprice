import React, { useState } from 'react';
import { View, TextInput, Platform, TouchableOpacity, Text, Modal, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../styles/styles';
import { units } from '../helpers/units';

export default function ProductInputGroup({ unit, setUnit, quantity, setQuantity, price, setPrice, formatCurrency }) {
  const [modalVisible, setModalVisible] = useState(false);

  const renderAndroidPicker = () => (
    <Picker
      selectedValue={unit}
      onValueChange={(itemValue) => setUnit(itemValue)}
      style={styles.conversionPicker}
    >
      {units.map((unit) => (
        <Picker.Item key={unit} label={unit} value={unit} />
      ))}
    </Picker>
  );

  const renderIOSPicker = () => (
    <View>
      <TouchableOpacity 
        style={styles.iosPicker}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.iosPickerText}>{unit}</Text>
      </TouchableOpacity>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Unit</Text>
            <FlatList
              data={units}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.modalItem,
                    item === unit && styles.modalItemSelected
                  ]}
                  onPress={() => {
                    setUnit(item);
                    setModalVisible(false);
                  }}
                >
                  <Text style={[
                    styles.modalItemText,
                    item === unit && styles.modalItemTextSelected
                  ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );

  return (
    <View style={styles.conversionInputGroup}>
      {Platform.OS === 'ios' ? renderIOSPicker() : renderAndroidPicker()}
      <TextInput
        style={styles.conversionInput}
        placeholder="Quantity"
        placeholderTextColor="#666"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
        blurOnSubmit={true}
        returnKeyType="done"
      />
      <TextInput
        style={styles.conversionInput}
        placeholder="Price"
        placeholderTextColor="#666"
        keyboardType="numeric"
        value={price}
        onChangeText={(text) => setPrice(formatCurrency(text))}
        blurOnSubmit={true}
        returnKeyType="done"
      />
    </View>
  );
}
