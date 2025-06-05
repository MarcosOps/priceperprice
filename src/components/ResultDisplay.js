import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/styles';

export default function ResultDisplay({ result }) {
  if (!result) return null;

  const formatPrice = (price) => price.toFixed(6);
  const formatPercentage = (percentage) => percentage.toFixed(2);

  if (result.error === 'INCOMPATIBLE_UNITS') {
    return (
      <View style={styles.conversionResultContainer}>
        <Text style={styles.conversionResultMessage}>
          Units are not compatible. Please compare liquid with liquid, weight with weight, or quantity with quantity.
        </Text>
      </View>
    );
  }

  if (result.status === 'SAME_PRICE') {
    return (
      <View style={styles.conversionResultContainer}>
        <Text style={styles.conversionResultMessage}>
          Both products have the same price per {result.baseUnit}.
        </Text>
      </View>
    );
  }

  if (result.status === 'DIFFERENT_PRICE') {
    return (
      <View style={styles.conversionResultContainer}>
        <Text style={styles.conversionResultWinner}>
          {result.winner} is cheaper!
        </Text>

        <Text style={styles.conversionResultMessage}>
          {result.winner} is cheaper, costing ${formatPrice(result.cheaperPrice)}/{result.baseUnit} compared to {result.winner === 'Product 1' ? 'Product 2' : 'Product 1'} which costs ${formatPrice(result.expensivePrice)}/{result.baseUnit}.
        </Text>
        
        <Text style={styles.conversionResultDifference}>
          Price difference: ${formatPrice(result.difference)}/{result.baseUnit} ({formatPercentage(result.differencePercentage)}% cheaper)
        </Text>
      </View>
    );
  }

  return null;
}
