import { useBackHandler } from '@react-native-community/hooks';
import {
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, Modal, StyleSheet } from 'react-native';
import ErrorComponent from '../../components/Error';
import HeaderBack from '../../components/HeaderBack';
import HorizontalDivider from '../../components/HorizontalDivider';
import LoadingComponent from '../../components/Loading';
import useProductByCategory from '../../hooks/useProductByCategory';
import { Colors } from '../../utility/Colors';
import Filter from './components/Filter';
import ProductItem from './components/ProductItem';

const Products = () => {
  const { params } = useRoute();
  const { dispatch: navigationDispatch } = useNavigation();

  useBackHandler(() => {
    const { comeFrom } = params || { comeFrom: undefined };
    if (comeFrom) {
      comeFrom === 'home'
        ? navigationDispatch(StackActions.replace('dashboard'))
        : navigationDispatch(
            StackActions.replace('dashboard', { screen: 'profile' }),
          );
      return true;
    }
    return false;
  });

  const { data, loading, error, name, page, totalPages, dispatch } =
    useProductByCategory({
      Id: params.Id,
    });

  const [filter, setFilter] = useState(false);

  if (loading) return <LoadingComponent />;

  if (error) return <ErrorComponent error={error} />;

  const handleLoadMore = () => {
    if (page <= totalPages) {
      dispatch({ type: 'pagination', payload: page + 1 });
    }
  };

  return (
    <>
      <HeaderBack title={name} onFilterPress={() => setFilter(!filter)} />
      <FlatList
        data={data}
        renderItem={({ item, index }) => <ProductItem item={item} />}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <HorizontalDivider width={150} height={1} />
        )}
        contentContainerStyle={data.length === 0 ? { flex: 1 } : styles.content}
        style={styles.container}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.001}
      />
      <Modal visible={filter} onRequestClose={() => setFilter(!filter)}>
        <Filter onClosePress={() => setFilter(!filter)} />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
  },
  content: {
    paddingTop: 20,
    paddingBottom: 20,
  },
});

export default Products;

{
  /* <FlatList
          data={[1, 2, 3]}
          renderItem={(item, index) => (
            <View
              style={{
                height: 30,
                width: 50,
                borderRadius: 25,
                backgroundColor: Colors.green,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 5,
                marginRight: 5,
              }}>
              <CText type="bold" color={Colors.white} size={12}>
                قند
              </CText>
            </View>
          )}
          horizontal
          inverted
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{ margin: 10 }}
        /> */
}
