import React from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { scale } from 'react-native-size-matters';
import CText from '../../../components/CText';
import { Colors } from '../../../utility/Colors';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const SubCategoryItem = ({ item }) => {
  const { navigate } = useNavigation();

  const { Id, Name, IconPath } = item;

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() => navigate('products', { Id })}>
      <CText mt={10} mb={10} mr={10} type="medium" size={14}>
        {Name}
      </CText>
      <View style={styles.imageContainer}>
        <FastImage
          source={{ uri: IconPath }}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.image}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  imageContainer: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    borderWidth: 2,
    borderColor: Colors.grayLighter,
    overflow: 'hidden',
    //elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  image: {
    width: scale(70),
    height: scale(70),
  },
});

export default SubCategoryItem;
