import { useNavigation, useRoute } from '@react-navigation/core';
import moment from 'moment-jalaali';
import React from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import CButton from '../../components/CButton';
import CText from '../../components/CText';
import useCustomerOrderDetail from '../../hooks/useCustomerOrderDetail';
import { Colors } from '../../utility/Colors';
import ErrorComponent from './../../components/Error';
import LoadingComponent from './../../components/Loading';
import PayProduct from './../basket/components/PayProduct';
import OrderPayDetail from './components/OrderPayDetail';

const OrderDetail = () => {
  const { navigate } = useNavigation();

  const { params } = useRoute();

  const { data, loading, error } = useCustomerOrderDetail({ Id: params.Id });

  const {
    PrintMode,
    PdfInvoiceDisabled,
    CustomOrderNumber,
    CreatedOn,
    OrderStatus,
    IsReOrderAllowed,
    IsReturnRequestAllowed,
    IsShippable,
    PickUpInStore,
    ShippingStatus,
    ShippingAddress,
    PickupAddress,
    ShippingMethod,
    Shipments,
    BillingAddress,
    VatNumber,
    PaymentMethod,
    PaymentMethodStatus,
    CanRePostProcessPayment,
    CustomValues,
    OrderSubtotal,
    OrderSubTotalDiscount,
    OrderShipping,
    PaymentMethodAdditionalFee,
    CheckoutAttributeInfo,
    PricesIncludeTax,
    DisplayTaxShippingInfo,
    Tax,
    TaxRates,
    DisplayTax,
    DisplayTaxRates,
    OrderTotalDiscount,
    RedeemedRewardPoints,
    RedeemedRewardPointsAmount,
    OrderTotal,
    GiftCards,
    ShowSku,
    Items,
    Shipping
  } = data;

  if (loading) return <LoadingComponent />;

  if (error !== '') return <ErrorComponent error={error} />;

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              padding: 10,
              alignItems: 'center',
            }}>
            {/* <CButton title="پرداخت" style={{ width: '30%', height: 40 }} /> */}
            {/* <CText size={14}>سفارش {CustomOrderNumber}#</CText> */}
          </View>
          <CText
            mr={5}
            ml={5}
            mb={5}
            size={14}
            textAlign={'center'}
            style={{ width: '100%' }}>
            {`سفارش: ${CustomOrderNumber} \n تاریخ سفارش ${moment(CreatedOn).format(
              'HH:mm jYYYY/jMM/jDD',
            )} \n وضعیت سفارش ${OrderStatus} \n کل سفارش ${OrderTotal}`}
          </CText>
        </View>
        {/* <View style={styles.content}>
          <View style={styles.titleContainer}>
            <CText color={Colors.white} size={14}>
              آدرس
            </CText>
          </View>
          <CText mr={15} mt={10} size={14}>
            {`${BillingAddress.FirstName} ${BillingAddress.LastName}`}
          </CText>
          <CText mr={15} mt={10} size={14}>
            {BillingAddress.PhoneNumber}
          </CText>
          <CText mr={15} mt={10} mb={15} size={14}>
            {BillingAddress.Address1}
          </CText>
        </View> */}
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <CText color={Colors.white} size={14}>
            اطلاعات شخصی و آدرس
            </CText>
          </View>
          <CText mr={15} mt={10} size={14}>
            {`${ShippingAddress.FirstName} ${ShippingAddress.LastName}`}
          </CText>
          <CText mr={15} mt={10} size={14}>
            {ShippingAddress.PhoneNumber}
          </CText>
          <CText mr={15} mt={10} mb={15} size={14}>
            {ShippingAddress.Address1}
          </CText>
        </View>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <CText color={Colors.white} size={14}>
              پرداخت
            </CText>
          </View>
          <CText mr={15} mt={10} size={14}>
            روش پرداخت : {PaymentMethod}
          </CText>
          <CText mr={15} mt={10} size={14}>
            وضعیت پرداخت : {PaymentMethodStatus}
          </CText>
        </View>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <CText color={Colors.white} size={14}>
              روش های ارسال
            </CText>
          </View>
          <CText mr={15} mt={10} size={14}>
            روش ارسال : {ShippingMethod}
          </CText>
          <CText mr={15} mt={10} size={14}>
            وضعیت ارسال : {ShippingStatus}
          </CText>
        </View>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <CText color={Colors.white} size={14}>
              محصولات
            </CText>
          </View>
          <FlatList
            data={Items}
            renderItem={({ item, index }) => <PayProduct item={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <OrderPayDetail data={data} />
        {/* <CButton title="سفارش مجدد" /> */}
      </ScrollView>
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
    borderColor: Colors.grayLight,
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

export default OrderDetail;
