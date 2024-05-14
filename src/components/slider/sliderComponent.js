import React, { memo, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import useBanner from '../../hooks/useBanner';
import { Colors } from '../../utility/Colors';
import SliderItem from './sliderItem';

const Slider = ({ sliderList }) => {
  const [indexSlider, setIndex] = useState(0);

  const { data, loading, error } = useBanner();

  const { width, height } = useWindowDimensions();

  return (
    <View style={{ height: height / 3.5 }}>
      <Carousel
        data={sliderList ? sliderList : data}
        renderItem={({ item }) => (
          <SliderItem item={item} isBanner={!sliderList} />
        )}
        keyExtractor={(item, index) => index.toString()}
        sliderWidth={width}
        itemWidth={width}
        layout={'default'}
        loop
        autoplay
        autoplayDelay={1000}
        autoplayInterval={5000}
        onSnapToItem={index => setIndex(index)}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
      />
      <View style={styles.paginationContainer}>
        <Pagination
          dotsLength={sliderList ? sliderList.length : data.length}
          activeDotIndex={indexSlider}
          activeOpacity={100}
          containerStyle={styles.dotContainerStyle}
          dotStyle={styles.dotStyle}
          inactiveDotStyle={styles.inactiveDotStyle}
          inactiveDotOpacity={1}
          inactiveDotScale={0.7}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  dotContainerStyle: {
    paddingVertical: 10,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 7.5,
    marginLeft: -5,
    marginRight: -5,
    backgroundColor: Colors.o2market,
  },
  inactiveDotStyle: {
    width: 10,
    height: 10,
    borderRadius: 7.5,
    marginLeft: -5,
    marginRight: -5,
    backgroundColor: Colors.black,
  },
});

export default Slider;
