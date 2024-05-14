import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../utility/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Plus = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <FontAwesome name="plus" color={Colors.o2market} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.o2market,
  },
});

export default memo(Plus);
