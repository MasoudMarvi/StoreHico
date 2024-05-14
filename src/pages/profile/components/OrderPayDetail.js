import React from 'react';
import { View, StyleSheet } from 'react-native';
import CText from '../../../components/CText';
import HorizontalDivider from '../../../components/HorizontalDivider';
import { Colors } from '../../../utility/Colors';
import Utils from '../../../utility/Utils';

const OrderPayDetail = ({ data }) => {
  const {
    OrderTotal,
    OrderSubtotal,
    OrderSubTotalDiscount,
    OrderTotalDiscount,
    OrderShipping,
    Tax,
    Shipping
  } = data;
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <CText size={16} mt={10} color={Colors.o2market}>
          {OrderSubtotal}
        </CText>
        <CText size={16} mt={10}>
          جمع کل
        </CText>
      </View>
      <View style={styles.content}>
        <CText size={16} mt={10} color={Colors.o2market}>
          {Shipping}
        </CText>
        <CText size={16} mt={10}>
          هزینه ارسال
        </CText>
      </View>
      <View style={styles.content}>
        <CText size={16} mt={10} color={Colors.o2market}>
          {Tax}
        </CText>
        <CText size={16} mt={10}>
          مالیات
        </CText>
      </View>
      <View style={styles.content}>
        <CText size={16} mt={10} color={Colors.o2market}>
          {OrderTotalDiscount}
        </CText>
        <CText size={16} mt={10}>
          تخفیف
        </CText>
      </View>
      <HorizontalDivider marginTop={20} width="100%" />
      <View style={styles.content}>
        <CText size={16} mt={10} color={Colors.o2market}>
          {OrderSubtotal}
        </CText>
        <CText size={16} mt={10}>
          مجموع
        </CText>
      </View>
      <View style={styles.content}>
        <CText size={16} mt={10} color={Colors.o2market}>
          0 میواسمارت
        </CText>
        <CText size={16} mt={10}>
          امتیاز از این خرید
        </CText>
      </View>
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

export default OrderPayDetail;
