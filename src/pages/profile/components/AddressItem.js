import { useNavigation } from '@react-navigation/native';
import React, { memo, useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CText from '../../../components/CText';
import useDeleteAddress from '../../../hooks/useDeleteAddress';
import { Colors } from '../../../utility/Colors';

const AddressItem = ({ item, onRemoveSuccess }) => {
  const { navigate } = useNavigation();

  const { loading, isSuccess, callApi } = useDeleteAddress();

  const { Id, City, PhoneNumber, FirstName, LastName } = item;

  useEffect(() => {
    if (isSuccess) {
      onRemoveSuccess();
    }
  }, [isSuccess]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={{ justifyContent: 'space-around', marginLeft: 20 }}>
          <TouchableOpacity onPress={() => navigate('editAddress', { item })}>
            <FontAwesome name="pencil" size={20} color={Colors.green} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => callApi({ Id })} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color={Colors.o2market} />
            ) : (
              <FontAwesome name="trash" size={20} color={Colors.grayDark} />
            )}
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <CText size={14}>{`${FirstName} ${LastName}`}</CText>
          <CText size={14} mt={5} ml={5}>
            شماره تلفن : {PhoneNumber}
          </CText>
          <CText size={14}>{City}</CText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: '90%',
    backgroundColor: Colors.o2market,
    margin: 20,
    alignSelf: 'center',
    paddingRight: 6,
    elevation: 3,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    padding: 10,
  },
});

export default memo(AddressItem);
