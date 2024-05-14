import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import CButton from '../../components/CButton';
import ErrorComponent from '../../components/Error';
import LoadingComponent from '../../components/Loading';
import useShoppingCart from '../../hooks/useShoppingCart';
import { Colors } from '../../utility/Colors';
import BasketDetail from './components/BasketDetail';
import BasketItem from './components/BasketItem';

const Basket = () => {
  const { navigate } = useNavigation();

  const { dispatch, data, loading, error, detail } = useShoppingCart();
  useFocusEffect(
    useCallback(() => {
      dispatch({ type: 'loading' });
      return () => {};
    }, []),
  );

  if (error !== '') {
    return <ErrorComponent error={error} />;
  }

  if (loading) return <LoadingComponent />;

  return (
    <>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.Id.toString()}
        renderItem={({ item, index }) => (
          <BasketItem
            item={item}
            onUpdateSuccess={() => dispatch({ type: 'loading' })}
          />
        )}
        ListFooterComponent={() =>
          Array.isArray(data) &&
          data.length > 0 && <BasketDetail detail={detail} />
        }
        ListEmptyComponent={() => (
          <ErrorComponent error={'سبد خرید خالی است!'} />
        )}
        contentContainerStyle={data.length > 0 ? {} : { flex: 1 }}
        style={styles.container}
      />
      {Array.isArray(data) && data.length > 0 && (
        <CButton
          title="پردازش برای پرداخت"
          onPress={() => navigate('payment', { screen: 'payAddress' })}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
  },
});

export default Basket;
