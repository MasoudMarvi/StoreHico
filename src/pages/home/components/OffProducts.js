import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import CText from '../../../components/CText';
import { Colors } from '../../../utility/Colors';
import OffItem from './OffItem';

const OffProducts = ({ item }) => {
  const { Category, Product, SubCategory } = item;

  const { DefaultPictureModel, Name, ProductCount } = Category;

  return (
    <FlatList
      ListHeaderComponent={() => (
        <View style={styles.titleContainer}>
          <CText type="bold" color={Colors.white} mr={10} ml={10} size={16}>
            وقت خرید با تخفیف
          </CText>
        </View>
      )}
      data={Product}
      renderItem={({ item, index }) => <OffItem item={item} />}
      horizontal
      inverted
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.o2market,
    marginTop: 10,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    padding: 15,
  },
});

export default OffProducts;
