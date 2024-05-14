import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CButton from '../../../components/CButton';
import CText from '../../../components/CText';
import HorizontalDivider from '../../../components/HorizontalDivider';
import { Colors } from '../../../utility/Colors';
import Utils from '../../../utility/Utils';

const BasketDetail = ({ detail }) => {
  const [toggle, setToggle] = useState(false);
  const [toggle1, setToggle1] = useState(false);

  const { OrderTotal, OrderTotalDiscount, SubTotal, SubTotalDiscount,Shipping } = detail;
  return (
    <>
      {/* <View style={styles.container}>
        <TouchableOpacity
          style={styles.content}
          onPress={() => setToggle(!toggle)}>
          <Ionicons
            name={'ios-chevron-down'}
            size={20}
            color={Colors.grayDark}
          />
          <CText size={15}>کد تخفیف</CText>
        </TouchableOpacity>
        {toggle && (
          <View style={styles.content}>
            <TouchableOpacity style={styles.buttonContainer}>
              <CText size={15} color={Colors.white}>
                اعمال کوپن
              </CText>
            </TouchableOpacity>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="کد کوپن تخفیف را وارد نمایید"
                style={styles.input}
              />
            </View>
          </View>
        )}
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.content}
          onPress={() => setToggle1(!toggle1)}>
          <Ionicons
            name={'ios-chevron-down'}
            size={20}
            color={Colors.grayDark}
          />
          <CText size={15}>کد هدیه</CText>
        </TouchableOpacity>
        {toggle1 && (
          <View style={styles.content}>
            <TouchableOpacity style={styles.buttonContainer}>
              <CText size={15} color={Colors.white}>
                اعمال کد هدیه
              </CText>
            </TouchableOpacity>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="کد هدیه را وارد نمایید"
                style={styles.input}
              />
            </View>
          </View>
        )}
      </View> */}
      <View style={styles.container}>
        <View style={styles.content}>
          <CText size={16} mt={10}>
            {SubTotal}
          </CText>
          <CText size={16} mt={10}>
            جمع قیمت محصول :
          </CText>
        </View>
        <HorizontalDivider marginTop={20} />
        <View style={styles.content}>
          <CText size={16} mt={10}>
            {Shipping}
          </CText>
          <CText size={16} mt={10}>
            هزینه ارسال
          </CText>
        </View>
        <HorizontalDivider marginTop={20} />
        <View style={styles.content}>
          <CText size={16} mt={10}>
            {OrderTotal}
          </CText>
          <CText size={16} mt={10}>
            مبلغ پرداختی
          </CText>
        </View>
        <View style={styles.content}>
          <CText size={16} mt={10}>
            0 میواسمارت
          </CText>
          <CText size={16} mt={10}>
            امتیاز از این خرید
          </CText>
        </View>
        <HorizontalDivider marginTop={20} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    margin: 15,
    alignItems: 'center',
    elevation: 3,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 15,
  },
  content: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: 15,
  },
  inputContainer: {
    justifyContent: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayDark,
    width: '60%',
  },
  input: {
    fontFamily: 'IRANSansMobile(FaNum)',
    textAlign: 'center',
  },
  buttonContainer: {
    backgroundColor: Colors.grayDark,
    paddingLeft: 13,
    paddingRight: 13,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BasketDetail;
