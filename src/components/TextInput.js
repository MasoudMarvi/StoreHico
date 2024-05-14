import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput as Input } from 'react-native-paper';
import { Colors } from '../utility/Colors';
import Text from './CText';

const TextInput = ({ errorText, ...props }) => (
  <View style={styles.container}>
    <Input
      style={styles.input}
      selectionColor={Colors.green}
      underlineColor="transparent"
      mode="outlined"
      right
      outlineColor={Colors.green}
      {...props}
    />
    {errorText ? (
      <Text size={14} color={Colors.error} type="medium">
        {errorText}
      </Text>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: Colors.backgroundColor,
    fontFamily: 'IRANSansMobile(FaNum)',
    textAlign: 'right',
    borderColor: Colors.green,
  },
});

export default TextInput;
