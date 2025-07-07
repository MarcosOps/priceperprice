import React from 'react';
import { Text } from 'react-native';

export default function ColoredTitle({ text }) {
  const parts = text.split('Per');
  return (
    <Text>
      {parts.map((part, index) => {
        if (index < parts.length - 1) {
          return (
            <React.Fragment key={index}>
              <Text style={{ color: '#333333' }}>{part}</Text>
              <Text style={{ color: '#4A90E2' }}>Per</Text>
            </React.Fragment>
          );
        } else {
          return <Text key={index} style={{ color: '#333333' }}>{part}</Text>;
        }
      })}
    </Text>
  );
}
