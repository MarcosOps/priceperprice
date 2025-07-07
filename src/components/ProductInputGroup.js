import React, { useState } from 'react';
import { View, TextInput, Platform, TouchableOpacity, Text, Modal, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../styles/styles';
import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../translations/translations';
import { getTranslatedUnits } from '../helpers/translatedUnits';

export default function ProductInputGroup({ unit, setUnit, quantity, setQuantity, price, setPrice, formatCurrency }) {
  const [modalVisible, setModalVisible] = useState(false);
  const { currentLanguage } = useLanguage();
  const lang = currentLanguage.code;
  const units = getTranslatedUnits(lang);

  const renderAndroidPicker = () => (
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={unit}
        onValueChange={(itemValue) => setUnit(itemValue)}
        style={styles.androidPicker}
      >
        {units.map((unit) => (
          <Picker.Item key={unit} label={unit} value={unit} />
        ))}
      </Picker>
    </View>
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
            <Text style={styles.modalTitle}>{getTranslation(lang, 'unit')}</Text>
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
              <Text style={styles.modalCloseButtonText}>{getTranslation(lang, 'clean')}</Text>
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
        placeholder={getTranslation(lang, 'quantity')}
        placeholderTextColor="#666"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
        blurOnSubmit={true}
        returnKeyType="done"
      />
      <TextInput
        style={styles.conversionInput}
        placeholder={getTranslation(lang, 'price')}
        placeholderTextColor="#666"
        keyboardType="numeric"
        value={price}
        onChangeText={formatCurrency}
        blurOnSubmit={true}
        returnKeyType="done"
      />
    </View>
  );
}
