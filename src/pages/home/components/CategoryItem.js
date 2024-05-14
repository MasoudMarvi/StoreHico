import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { scale } from 'react-native-size-matters';
import CText from '../../../components/CText';
import { Colors } from '../../../utility/Colors';

const CategoryItem = ({ item }) => {
  const { navigate } = useNavigation();

  const { Id, Name, IconPath } = item;

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.container}
      onPress={() =>
        navigate('categoriesStack', {
          screen: 'products',
          initial: false,
          params: { Id, comeFrom: 'home' },
        })
      }>
      <FastImage
        source={{ uri: IconPath }}
        resizeMode={FastImage.resizeMode.contain}
        style={{ height: scale(60), width: scale(60) }}
      />
      <CText>{Name}</CText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(90),
    height: scale(100),
    borderRadius: 10,
    margin: scale(10),
    elevation: 1,
    backgroundColor: Colors.grayLighter,
    overflow: 'hidden',
  },
});

export default CategoryItem;
