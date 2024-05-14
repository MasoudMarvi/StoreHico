import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, View ,Dimensions} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CButton from '../../components/CButton';
import CText from '../../components/CText';
import useLogin from '../../hooks/useLogin';
import { Colors } from '../../utility/Colors';
import FastImage from 'react-native-fast-image';
const { height, width } = Dimensions.get('screen');

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState('');

  const { callApi, loading } = useLogin();

  const onLogin = () => {
    if (mobileNumber.length > 0) {
      callApi({ mobile: mobileNumber });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <FastImage
        source={require("../../assets/image/Logo.png")}
        resizeMode={FastImage.resizeMode.contain}
        style={styles.image}
      />
      <CText mt={20} mr={20} type="bold" size={20}>
        ورود به برنامه
      </CText>
      <CText mt={20} mr={20}  size={16}>
        لطفا جهت ورود شماره تلفن خود را وارد نمایید.
              </CText>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="شماره همراه"
          style={styles.input}
          selectionColor={Colors.green}
          value={mobileNumber}
          onChangeText={text => setMobileNumber(text)}
          keyboardType="numeric"
        />
        <FontAwesome name="phone" color={Colors.grayLight} size={15} />
      </View>

      <CButton title="ورود" loading={loading} onPress={onLogin} />
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
  image: {
    marginTop:30,
    height: height / 4.5,
    width: width,
    alignSelf: 'center',
  }
});

export default Login;
