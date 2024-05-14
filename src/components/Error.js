import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../utility/Colors';
import CText from './CText';

const ErrorComponent = ({ error }) => {
  return (
    <View style={styles.container}>
      <CText size={25}>{error}</CText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ErrorComponent;
