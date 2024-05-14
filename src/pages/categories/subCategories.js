import { useRoute } from '@react-navigation/core';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { scale } from 'react-native-size-matters';
import CText from '../../components/CText';
import HorizontalDivider from '../../components/HorizontalDivider';
import { Colors } from '../../utility/Colors';
import SubCategoryItem from './components/SubCategoryItem';

const SubCategories = () => {
  const { params } = useRoute();

  const { data, name, image } = params;

  return (
    <FlatList
      data={data}
      renderItem={({ item, index }) => <SubCategoryItem item={item} />}
      ListHeaderComponent={() => (
        <>
          <View style={styles.imageContainer}>
            <FastImage
              source={{ uri: image }}
              resizeMode={FastImage.resizeMode.contain}
              style={styles.image}
            />
          </View>
          <CText mt={16} mb={16}   type={'bold'} textAlign="center" justifyContent="center" >
            {name}
          </CText>
        </>
      )}
      keyExtractor={(item, index) => index.toString()}
      ItemSeparatorComponent={() => (
        <HorizontalDivider width={250} height={0.8} />
      )}
      style={styles.container}
      contentContainerStyle={styles.content}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor
    
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: scale(20),
    paddingBottom: scale(20),
    
  },
  imageContainer: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
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

export default SubCategories;
