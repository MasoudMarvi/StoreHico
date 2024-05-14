import { useNavigation } from '@react-navigation/native';
import moment from 'moment-jalaali';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CText from '../../../components/CText';
import VerticalDivider from '../../../components/VerticalDivider';
import { Colors } from '../../../utility/Colors';

const OrderItem = ({ item }) => {
  const { navigate } = useNavigation();

  const {
    Id,
    CreatedOn,
    CustomOrderNumber,
    PaymentStatus,
    OrderTotal,
    ShippingStatus,
  } = item;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigate('orderDetail', { Id })}>
      <Ionicons name={'ios-chevron-back'} size={20} color={Colors.grayDark} />
      <View style={{ flex: 1 }}>
        <CText type="bold" size={14}>
          شماره سفارش : {CustomOrderNumber}
        </CText>
        <CText type="medium" size={12} color={Colors.grayLight}>
          تاریخ : {moment(CreatedOn).format('jYYYY/jMM/jDD HH:mm')}
        </CText>
        <CText type="bold" size={12} color={Colors.green}>
          مبلغ : {OrderTotal}
        </CText>
      </View>
      <VerticalDivider marginRight={10} marginLeft={10} />
      <View style={styles.timeContainer}>
        <FontAwesome
          name="times-rectangle-o"
          color={Colors.yellowStar}
          size={20}
        />
        <CText>{PaymentStatus}</CText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: scale(100),
    margin: 10,
    padding: 15,
    backgroundColor: Colors.white,
    elevation: 3,
    borderRadius: 5,
    alignItems: 'center',
  },
  timeContainer: { margin: 10, justifyContent: 'center', alignItems: 'center' },
});

export default OrderItem;
