import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CText from '../../../components/CText';
import { Colors } from '../../../utility/Colors';

const Actions = ({ onPress, title = 'عنوان', icon = 'list' }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons name={'ios-chevron-back'} size={20} color={Colors.grayDark} />
      <View style={styles.content}>
        <CText size={15} mr={15}>
          {title}
        </CText>
        <FontAwesome size={20} name={icon} color={Colors.grayDark} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default memo(Actions);
