import { useBackHandler } from '@react-native-community/hooks';
import { useNavigation } from '@react-navigation/core';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import CButton from '../../components/CButton';
import useCheckoutPaymentMethod from '../../hooks/useCheckoutPaymentMethod';
import useCheckoutPaymentMethodSelect from '../../hooks/useCheckoutPaymentMethodSelect';
import ErrorComponent from './../../components/Error';
import LoadingComponent from './../../components/Loading';
import BankItem from './components/BankItem';

const PayBank = () => {
  const { navigate } = useNavigation();
  const [paymentMethod, setPaymentMethod] = useState('');

  const { dispatch, data, loading, error } = useCheckoutPaymentMethod();

  const {
    callApi,
    isSuccess,
    loading: selectLoading,
  } = useCheckoutPaymentMethodSelect();

  useFocusEffect(
    useCallback(() => {
      dispatch({ type: 'loading' });
      return () => {};
    }, []),
  );

  useEffect(() => {
    if (isSuccess) {
      navigate('payConfirm');
    }
    return () => {};
  }, [isSuccess]);

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      data.forEach(item => {
        if (item.Selected) {
          setPaymentMethod(item.PaymentMethodSystemName);
        }
      });
    }
    return () => {};
  }, [data]);

  useBackHandler(() => {
    navigate('payAddress');
    return true;
  });

  const onConfirm = () => {
    callApi({ PaymentMethodSystemName: paymentMethod });
  };

  if (error !== '') {
    return <ErrorComponent error={error} />;
  }

  if (loading) return <LoadingComponent />;

  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <BankItem
            item={item}
            paymentMethod={paymentMethod}
            onSelectPress={() => setPaymentMethod(item.PaymentMethodSystemName)}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <CButton title="تایید" onPress={onConfirm} loading={selectLoading} />
    </>
  );
};

export default PayBank;
