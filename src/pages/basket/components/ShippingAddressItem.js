import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CText from '../../../components/CText';
import useCheckoutSelectShippingAddress from '../../../hooks/useCheckoutSelectShippingAddress';
import { Colors } from '../../../utility/Colors';

const ShippingAddressItem = ({ item, onSelectClick, selectedName }) => {
  const { Name, Description, ShippingRateComputationMethodSystemName, Fee } =
    item;

  const { callApi, loading } = useCheckoutSelectShippingAddress();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        onSelectClick();
        callApi({ Name, ShippingRateComputationMethodSystemName });
      }}
      disabled={loading}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <CText size={15}>{Name}</CText>
          <CText size={15}>{Description}</CText>
          {Name === selectedName && (
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

export default ShippingAddressItem;
