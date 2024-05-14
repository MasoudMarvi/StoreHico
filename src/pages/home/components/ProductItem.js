import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { scale } from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CText from '../../../components/CText';
import useAddToCart from '../../../hooks/useAddToCart';
import { Colors } from '../../../utility/Colors';

const ProductItem = ({ item }) => {
  const { navigate } = useNavigation();

  const { loading, callApi } = useAddToCart();

  const { Name, Id, DefaultPictureModel, ProductPrice,StockQuantity } = item;

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
      <CText numberOfLines={1}>{Name}</CText>
      {StockQuantity>0 && (
      <View style={styles.priceContainer}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <CText numberOfLines={1} color={Colors.green} size={12}>
            {Price}  
          </CText>
          {PriceValue !== PriceWithDiscountValue && (
            <CText
              numberOfLines={1}
              color={Colors.grayLight}
              size={10}
              style={{ textDecorationLine: 'line-through' }}>
              {PriceWithDiscount}
            </CText>
          )}
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
      </View>)}
      {StockQuantity==0 && (
 <View style={styles.priceContainer}>
 <View
   style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
   <CText numberOfLines={1} color={Colors.error} size={12}>
     ناموجود
   </CText>
   </View>
   </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: scale(120),
    height: scale(220),
    overflow: 'hidden',
    marginLeft: 10,
    marginRight: 10,
  },
  image: {
    width: scale(120),
    height: scale(140),
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  plusContainer: {
    height: scale(26),
    width: scale(26),
    borderRadius: scale(13),
    borderColor: Colors.o2market,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductItem;
