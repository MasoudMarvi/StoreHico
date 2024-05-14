import React, { useState } from 'react';
import { FlatList, ScrollView, StyleSheet } from 'react-native';
import ErrorComponent from '../../components/Error';
import HorizontalDivider from '../../components/HorizontalDivider';
import LoadingComponent from '../../components/Loading';
import useSearchProduct from '../../hooks/useSearchProduct';
import { Colors } from '../../utility/Colors';
import ProductItem from '../categories/components/ProductItem';
import FilterButton from './components/FilterButton';
import FilterView from './components/FilterView';
import SearchInput from './components/SearchInput';

const Search = () => {
  const [toggleFilter, setToggleFilter] = useState(false);

  const { search, dispatch, isSearching, data, error } = useSearchProduct();

  const switchView = () => {
    return toggleFilter ? (
      <FilterView />
    ) : (
      <FlatList
        data={data}
        renderItem={({ item, index }) => <ProductItem item={item} />}
        ListEmptyComponent={() => {
          if (isSearching) {
            return <LoadingComponent />;
          }

          if (error) {
            return <ErrorComponent error={error} />;
          }

          if (search === '') return null;

          return <ErrorComponent error={'محصولی یافت نشد!'} />;
        }}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <HorizontalDivider marginTop={20} marginBottom={20} width="80%" />
        )}
        contentContainerStyle={data.length === 0 ? { flex: 1 } : {}}
      />
    );
  };

  return (
    <ScrollView style={styles.container}>
      <SearchInput
        value={search}
        onChangeText={text => dispatch({ type: 'search', payload: text })}
        onEndEditing={() => dispatch({ type: 'isSearching' })}
      />
      {/* <FilterButton
        onPress={() => {
          setToggleFilter(!toggleFilter);
        }}
      /> */}
      {switchView()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
  },
});

export default Search;
