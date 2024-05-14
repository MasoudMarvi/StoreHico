import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../utility/Colors';
import CText from './CText';

const CButton = ({ title = 'تایید', onPress, style, loading = false }) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      disabled={loading}>
      {loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <CText color={Colors.white} size={15}>
          {title}
        </CText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.green,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 10,
    elevation: 3,
  },
});

export default CButton;
