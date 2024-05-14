import React from 'react';
import { View, StyleSheet } from 'react-native';
import CText from '../../../components/CText';
import HorizontalDivider from '../../../components/HorizontalDivider';
import { Colors } from '../../../utility/Colors';
import Utils from '../../../utility/Utils';

const PayConfirmDetail = ({ SubTotal, SubTotalDiscount, OrderTotal,Shipping }) => {
  return (
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
});

export default PayConfirmDetail;
