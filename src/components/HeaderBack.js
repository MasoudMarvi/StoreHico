import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../utility/Colors';
import CText from './CText';

const HeaderBack = props => {
  return (
    <View style={styles.header}>
      <View style={styles.left}>
        {/* <TouchableOpacity
          onPress={props.onSortPress}
          activeOpacity={0.4}
          style={styles.backButtonContainer}>
          <FontAwesome name={'sort'} size={scale(20)} color={Colors.white} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={props.onFilterPress}
          activeOpacity={0.4}
          style={styles.backButtonContainer}>
          <FontAwesome name={'filter'} size={scale(20)} color={Colors.white} />
        </TouchableOpacity> */}
      </View>
      <View style={styles.right}>
        <CText
          type={'bold'}
          size={scale(20)}
          numberOfLines={1}
          color={Colors.white}
          mr={5}>
          {props.title}
        </CText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 57,
    backgroundColor: Colors.o2market,
    flexDirection: 'row',
    elevation: 10,
  },
  center: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'center',
    paddingRight: 5,
  },

  backButtonContainer: {
    padding: 10,
    marginLeft: 10,
  },

  settingContainer: {
    paddingLeft: 3,
    paddingRight: 3,
    paddingTop: 2,
    paddingBottom: 2,
  },
});

export default HeaderBack;
