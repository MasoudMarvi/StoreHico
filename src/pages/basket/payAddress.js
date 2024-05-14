import { useBackHandler } from '@react-native-community/hooks';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import CButton from '../../components/CButton';
import useCheckoutBillingAddress from '../../hooks/useCheckoutBillingAddress';
import ErrorComponent from './../../components/Error';
import LoadingComponent from './../../components/Loading';
import BillingAddressItem from './components/BillingAddressItem';
import CreateAddress from './components/CreateAddress';

const PayAddress = () => {
  const { navigate } = useNavigation();
  const [toggleAddress, setToggleAddress] = useState(false);
  const { dispatch, data, loading, error } = useCheckoutBillingAddress();
  const [selectedId, setSelectedId] = useState(-1);

  useFocusEffect(
    useCallback(() => {
      dispatch({ type: 'loading' });
      return () => {};
    }, []),
  );

  useBackHandler(() => {
    navigate('basket');
    return true;
  });

  const onConfirm = () => {
    selectedId > 0 && navigate('payShipping');
  };

  if (error !== '') {
    return <ErrorComponent error={error} />;
  }

  if (loading) return <LoadingComponent />;

  return (
    <>
      {toggleAddress ? (
        <CreateAddress
          onSuccess={() => {
            setToggleAddress(false);
            dispatch({ type: 'loading' });
          }}
        />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => item.Id.toString()}
          renderItem={({ item, index }) => (
            <BillingAddressItem
              item={item}
              onSelectClick={() => {
                (item.Id === 0 && setToggleAddress(true)) ||
                  setSelectedId(item.Id);
              }}
              selectedId={selectedId}
            />
          )}
          ListFooterComponent={() => (
            <>
              <CButton title="تایید" onPress={onConfirm} />
            </>
          )}
        />
      )}
    </>
  );
};

export default PayAddress;
