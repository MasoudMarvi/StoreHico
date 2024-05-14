import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ErrorComponent from '../../components/Error';
import LoadingComponent from '../../components/Loading';
import useCategories from '../../hooks/useCategories';
import { Colors } from '../../utility/Colors';
import CategoryItem from './components/CategoryItem';

const Categories = () => {
  const { data, loading, error } = useCategories();

  if (loading) {
    return <LoadingComponent />;
  }

  if (error !== '') {
    return <ErrorComponent error={error} />;
  }

  return (
    <FlatList
      data={data}
      renderItem={({ item, index }) => <CategoryItem item={item} />}
      numColumns={3}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.content}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingTop: 20,
    paddingBottom: 50,
  },
});

export default Categories;
