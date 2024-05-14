import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import CText from '../../components/CText';
import useWishList from '../../hooks/useWishList';
import { Colors } from '../../utility/Colors';
import ErrorComponent from './../../components/Error';
import LoadingComponent from './../../components/Loading';
import WishItem from './components/WishItem';

const Favorite = () => {
  const { dispatch, data, loading, error } = useWishList();

  useFocusEffect(
    useCallback(() => {
      dispatch({ type: 'loading' });
      return () => {};
    }, []),
  );

  if (error !== '') {
    return <ErrorComponent error={error} />;
  }

  if (loading) return <LoadingComponent />;

  return (
    <FlatList
      data={data}
      renderItem={({ item, index }) => (
        <WishItem
          item={item}
          onRemoveSuccess={() => dispatch({ type: 'loading' })}
        />
      )}
      keyExtractor={(item, index) => item.Id.toString()}
      ListEmptyComponent={() => (
        <CText size={20}>لیست علاقه مندی ها خالی می باشد!</CText>
      )}
      style={styles.container}
      contentContainerStyle={data.length === 0 ? styles.content : {}}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Favorite;
