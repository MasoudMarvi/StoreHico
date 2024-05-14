import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import CText from '../../../components/CText';
import { Colors } from '../../../utility/Colors';
import VerticalDivider from './../../../components/VerticalDivider';
import ProductItem from './ProductItem';

const Products = ({ item }) => {
  const { navigate } = useNavigation();

  const { Category, Product, SubCategory } = item;

  const { Id, DefaultPictureModel, Name, ProductCount } = Category;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            navigate('categoriesStack', {
              screen: 'products',
              initial: false,
              params: { Id },
            })
          }>
          <CText color={Colors.blue} type="bold">
            مشاهده همه
          </CText>
        </TouchableOpacity>
        <CText>{Name}</CText>
      </View>
      <FlatList
        data={Product}
        renderItem={({ item, index }) => <ProductItem item={item} />}
        horizontal
        inverted
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <VerticalDivider height="80%" width={0.6} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginTop: 10,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
});

export default Products;
