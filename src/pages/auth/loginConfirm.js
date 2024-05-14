import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CButton from '../../components/CButton';
import CText from '../../components/CText';
import useLoginConfirm from '../../hooks/useLoginConfirm';
import { Colors } from '../../utility/Colors';

const LoginConfirm = () => {
  const {
    params: { mobile },
  } = useRoute();

  const [code, setCode] = useState('');

  const { callApi, loading } = useLoginConfirm();

  const onLoginConfirm = () => {
    if (code.length > 0) {
      callApi({ mobile, code });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <CText mt={20} mr={20} type="bold" size={20}>
        کد تایید عضویت
      </CText>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="کد تایید عضویت"
          style={styles.input}
          selectionColor={Colors.green}
          value={code}
          onChangeText={text => setCode(text)}
          keyboardType="numeric"
        />
        <FontAwesome name="phone" color={Colors.grayLight} size={15} />
      </View>

      <CButton title="ورود" loading={loading} onPress={onLoginConfirm} />
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
});

export default LoginConfirm;
