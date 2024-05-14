import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import CText from '../../../components/CText';
import FastImage from 'react-native-fast-image';

const { height, width } = Dimensions.get('screen');

const PayProduct = ({ item }) => {
  const {
    ProductName,
    SubTotal,
    Quantity,
    UnitPrice,
    Picture: { ImageUrl },
  } = item;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <CText type="bold" size={16}>
          {ProductName}
        </CText>
        <CText type="light" size={13}>
          قیمت : {UnitPrice}
        </CText>
        <CText type="light" size={13}>
          تعداد : {Quantity}
        </CText>
        <CText type="light" size={13}>
          مجموع : {SubTotal}
        </CText>
      </View>

      <FastImage
        source={{ uri: ImageUrl }}
        resizeMode={FastImage.resizeMode.contain}
        style={{ height: 75, width: width / 2.5 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width / 1.1,
    flexDirection: 'row',
    margin: 10,
    overflow: 'hidden',
    alignItems: 'center',
  },
  content: { flex: 1, justifyContent: 'center', alignItems: 'flex-end' },
});

export default PayProduct;
