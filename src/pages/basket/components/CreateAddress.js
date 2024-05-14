import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CButton from '../../../components/CButton';
import CText from '../../../components/CText';
import useCheckoutSaveBillingAddress from '../../../hooks/useCheckoutSaveBillingAddress';
import { Colors } from '../../../utility/Colors';
import { Picker } from "@react-native-picker/picker";
import useGetstatesByCountry from '../../../hooks/useGetstatesByCountry';

const CreateAddress = ({ onSuccess }) => {
  const {
    error,
    loading,
    isSuccess,
    callApi,
  } = useCheckoutSaveBillingAddress();

  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Email, setEmail] = useState('');
  const [City, setCity] = useState('');
  const [Address, setAddress] = useState('');
  const [Address2, setAddress2] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [CountryId, setCountryId] = useState('');
  const [StateProvinceId, setStateProvinceId] = useState('');
  const { countries, loading: countryLoading, error: countryError } = useGetstatesByCountry();

  const onSavePress = () => {
    setCountryId(106);
    callApi({
      data: {
        FirstName,
        LastName,
        City,
        Address,
        Address2,
        PhoneNumber,
        CountryId,
        StateProvinceId,
        Email,
      },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.closeContainer} onPress={onSuccess}>
        <CText mt={20} ml={20} type="bold" size={16} textAlign="left">
          بستن
        </CText>
      </TouchableOpacity>
      <CText mt={20} mr={20} type="light" size={16}>
        نام
      </CText>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="نام"
          style={styles.input}
          selectionColor={Colors.green}
          value={FirstName}
          onChangeText={txt => setFirstName(txt)}
        />
        <FontAwesome name="star" color={Colors.yellowStar} size={15} />
      </View>
      <CText mt={10} mr={20} type="light" size={16}>
        نام خانوادگی
      </CText>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="نام خانوادگی"
          style={styles.input}
          selectionColor={Colors.green}
          value={LastName}
          onChangeText={txt => setLastName(txt)}
        />
        <FontAwesome name="star" color={Colors.yellowStar} size={15} />
      </View>
      <CText mt={10} mr={20} type="light" size={16}>
        شماره تلفن
      </CText>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="شماره تلفن"
          style={styles.input}
          selectionColor={Colors.green}
          value={PhoneNumber}
          onChangeText={(txt) => {setPhoneNumber(txt); setEmail(txt+"@MivSmart.com");}}
          keyboardType="numeric"
        />
        <FontAwesome name="star" color={Colors.yellowStar} size={15} />
      </View>
      {/* <CText mt={10} mr={20} type="light" size={16}>
        ایمیل
      </CText>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="ایمیل"
          style={styles.input}
          selectionColor={Colors.green}
          value={Email}
          onChangeText={txt => setEmail(txt)}
        />
        <FontAwesome name="star" color={Colors.yellowStar} size={15} />
      </View> */}
      {/* <CText mt={10} mr={20} type="light" size={16}>
        شهر
      </CText>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="شهر"
          style={styles.input}
          selectionColor={Colors.green}
          value={City}
          onChangeText={txt => setCity(txt)}
        />
        <FontAwesome name="star" color={Colors.yellowStar} size={15} />
      </View> */}
      <CText mt={10} mr={20} type="light" size={16}>
      استان
      </CText>
      <View style={styles.inputContainer}>
        {countryLoading && <ActivityIndicator color="black" size="small" /> ||
          <Picker style={styles.input}
            selectedValue={StateProvinceId}
            onValueChange={(itemValue, itemIndex) =>
              setStateProvinceId(itemValue)
            }
          >
            {countries.map((item, index) => <Picker.Item
              key={item.Id}
              label={item?.Name || 'نام استان یافت نشد'}
              value={item?.Id || -1} />)}
          </Picker>}
        <Text style={{ width: '100%', height: 60, position: 'absolute', bottom: 0, left: 0 }}>{' '}</Text>
      </View>
      <CText mt={10} mr={20} type="light" size={16}>
        آدرس
      </CText>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="آدرس"
          style={styles.input}
          selectionColor={Colors.green}
          value={Address}
          onChangeText={txt => setAddress(txt)}
        />
        <FontAwesome name="star" color={Colors.yellowStar} size={15} />
      </View>
      {/* <CText mt={10} mr={20} type="light" size={16}>
        آدرس دوم
      </CText>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="آدرس دوم"
          style={styles.input}
          selectionColor={Colors.green}
          value={Address2}
          onChangeText={txt => setAddress2(txt)}
        />
        <FontAwesome name="star" color={Colors.yellowStar} size={15} />
      </View> */}
      {(isSuccess && (
        <CText
          type="bold"
          size={16}
          textAlign="center"
          style={{ width: '100%' }}>
          {'آدرس با موفقیت ثبت شد!'}
        </CText>
      )) || (
        <CText
          type="bold"
          size={16}
          color={Colors.error}
          textAlign="center"
          style={{ width: '100%' }}>
          {error}
        </CText>
      )}
      <CButton
        title={isSuccess ? 'برگشت' : 'ذخیره'}
        loading={loading}
        onPress={isSuccess ? onSuccess : onSavePress}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
  },
  closeContainer: {
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    height: 55,
    borderColor: Colors.grayLight,
    borderWidth: 0.6,
    marginTop: 15,
    paddingRight: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 20,
    backgroundColor: Colors.white,
  },
  input: {
    padding: 0,
    fontSize: 20,
    fontFamily: 'IRANSansMobile(FaNum)',
    marginRight: 20,
    color: Colors.grayLight,
    flex: 1,
    textAlign: 'center',
  },
  addressContainer: {
    flexDirection: 'row',
    height: 45,
    marginTop: 30,
    paddingRight: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },
  addressContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  plusButton: {
    height: 45,
    width: 45,
    borderRadius: 22.5,
    backgroundColor: Colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    alignSelf: 'center',
    marginBottom: 10,
  },
});

export default CreateAddress;
