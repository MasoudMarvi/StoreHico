import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../../utility/Colors';

const SearchInput = ({ value, onChangeText, onEndEditing }) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="جست و جو"
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onEndEditing={onEndEditing}
      />
      <FontAwesome name="search" color={Colors.black} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grayLighter,
    borderRadius: 35,
    width: '85%',
    height: 50,
    alignSelf: 'center',
    margin: 20,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    padding: 0,
    marginRight: 10,
    color: Colors.black,
    fontFamily: 'IRANSansMobile(FaNum)',
  },
});

export default SearchInput;
