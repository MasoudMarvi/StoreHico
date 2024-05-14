import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import CText from '../../../components/CText';
import HorizontalDivider from '../../../components/HorizontalDivider';
import { Colors } from '../../../utility/Colors';
import { Checkbox } from 'react-native-paper';
import CButton from '../../../components/CButton';

const FilterView = () => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [checked, setChecked] = React.useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }
          mode="dropdown"
          style={{ flex: 1 }}>
          <Picker.Item label="همه" value="java" />
          <Picker.Item label="حیوانات" value="js" />
        </Picker>
        <CText size={18} ml={10}>
          دسته بندی
        </CText>
      </View>
      <HorizontalDivider width="90%" marginTop={10} marginBottom={10} />
      <View style={styles.content}>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }
          mode="dropdown"
          style={{ flex: 1 }}>
          <Picker.Item label="همه" value="java" />
          <Picker.Item label="حیوانات" value="js" />
        </Picker>
        <CText size={18} ml={10}>
          تولید کننده
        </CText>
      </View>
      <HorizontalDivider width="90%" marginTop={10} marginBottom={10} />
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} />
          <CText size={18} ml={10} mr={10}>
            تا
          </CText>
          <TextInput style={styles.input} />
        </View>
        <CText size={18} ml={10}>
          محدوده قیمت
        </CText>
      </View>
      <HorizontalDivider width="90%" marginTop={10} marginBottom={10} />
      <View style={styles.content}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!checked);
          }}
        />
        <CText size={18} ml={10}>
          جست و جو در محصولات
        </CText>
      </View>
      <HorizontalDivider width="90%" marginTop={10} marginBottom={10} />
      <CButton title="جست و جو" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.white,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: Colors.grayLight,
    borderRadius: 10,
    padding: 0,
    height: 40,
  },
});

export default FilterView;
