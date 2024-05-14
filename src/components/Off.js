import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../utility/Colors';
import CText from './CText';

const Off = ({ position = 'absolute', top = 15, left = 15 }) => {
  return (
    <View
      style={[styles.container, { position: position, top: top, left: left }]}>
      <CText type="light" color={Colors.white}>
        %25
      </CText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: Colors.o2market,
    borderRadius: 25,
    elevation: 5,
  },
});

export default memo(Off);
