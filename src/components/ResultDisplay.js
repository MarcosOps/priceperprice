import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/styles';
import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../translations/translations';

export default function ResultDisplay({ result }) {
  const { currentLanguage } = useLanguage();
  const lang = currentLanguage.code;
  
  if (!result || Object.keys(result).length === 0) return null;

  const getCurrencySymbol = (lang) => {
    switch (lang) {
      case 'pt': return 'R$';
      case 'es':
      case 'fr': return '€';
      default: return '$';
    }
  };

  const formatPrice = (price) => price.toFixed(2);
  const formatPercentage = (percentage) => percentage.toFixed(2);

  const renderMessage = (messageKey) => (
    <View style={styles.conversionResultContainer}>
      <Text style={styles.conversionResultMessage}>
        {getTranslation(lang, messageKey)}
      </Text>
    </View>
  );

  if (result.error) {
    return renderMessage(result.error === 'INVALID_INPUT' ? 'invalidInput' : 'incompatibleUnits');
  }

  if (result.status === 'SAME_PRICE') {
    return renderMessage('samePrice');
  }

  if (result.status === 'DIFFERENT_PRICE') {
    const product1Label = getTranslation(lang, 'product1');
    const product2Label = getTranslation(lang, 'product2');
    const winnerLabel = result.winner === 'Product 1' ? product1Label : product2Label;
    const currencySymbol = getCurrencySymbol(lang);
    
    return (
      <View style={styles.conversionResultContainer}>
        <Text style={styles.conversionResultWinner}>
          {`🏆 ${getTranslation(lang, 'betterValue')}! `}
        </Text>
        <Text style={styles.conversionResultMessage}>
          {`${winnerLabel} ${getTranslation(lang, 'isCheaper')}`}
        </Text>

        <View style={{ marginVertical: 15 }}>
          <Text style={[
            styles.priceDetailText,
            result.winner === 'Product 1' && styles.priceDetailWinnerText
          ]}>
            {`${product1Label}: ${currencySymbol}${formatPrice(result.pricePerUnit1)}/${result.baseUnit}`}
          </Text>
          <Text style={[
            styles.priceDetailText,
            result.winner === 'Product 2' && styles.priceDetailWinnerText
          ]}>
            {`${product2Label}: ${currencySymbol}${formatPrice(result.pricePerUnit2)}/${result.baseUnit}`}
          </Text>
        </View>

        <Text style={styles.conversionResultDifference}>
          {`💰 ${getTranslation(lang, 'youSave')} ${currencySymbol}${formatPrice(result.totalSaving)} (${formatPercentage(result.differencePercentage)}%)`}
        </Text>
      </View>
    );
  }

  return null;
}