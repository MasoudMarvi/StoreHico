import React, { memo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ErrorComponent from '../../components/Error';
import LoadingComponent from '../../components/Loading';
import useCustomerOrders from '../../hooks/useCustomerOrders';
import { Colors } from '../../utility/Colors';
import OrderItem from './components/OrderItem';

const Orders = () => {
  const { data, loading, error } = useCustomerOrders();

  if (loading) return <LoadingComponent />;

  if (error) return <ErrorComponent error={error} />;

  return (
    <FlatList
      data={data}
      renderItem={({ item, index }) => <OrderItem item={item} />}
      keyExtractor={(item, index) => index.toString()}
      style={styles.container}
      contentContainerStyle={data.length > 0 ? {} : { flex: 1 }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
  },
});

export default memo(Orders);
