import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/styles';
import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../translations/translations';

export default function ResultDisplay({ result }) {
  const { currentLanguage } = useLanguage();
  const lang = currentLanguage.code;
  
  if (!result) return null;

  const getCurrencySymbol = (lang) => {
    switch (lang) {
      case 'pt':
        return 'R$';
      case 'es':
      case 'fr':
        return '€';
      default:
        return '$';
    }
  };

  const formatPrice = (price) => price.toFixed(2);
  const formatPercentage = (percentage) => percentage.toFixed(2);

  if (result.error === 'INVALID_INPUT') {
    return (
      <View style={styles.conversionResultContainer}>
        <Text style={styles.conversionResultMessage}>
          {getTranslation(lang, 'invalidInput')}
        </Text>
      </View>
    );
  }

  if (result.error === 'INCOMPATIBLE_UNITS') {
    return (
      <View style={styles.conversionResultContainer}>
        <Text style={styles.conversionResultMessage}>
          {getTranslation(lang, 'incompatibleUnits')}
        </Text>
      </View>
    );
  }

  if (result.status === 'SAME_PRICE') {
    return (
      <View style={styles.conversionResultContainer}>
        <Text style={styles.conversionResultMessage}>
          {getTranslation(lang, 'samePrice')}
        </Text>
      </View>
    );
  }

  if (result.status === 'DIFFERENT_PRICE') {
    const product1Label = getTranslation(lang, 'product1');
    const product2Label = getTranslation(lang, 'product2');
    const winnerLabel = result.winner === 'Product 1' ? product1Label : product2Label;
    const loserLabel = result.winner === 'Product 1' ? product2Label : product1Label;
    const currencySymbol = getCurrencySymbol(lang);
    
    return (
      <View style={styles.conversionResultContainer}>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
          <Text style={styles.conversionResultWinner}>
            {getTranslation(lang, 'betterValue')}: {winnerLabel}
          </Text>
        </View>

        <Text style={styles.conversionResultMessage}>
          {winnerLabel} {getTranslation(lang, 'cheaper')} {loserLabel}
        </Text>

        <Text style={styles.conversionResultMessage}>
          {getTranslation(lang, 'pricePerUnit')}: {currencySymbol}{formatPrice(result.cheaperPrice)}/{result.baseUnit} vs {currencySymbol}{formatPrice(result.expensivePrice)}/{result.baseUnit}
        </Text>

        <Text style={styles.conversionResultDifference}>
          {currencySymbol}{formatPrice(result.difference)}/{result.baseUnit} ({formatPercentage(result.differencePercentage)}%)
        </Text>
      </View>
    );
  }

  return null;
}