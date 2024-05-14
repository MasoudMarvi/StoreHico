import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import CText from '../../../components/CText';
import useCheckoutSelectBillingAddress from '../../../hooks/useCheckoutSelectBillingAddress';
import { Colors } from '../../../utility/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const BillingAddressItem = ({ item, onSelectClick, selectedId }) => {
  const { Id, Address1, City } = item;

  const { callApi, loading } = useCheckoutSelectBillingAddress();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        onSelectClick();
        Id > 0 && callApi({ Id });
      }}
      disabled={loading}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <CText size={15}>{`${City} ${Address1}`}</CText>
          {Id === selectedId && (
            <FontAwesome name="check" color={Colors.green} />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: 15,
    margin: 10,
    borderRadius: 15,
  },
});

export default BillingAddressItem;
