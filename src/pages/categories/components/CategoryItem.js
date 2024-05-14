import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { scale } from 'react-native-size-matters';
import CText from '../../../components/CText';
import { Colors } from '../../../utility/Colors';
import { useNavigation } from '@react-navigation/native';

const CategoryItem = ({ item }) => {
  const { navigate } = useNavigation();

  const { Id, Name, IconPath, Children } = item;

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() =>
        navigate('subCategories', {
          data: Children,
          name: Name,
          image: IconPath,
        })
      }>
      <View style={styles.imageContainer}>
        <FastImage
          source={{ uri: IconPath }}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.image}
        />
      </View>
      <CText mt={10} mb={10} size={12}>
        {Name}
      </CText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: scale(110),
    width: '33%',
    marginTop: scale(6),
    marginBottom: scale(6),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:10
  },
  imageContainer: {
    width: scale(80),
    height: scale(80),
    borderRadius: 10,
    backgroundColor: Colors.white,
    overflow: 'hidden',
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: scale(70),
    height: scale(70),
  },
});

export default CategoryItem;
