import React, { memo } from 'react';
import { FlatList, View, ActivityIndicator, StyleSheet } from 'react-native';
import useCategories from '../../../hooks/useCategories';
import { Colors } from '../../../utility/Colors';
import CategoryItem from './CategoryItem';

const Categories = () => {
  const { data, loading, error } = useCategories();

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item, index }) => <CategoryItem item={item} />}
        horizontal
        inverted
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={data.length > 0 ? {} : styles.container}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(Categories);
