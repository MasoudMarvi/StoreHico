import { useRoute } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Button from '../../components/CButton';
import CText from '../../components/CText';
import Like from '../../components/Like';
import Slider from '../../components/slider/sliderComponent';
import useProductDetail from '../../hooks/useProductDetail';
import { Colors } from '../../utility/Colors';
import Utils from '../../utility/Utils';
import ErrorComponent from './../../components/Error';
import LoadingComponent from './../../components/Loading';
import AddToBasket from './components/AddToBasket';

const Product = () => {
  const { params } = useRoute();

  const { Id } = params;

  const { data, loading, error } = useProductDetail({ Id });

  const { PictureModels, Name, FullDescription, ProductPrice, Quantity } = data;

  const { StockQuantity } = Quantity || { StockQuantity: 0 };

  if (loading) {
    return <LoadingComponent />;
  }

  if (error !== '') {
    return <ErrorComponent error={error} />;
  }

  const regex = /(<([^>]+)>)/gi;
  const desc = FullDescription===null || FullDescription===''?'':FullDescription.replace(regex, '');

  return (
    <>
      <ScrollView style={styles.container}>
        <Slider sliderList={PictureModels} />
        <View style={styles.content}>
          <CText size={15} mr={15} mt={15}>
            {Name}
          </CText>
          <View style={styles.priceContainer}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <CText numberOfLines={1} color={Colors.green} size={18}>
                {Utils.formatMoney(ProductPrice.PriceValue)} تومان
              </CText>
              {ProductPrice.PriceValue !==
                ProductPrice.PriceWithDiscountValue && (
                <CText
                  numberOfLines={1}
                  color={Colors.grayLight}
                  size={14}
                  style={{ textDecorationLine: 'line-through' }}>
                  {Utils.formatMoney(ProductPrice.PriceWithDiscountValue)}
                </CText>
              )}
            </View>
            {StockQuantity > 0 && <Like Id={Id} />}
          </View>
        </View>
        <View style={styles.content}>
          <CText size={15} mr={15} mt={15}>
            جزئیات
          </CText>
          <CText size={13} m={15}>
            {desc}
          </CText>
          {/* <CText size={15} mr={15} mt={15}>
            ویژگی ها
          </CText>
          <CText size={13} m={15}>
            {'برنج ایرانی \n گارانتی : گارانتی اصالت و سلامت فیزیکی کالا'}
          </CText> */}
        </View>
      </ScrollView>
      {(StockQuantity > 0 && <AddToBasket Id={Id} />) || (
        <Button
          title="موجودی این کالا به اتمام رسیده است"
          style={{ backgroundColor: Colors.error }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: Colors.backgroundColor,
  },
  content: {
    backgroundColor: Colors.white,
    marginTop: 10,
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    padding: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Product;
