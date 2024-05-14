import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { memo, useCallback } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import useAddress from '../../hooks/useAddress';
import { Colors } from '../../utility/Colors';
import ErrorComponent from './../../components/Error';
import LoadingComponent from './../../components/Loading';
import AddressItem from './components/AddressItem';

const Addresses = () => {
  const { navigate } = useNavigation();

  const { data, loading, error, dispatch } = useAddress();

  useFocusEffect(
    useCallback(() => {
      dispatch({ type: 'loading' });
      return () => {};
    }, []),
  );

  if (loading) return <LoadingComponent />;

  if (error !== '') {
    return <ErrorComponent error={error} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <AddressItem
            item={item}
            onRemoveSuccess={() => dispatch({ type: 'loading' })}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity
        style={styles.plusButton}
        onPress={() => navigate('addAddress')}>
        <FontAwesome name="plus" color={Colors.white} size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  plusButton: {
    height: 69,
    width: 69,
    borderRadius: 35.5,
    backgroundColor: Colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    alignSelf: 'center',
    marginBottom: 10,
  },
});

export default memo(Addresses);
