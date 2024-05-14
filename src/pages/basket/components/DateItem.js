import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import CText from '../../../components/CText';
import { Colors } from '../../../utility/Colors';

const { height, width } = Dimensions.get('screen');

const DateItem = () => {
  return (
    <View style={styles.container}>
      <CText size={16}>سه شنبه - 24</CText>
      <CText size={16}>فروردین</CText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width / 3.5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayDark,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DateItem;
