import React, { memo } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';

const { height, width } = Dimensions.get('window');

const sliderItem = ({ item, navigation, isBanner }) => (
  <TouchableOpacity
    onPress={() => {}}
    activeOpacity={0.9}
    style={styles.sliderImage}>
    {item.ImageUrl !== null && item.ImageUrl !== '' && (
      <FastImage
        style={styles.sliderImage}
        source={{
          uri: item.ImageUrl,
          priority: FastImage.priority.normal,
          cache: FastImage.cacheControl.immutable,
        }}
        resizeMode={
          isBanner ? FastImage.resizeMode.stretch : FastImage.resizeMode.contain
        }
      />
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  sliderImage: {
    height: height / 3.5,
    width: width,
    backgroundColor: 'white',
  },
});

export default memo(sliderItem);
