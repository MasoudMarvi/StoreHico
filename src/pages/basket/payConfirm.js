import { useBackHandler } from '@react-native-community/hooks';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import CButton from '../../components/CButton';
import CText from '../../components/CText';
import useCheckoutOrderInformation from '../../hooks/usCheckoutOrderInformation';
import useCheckoutComplete from '../../hooks/useCheckoutComplete';
import { Colors } from '../../utility/Colors';
import ErrorComponent from './../../components/Error';
import LoadingComponent from './../../components/Loading';
import PayConfirmDetail from './components/PayConfirmDetail';
import PayProduct from './components/PayProduct';

const PayConfirm = () => {
  const { navigate } = useNavigation();

  const { dispatch, data, loading, error } = useCheckoutOrderInformation();

  const {
    dispatch: checkoutCompleteDispatch,
    loading: checkoutCompleteLoading,
  } = useCheckoutComplete();

  const {
    SubTotal,
    SubTotalDiscount,
    OrderTotal,
    Items,
    OrderReviewData: {
      BillingAddress: { FirstName, LastName, City, Address1, PhoneNumber },
      PaymentMethod,
    },
    SelectedShippingMethod,
    Shipping
  } = data;

  useFocusEffect(
    useCallback(() => {
      dispatch({ type: 'loading' });
      return () => {};
    }, []),
  );

  useBackHandler(() => {
    navigate('payBank');
    return true;
  });

  const onConfirmPress = () => checkoutCompleteDispatch({ type: 'loading' });

  if (error !== '') {
    return <ErrorComponent error={error} />;
  }

  if (loading) return <LoadingComponent />;

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <CText color={Colors.white} size={14}>
              اطلاعات شخصی و آدرس
            </CText>
          </View>
          <CText mr={15} mt={10} size={14}>
            {`${FirstName} ${LastName}`}
          </CText>
          <CText mr={15} mt={10} size={14}>
            {PhoneNumber}
          </CText>
          <CText mr={15} mt={10} mb={15} size={14}>
            {City}
          </CText>
        </View>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <CText color={Colors.white} size={14}>
              روش ارسال
            </CText>
          </View>
          <CText mr={15} mt={10} mb={10} size={14}>
            {SelectedShippingMethod}
          </CText>
        </View>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <CText color={Colors.white} size={14}>
              روش پرداخت
            </CText>
          </View>
          <CText mr={15} mt={10} size={14}>
            {PaymentMethod}
          </CText>
        </View>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <CText color={Colors.white} size={14}>
              محصولات
            </CText>
          </View>
          {Items.map(item => (
            <PayProduct item={item} key={item.Id} />
          ))}
        </View>
        <PayConfirmDetail
          SubTotal={SubTotal}
          SubTotalDiscount={SubTotalDiscount}
          OrderTotal={OrderTotal}
          Shipping={Shipping}
        />
      </ScrollView>
      <CButton
        title="تایید"
        onPress={onConfirmPress}
        loading={checkoutCompleteLoading}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  content: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'flex-end',
    margin: 10,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
    overflow: 'hidden',
  },
  titleContainer: {
    backgroundColor: Colors.o2market,
    width: '100%',
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    height: 55,
    borderColor: Colors.o2market,
    borderWidth: 0.6,
    marginTop: 15,
    paddingRight: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 20,
    backgroundColor: Colors.white,
  },
  input: {
    padding: 0,
    fontSize: 20,
    fontFamily: 'IRANSansMobile(FaNum)',
    marginRight: 20,
    color: Colors.grayLight,
    flex: 1,
    textAlign: 'center',
  },
  addressContainer: {
    flexDirection: 'row',
    height: 45,
    marginTop: 30,
    paddingRight: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },
  plusButton: {
    height: 45,
    width: 45,
    borderRadius: 22.5,
    backgroundColor: Colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    alignSelf: 'center',
    marginBottom: 10,
  },
});

export default PayConfirm;
