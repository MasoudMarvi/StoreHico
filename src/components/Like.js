import React, { memo } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import useAddToWishList from '../hooks/useAddToWishList';
import { Colors } from '../utility/Colors';

const Like = ({ Id }) => {
  const { loading, callApi } = useAddToWishList();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => callApi({ Id })}
      disabled={loading}>
      {loading ? (
        <ActivityIndicator size="small" color={Colors.o2market} />
      ) : (
        <FontAwesome name="heart" color={Colors.o2market} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.o2market,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(Like);
