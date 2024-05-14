import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { scale } from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CText from '../../../components/CText';
import useAddToCart from '../../../hooks/useAddToCart';
import useRemoveWishList from '../../../hooks/useRemoveFromWishList';
import { Colors } from '../../../utility/Colors';

const WishItem = ({ item, onRemoveSuccess }) => {
  const { navigate } = useNavigation();

  const { loading, callApi } = useAddToCart();

  const {
    loading: removeLoading,
    callApi: callRemoveApi,
    isSuccess,
  } = useRemoveWishList();

  const {
    ProductId,
    Id,
    ProductName,
    Picture: { ImageUrl },
  } = item;

  useEffect(() => {
    if (isSuccess) {
      onRemoveSuccess();
    }
  }, [isSuccess]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigate('product', { Id: ProductId })}>
      <View style={styles.closeContainer}>
        <TouchableOpacity
          onPress={() => callRemoveApi({ Id })}
          disabled={removeLoading}>
          {removeLoading ? (
            <ActivityIndicator size="small" color={Colors.o2market} />
          ) : (
            <Ionicons name={'close'} size={20} color={Colors.grayDark} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.priceContainer}>
        <CText ml={20} size={17}>
          {ProductName}
        </CText>
      </View>
      <View style={styles.imageContainer}>
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          style={styles.image}
          source={{ uri: ImageUrl }}
        />
        <TouchableOpacity
          style={styles.plusContainer}
          disabled={loading}
          onPress={() => callApi({ Id: ProductId })}>
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
    backgroundColor: Colors.white,
    flexDirection: 'row',
    overflow: 'hidden',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
    paddingRight: 20,
    paddingLeft: 20,
  },
  closeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
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
    alignItems: 'flex-start',
  },
  plusContainer: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderColor: Colors.o2market,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

export default WishItem;
