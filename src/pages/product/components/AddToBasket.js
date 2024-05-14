import React, { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { scale } from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CText from '../../../components/CText';
import useAddToCart from '../../../hooks/useAddToCart';
import { Colors } from '../../../utility/Colors';

const { height, width } = Dimensions.get('screen');

const AddToBasket = ({ Id }) => {
  const [count, setCount] = useState(0);

  const { loading, callApi } = useAddToCart();

  return (
    <View style={styles.container}>
      {/* <View style={styles.controlContainer}>
        <TouchableOpacity onPress={() => setCount(count + 1)}>
          <FontAwesome name="plus" color={Colors.grayLight} />
        </TouchableOpacity>
        <CText type="bold" color={Colors.grayLight} size={scale(14)}>
          {count}
        </CText>
        <TouchableOpacity
          style={{ opacity: count === 0 ? 0.3 : 1 }}
          onPress={() => setCount(count - 1)}
          disabled={count === 0}>
          <FontAwesome name="minus" color={Colors.grayLight} />
        </TouchableOpacity>
      </View> */}
      <TouchableOpacity
        onPress={() => callApi({ Id })}
        activeOpacity={0.6}
        style={styles.button}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <CText color={Colors.white} size={scale(16)}>
            افزودن به سبد خرید
          </CText>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  controlContainer: {
    flexDirection: 'row',
    width: width / 4,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: width / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.green,
    height: 45,
    borderRadius: 10,
  },
});

export default AddToBasket;
