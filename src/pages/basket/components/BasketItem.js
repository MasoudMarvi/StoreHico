import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CText from '../../../components/CText';
import useRemoveFromCart from '../../../hooks/useRemoveFromCart';
import useUpdateCart from '../../../hooks/useUpdateCart';
import { Colors } from '../../../utility/Colors';
import useShoppingCart from '../../../hooks/useShoppingCart';

const BasketItem = ({ item,onUpdateSuccess }) => {
  const { navigate } = useNavigation();

  const {
    ProductId,
    ProductName,
    SubTotal,
    Picture: { ImageUrl },
    Id,
    Quantity,
  } = item;

  const [count, setCount] = useState(Quantity);
  const [lastCount, setLastCount] = useState(Quantity);

  const {
    loading: removeLoading,
    isSuccess: successRemove,
    callApi: callRemoveApi,
  } = useRemoveFromCart();

  const {
    loading: updateLoading,
    isSuccess: successUpdate,
    callApi: callUpdateApi,
  } = useUpdateCart();
  
  const {
     callApi: getShoppingCartApi,
  } = useShoppingCart();

  useEffect(() => {
    if (successRemove) {
      onUpdateSuccess();
    }
    if (successUpdate) {
      setCount(lastCount);
      onUpdateSuccess();
    }
  }, [successRemove, successUpdate]);

  const onClickProduct = () => navigate('product', { Id: ProductId });

  return (
    <View style={styles.container}>
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
        {/* {Quantity !== count && (
          <TouchableOpacity onPress={() => callUpdateApi({ Id, count })}>
            {updateLoading ? (
              <ActivityIndicator size="small" color={Colors.o2market} />
            ) : (
              <Ionicons name={'checkmark'} size={20} color={Colors.green} />
            )}
          </TouchableOpacity>
        )} */}
      </View>
      <View style={styles.countContainer}>
        {updateLoading ? (
          <ActivityIndicator size="small" color={Colors.o2market} />
        ) : (
          <>
            <TouchableOpacity
              onPress={() => {
                setLastCount(count + 1);
                callUpdateApi({ ProductId, count: count + 1,Id:Id});
                getShoppingCartApi();
              }}
              disabled={updateLoading}>
              <Ionicons
                name={'ios-chevron-up'}
                size={20}
                color={Colors.grayDark}
              />
            </TouchableOpacity>
            <CText size={15}>{count}</CText>
            <TouchableOpacity
              onPress={() => {
                setLastCount(count - 1);
                callUpdateApi({ ProductId, count: count - 1,Id:Id });
                getShoppingCartApi();
              }}
              disabled={count <= 1 || updateLoading}>
              <Ionicons
                name={'ios-chevron-down'}
                size={20}
                color={count > 1 ? Colors.grayDark : Colors.grayLight}
              />
            </TouchableOpacity>
          </>
        )}
      </View>
      <TouchableOpacity style={styles.detailContainer} onPress={onClickProduct}>
        <CText size={15} ellipsizeMode="middle" numberOfLines={1}>
          {ProductName} 
        </CText>
        <CText size={14} color={Colors.green}>
          {SubTotal}
        </CText>
      </TouchableOpacity>
      <FastImage
        source={{ uri: ImageUrl }}
        resizeMode={FastImage.resizeMode.cover}
        style={{ height: 100, width: 100 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    margin: 15,
    alignItems: 'center',
    elevation: 3,
    borderRadius: 10,
    overflow: 'hidden',
    paddingTop: 10,
    paddingBottom: 10,
  },
  closeContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: '100%',
    padding: 5,
  },
  countContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailContainer: {
    width: '50%',
    alignItems: 'flex-end',
  },
});

export default BasketItem;
