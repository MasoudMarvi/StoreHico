import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../utility/Colors';
import Text from './CText';

const Badge = ({ count }) => {
  return (
    <View style={styles.container}>
      <Text color="white">{count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: Colors.o2market,
    position: 'absolute',
    top: 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Badge;
