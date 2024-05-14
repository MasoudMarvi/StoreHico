import { useNavigation } from '@react-navigation/native';
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

  const {
    Id,
    Name,
    ProductPrice = {
      PriceWithDiscountValue: 0,
      PriceValue: 0,
      Price: '0 تومان',
      PriceWithDiscount: '0 تومان',
    },
    DefaultPictureModel = { ImageUrl: '' },
    PictureModel,
    StockQuantity
  } = item;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigate('product', { Id })}>
         {StockQuantity>0 &&(
      <View style={styles.priceContainer}>
        <CText numberOfLines={1} size={17}>
          {typeof Name === 'string' ? Name.trim() : Name} 
        </CText>
     
      
        <CText numberOfLines={1} color={Colors.green} size={18}>
          {ProductPrice.Price} 
        </CText>
        {ProductPrice.PriceValue !== ProductPrice.PriceWithDiscountValue && (
          <CText
            numberOfLines={1}
            color={Colors.grayLight}
            size={16}
            style={{ textDecorationLine: 'line-through' }}>
            {ProductPrice.PriceWithDiscount}
          </CText>
        )}
        
      </View>
       )}
      {StockQuantity==0 &&(
         <View style={styles.priceContainer}>
         <CText numberOfLines={1} size={17}>
           {typeof Name === 'string' ? Name.trim() : Name}
         </CText>
        <CText numberOfLines={1} color={Colors.error} size={18}>
          ناموجود
        </CText>
         </View>
       )}
      <View style={styles.imageContainer}>
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          style={styles.image}
          source={{ uri: DefaultPictureModel.ImageUrl }}
        />
         {StockQuantity>0 &&(
        <TouchableOpacity
          style={styles.plusContainer}
          disabled={loading}
          onPress={() => callApi({ Id })}>
          {loading ? (
            <ActivityIndicator size="small" color={Colors.white} />
          ) : (
            <FontAwesome name="plus" color={Colors.white} />
          )}
        </TouchableOpacity>)}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    overflow: 'hidden',
    justifyContent: 'space-between',
    paddingRight: 20,
    paddingLeft: 20,
  },
  imageContainer: {
    width: scale(100),
    height: scale(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: scale(80),
    height: scale(80),
    borderWidth: 0.4,
    borderColor: Colors.grayLight,
    borderRadius: 5,
    overflow: 'hidden',
  },
  priceContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  plusContainer: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: Colors.o2market,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

export default ProductItem;
