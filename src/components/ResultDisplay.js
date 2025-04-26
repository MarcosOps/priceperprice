import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/styles';

export default function ResultDisplay({ result }) {
  if (!result.message) return null;

  return (
    <View style={styles.conversionResultContainer}>
      <Text style={styles.conversionResultMessage}>{result.message}</Text>
      {result.winner && (
        <Text style={styles.conversionResultWinner}>
          {result.winner} it's cheaper!
        </Text>
      )}
      {result.difference && (
        <Text style={styles.conversionResultDifference}>
          {result.difference}
        </Text>
      )}
    </View>
  );
}
