import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CButton from '../../components/CButton';
import CText from '../../components/CText';
import ErrorComponent from '../../components/Error';
import LoadingComponent from '../../components/Loading';
import useCustomerInfo from '../../hooks/useCustomerInfo';
import useUpdateCustomerInfo from '../../hooks/useUpdateCustomerInfo';
import { Colors } from '../../utility/Colors';

const Account = () => {
  const [gender, setGender] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirthDay, setDateOfBirthDay] = useState('');
  const [dateOfBirthMonth, setDateOfBirthMonth] = useState('');
  const [dateOfBirthYear, setDateOfBirthYear] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const { data, loading, error } = useCustomerInfo();

  const { callApi, loading: updateLoading } = useUpdateCustomerInfo();

  useEffect(() => {
    setGender(data.Gender);
    setFirstName(data.FirstName);
    setLastName(data.LastName);
    setDateOfBirthDay(data.DateOfBirthDay);
    setDateOfBirthMonth(data.DateOfBirthMonth);
    setDateOfBirthYear(data.DateOfBirthYear);
    setEmail(data.Email);
    setPhone(data.Phone);
  }, [data]);

  const onUpdateUser = () => {
    callApi({
      data: {
        firstName,
        lastName,
        dateOfBirthDay,
        dateOfBirthMonth,
        dateOfBirthYear,
        email,
        phone,
        gender,
      },
    });
  };

  if (loading) return <LoadingComponent />;

  if (error) return <ErrorComponent error={error} />;

  return (
    <ScrollView style={styles.container}>
      <CText mt={20} mr={20} type="bold" size={20}>
        اطلاعات شخصی شما
      </CText>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="نام"
          style={styles.input}
          selectionColor={Colors.green}
          value={firstName}
          onChangeText={text => setFirstName(text)}
        />
        <FontAwesome name="star" color={Colors.grayLight} size={15} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="نام خانوادگی"
          style={styles.input}
          selectionColor={Colors.green}
          value={lastName}
          onChangeText={text => setLastName(text)}
        />
        <FontAwesome name="star" color={Colors.grayLight} size={15} />
      </View>
      {/* <View style={styles.inputContainer}>
        <TextInput
          placeholder="روز تولد"
          style={styles.input}
          selectionColor={Colors.green}
          value={dateOfBirthDay}
          onChangeText={text => setDateOfBirthDay(text)}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="ماه تولد"
          style={styles.input}
          selectionColor={Colors.green}
          value={dateOfBirthMonth}
          onChangeText={text => setDateOfBirthMonth(text)}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="سال تولد"
          style={styles.input}
          selectionColor={Colors.green}
          value={dateOfBirthYear}
          onChangeText={text => setDateOfBirthYear(text)}
          keyboardType="numeric"
        />
        <FontAwesome name="calendar" color={Colors.grayLight} size={15} />
      </View> */}
      {/* <View style={styles.inputContainer}>
        <TextInput
          placeholder="ایمیل"
          style={styles.input}
          selectionColor={Colors.green}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <FontAwesome name="star" color={Colors.grayLight} size={15} />
      </View> */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="تلفن"
          style={styles.input}
          selectionColor={Colors.green}
          value={phone === '' || phone === null ? (email==='' || email ===null?'':email.split('@')[0]) : phone}
          onChangeText={text => setPhone(text)}
          keyboardType="numeric"
        />
        <FontAwesome name="phone" color={Colors.grayLight} size={15} />
      </View>
      <CText mt={20} mr={20} type="bold" size={15}>
        جنسیت
      </CText>
      <View style={styles.checkBoxContainer}>
        <CText>زن</CText>
        <RadioButton
          value="F"
          status={gender === 'F' ? 'checked' : 'unchecked'}
          onPress={() => setGender('F')}
        />
        <CText>مرد</CText>
        <RadioButton
          value="M"
          status={gender === 'M' ? 'checked' : 'unchecked'}
          onPress={() => setGender('M')}
        />
      </View>
      <CButton loading={updateLoading} onPress={onUpdateUser} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
  },
  inputContainer: {
    flexDirection: 'row',
    height: 45,
    borderBottomColor: Colors.grayLight,
    borderBottomWidth: 0.6,
    marginTop: 30,
    paddingRight: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 20,
  },
  input: {
    padding: 0,
    fontSize: 20,
    fontFamily: 'IRANSansMobile(FaNum)',
    marginRight: 20,
    color: Colors.grayLight,
    flex: 1,
    textAlign: 'right',
  },
  checkBoxContainer: {
    flexDirection: 'row',
    height: 45,
    marginTop: 30,
    paddingRight: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 20,
  },
});

export default Account;
