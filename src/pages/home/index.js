import { useBackHandler } from '@react-native-community/hooks';
import { useIsFocused, useRoute } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  FlatList,
  StyleSheet,
} from 'react-native';
import ErrorComponent from '../../components/Error';
import LoadingComponent from '../../components/Loading';
import Slider from '../../components/slider/sliderComponent';
import useHomeCategories from '../../hooks/useHomeCategories';
import { Colors } from '../../utility/Colors';
import Utils from '../../utility/Utils';
import Categories from './components/Categories';
import OffProducts from './components/OffProducts';
import Products from './components/Products';

const Home = () => {
  const [backCount, setBackCount] = useState(0);
  const isFocused = useIsFocused();
  const { data, error, loading } = useHomeCategories();

  const ListHeaderComponent = useMemo(
    () => (
      <>
        <Slider />
        <Categories />
      </>
    ),
    [],
  );

  if (error !== '') {
    return <ErrorComponent error={error} />;
  }

  useBackHandler(() => {
    if (isFocused) {
      if (backCount === 1) {
        BackHandler.exitApp();
      } else {
        Utils.showSnackbar({
          message: 'برای خروج دوباره دکمه برگشت را فشار دهید',
        });
        setBackCount(backCount + 1);
        setTimeout(() => {
          setBackCount(0);
        }, 2000);
      }
      return true;
    }

    return false;
  });

  return (
    <FlatList
      data={data}
      renderItem={({ item, index }) =>
        index === 0 ? <OffProducts item={item} /> : <Products item={item} />
      }
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={() => {
        if (loading) {
          return <ActivityIndicator size={'large'} color={Colors.o2market} />;
        }

        return null;
      }}
      contentContainerStyle={data.length > 0 ? {} : { flex: 1 }}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
  },
});

export default Home;
