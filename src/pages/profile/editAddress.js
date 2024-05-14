import { useRoute } from '@react-navigation/native';
import React, { memo, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, View,Text, ActivityIndicator } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CButton from '../../components/CButton';
import CText from '../../components/CText';
import useEditAddress from '../../hooks/useEditAddress';
import { Colors } from '../../utility/Colors';
import useGetstatesByCountry from '../../hooks/useGetstatesByCountry';
import { Picker } from "@react-native-picker/picker";

const EditAddress = () => {
  const { params } = useRoute();
  const { error, loading, isSuccess, callApi } = useEditAddress();

  const { Id } = params.item;

  const [FirstName, setFirstName] = useState(params.item.FirstName);
  const [LastName, setLastName] = useState(params.item.LastName);
  const [Email, setEmail] = useState(params.item.Email);
  const [City, setCity] = useState(params.item.City);
  const [Address, setAddress] = useState(params.item.Address1);
  const [Address2, setAddress2] = useState(params.item.Address2);
  const [PhoneNumber, setPhoneNumber] = useState(params.item.PhoneNumber);
  const [CountryId, setCountryId] = useState('');
  const { countries, loading: countryLoading, error: countryError } = useGetstatesByCountry();
  const [StateProvinceId, setStateProvinceId] = useState(params.item.StateProvinceId);
  console.log(params);
  const onSavePress = () => {
    callApi({
      data: {
        Id,
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
      {/* <View style={styles.addressContainer}>
        <TouchableOpacity style={styles.plusButton}>
          <FontAwesome name="plus" color={Colors.white} size={20} />
        </TouchableOpacity>
        <View style={styles.addressContent}>
          <CText mt={10} mr={20} type="light" size={16}>
            انتخاب آدرس روی نقشه
          </CText>
          <FontAwesome name="map-pin" color={Colors.black} size={15} />
        </View>
      </View> */}
      {(isSuccess && (
        <CText
          type="bold"
          size={16}
          textAlign="center"
          style={{ width: '100%' }}>
          {'تغییرات با موفقیت انجام شد'}
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
      <CButton title="ذخیره" loading={loading} onPress={onSavePress} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
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

export default memo(EditAddress);
