import React from 'react';
import { StyleSheet, View } from 'react-native';
import CText from './CText';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import useBasketCount from '../hooks/useBasketCount';
import Badge from './Badge';

const TabItem = ({ route, focused, color, size }) => {
  const basketCount = useBasketCount();

  switch (route.name) {
    case 'home':
      return (
        <View style={styles.container}>
          <FontAwesome name="home" color={color} size={16} />
          {focused && (
            <CText color={color} type={'bold'} size={11} mt={3}>
              خانه
            </CText>
          )}
        </View>
      );
    case 'categoriesStack':
      return (
        <View style={styles.container}>
          <FontAwesome name="list" color={color} size={16} />
          {focused && (
            <CText color={color} type={'bold'} size={11} mt={3}>
              دسته بندی
            </CText>
          )}
        </View>
      );
    case 'basket':
      return (
        <View style={styles.container}>
          {basketCount > 0 && <Badge count={basketCount} />}
          <FontAwesome name="shopping-basket" color={color} size={16} />
          {focused && (
            <CText color={color} type={'bold'} size={11} mt={3}>
              سبد خرید
            </CText>
          )}
        </View>
      );

    case 'search':
      return (
        <View style={styles.container}>
          <FontAwesome name="search" color={color} size={16} />
          {focused && (
            <CText color={color} type={'bold'} size={11} mt={3}>
              جست و جو
            </CText>
          )}
        </View>
      );
    case 'profile':
      return (
        <View style={styles.container}>
          <FontAwesome name="user" color={color} size={16} />
          {focused && (
            <CText color={color} type={'bold'} size={11} mt={3}>
              پروفایل
            </CText>
          )}
        </View>
      );

    default:
      return <View style={styles.container} />;
  }
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TabItem;
