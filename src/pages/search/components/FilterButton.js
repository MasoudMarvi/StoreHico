import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CText from '../../../components/CText';

const FilterButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <CText mr={15} size={15}>
        فیلتر
      </CText>
      <FontAwesome name="filter" size={20} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    marginRight: 25,
    marginBottom: 10,
  },
});

export default memo(FilterButton);
