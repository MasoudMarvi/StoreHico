import React, { memo } from 'react';
import { Linking, StyleSheet, TextInput, View } from 'react-native';
import CButton from '../../components/CButton';
import CText from '../../components/CText';
import { Colors } from '../../utility/Colors';
import HorizontalDivider from './../../components/HorizontalDivider';

const ContactUs = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <CText
          type="medium"
          size={25}
          textAlign="center"
          textBreakStrategy="balanced"
          onPress={() => Linking.openURL(`tel:02532096`)}>
          ضمن تشکر از انتخاب میواسمارت برای خرید ، شما می توانید هر روز از
          ساعت ۹ صبح الی ۲۲ شب هر گونه انتقاد ، پیشنهاد و سوال را با شماره
          025-32096 با پشتیبانان ما مطرح نمایید.
        </CText>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TextInput
          placeholder="نظرات"
          style={{
            fontFamily: 'IRANSansMobile(FaNum)',
            textAlignVertical: 'center',
            flex: 1,
            padding: 10,
            fontSize: 20,
          }}
        />
        <HorizontalDivider style={{ marginBottom: 10, marginTop: 10 }} />
        <CButton title="به ما ایمیل بزنید" />
        <CButton title="تماس با ما" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  content: {
    flex: 0.7,
    backgroundColor: Colors.white,
    margin: 10,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default memo(ContactUs);
