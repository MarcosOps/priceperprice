import React from 'react';
import { Text } from 'react-native';

export default function ColoredTitle({ text }) {
  const parts = text.split('Per');
  return parts.map((part, index) => {
    if (index < parts.length - 1) {
      return (
        <Text key={index}>
          <Text style={{ color: '#000000' }}>{part}</Text>
          <Text style={{ color: '#FF0000' }}>Per</Text>
        </Text>
      );
    } else {
      return <Text key={index} style={{ color: '#000000' }}>{part}</Text>;
    }
  });
}
