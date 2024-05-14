import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import CText from '../../../components/CText';
import { Colors } from '../../../utility/Colors';

const { height, width } = Dimensions.get('screen');

const TimeItem = () => {
  return (
    <View style={styles.container}>
      <CText size={16}>ساعت 9 - 12</CText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width / 3.6,
    height: 45,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 1,
    backgroundColor: Colors.grayLighter,
  },
});

export default TimeItem;
