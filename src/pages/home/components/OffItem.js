import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { scale } from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CText from '../../../components/CText';
import Off from '../../../components/Off';
import useAddToCart from '../../../hooks/useAddToCart';
import { Colors } from '../../../utility/Colors';
import Utils from '../../../utility/Utils';

const OffItem = ({ item }) => {
  const { navigate } = useNavigation();

  const { loading, callApi } = useAddToCart();

  const { Name, Id, DefaultPictureModel, ProductPrice } = item;

  const { ImageUrl } = DefaultPictureModel;

  const {
    Price,
    PriceWithDiscount,
    CurrencyCode,
    PriceValue,
    PriceWithDiscountValue,
  } = ProductPrice;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigate('product', { Id })}>
      <View style={{ flex: 1 }}>
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          style={styles.image}
          source={{ uri: ImageUrl }}
        />
        {/* <Off /> */}
      </View>
      <CText numberOfLines={1} mr={10} ml={10}>
        {Name}
      </CText>
      <View style={styles.priceContainer}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <CText numberOfLines={1} color={Colors.green} size={10}>
            {Price}
          </CText>
          <CText
            numberOfLines={1}
            color={Colors.grayLight}
            size={8}
            style={{ textDecorationLine: 'line-through' }}>
            {PriceWithDiscount}
          </CText>
        </View>
        <TouchableOpacity
          style={styles.plusContainer}
          disabled={loading}
          onPress={() => callApi({ Id })}>
          {loading ? (
            <ActivityIndicator size="small" color={Colors.o2market} />
          ) : (
            <FontAwesome name="plus" color={Colors.o2market} />
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: scale(120),
    height: scale(200),
    overflow: 'hidden',
    margin: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  image: {
    width: scale(100),
    height: scale(120),
    alignSelf: 'center',
  },
  priceContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  plusContainer: {
    marginRight: 10,
    height: scale(20),
    width: scale(20),
    borderRadius: scale(10),
    borderColor: Colors.o2market,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OffItem;
