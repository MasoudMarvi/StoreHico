import { useBackHandler } from '@react-native-community/hooks';
import { useNavigation } from '@react-navigation/core';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import CButton from '../../components/CButton';
import ErrorComponent from '../../components/Error';
import LoadingComponent from '../../components/Loading';
import useCheckoutShippingAddress from '../../hooks/useCheckoutShippingAddress';
import ShippingAddressItem from './components/ShippingAddressItem';

const PayShipping = () => {
  const { navigate } = useNavigation();
  const { dispatch, data, loading, error } = useCheckoutShippingAddress();
  const [selectedName, setSelectedName] = useState('');

  useFocusEffect(
    useCallback(() => {
      dispatch({ type: 'loading' });
      return () => {};
    }, []),
  );

  useBackHandler(() => {
    navigate('payAddress');
    return true;
  });

  const onConfirm = () => {
    selectedName !== '' && navigate('payBank');
  };

  if (error !== '') {
    return <ErrorComponent error={error} />;
  }

  if (loading) return <LoadingComponent />;

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <ShippingAddressItem
          item={item}
          onSelectClick={() => setSelectedName(item.Name)}
          selectedName={selectedName}
        />
      )}
      ListFooterComponent={() => <CButton title="تایید" onPress={onConfirm} />}
    />
  );
};

export default PayShipping;
