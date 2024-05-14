import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CText from '../../../components/CText';
import { Colors } from '../../../utility/Colors';

const { height, width } = Dimensions.get('screen');

const Filter = ({ onClosePress }) => {
  const [checked, setChecked] = React.useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <CText mr={15} type="bold" color={Colors.white} size={15}>
          فیلتر کردن محصول
        </CText>
        <TouchableOpacity onPress={onClosePress}>
          <FontAwesome name="close" color={Colors.white} size={20} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.itemContainer}>
            <TouchableOpacity style={styles.item}>
              <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked(!checked);
                }}
              />
              <CText>ا الی 3 کیلو</CText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked(!checked);
                }}
              />
              <CText>ا الی 3 کیلو</CText>
            </TouchableOpacity>
          </View>
          <View style={styles.actionContainer}>
            <TouchableOpacity
              style={[styles.action, { backgroundColor: Colors.white }]}>
              <CText color={Colors.grayDark}>وزن</CText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.action}>
              <CText color={Colors.white}>حجم</CText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.action}>
              <CText color={Colors.white}>نوع</CText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.action}>
              <CText color={Colors.white}>کاربرد</CText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.action}>
              <CText color={Colors.white}>رایحه</CText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <CText mr={15} type="bold" color={Colors.white} size={15}>
          فیلتر کن
        </CText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.o2market,
    height: 60,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 10,
  },
  footer: {
    backgroundColor: Colors.o2market,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    flexDirection: 'row',
    width: '100%',
  },
  actionContainer: {
    flex: 1,
    backgroundColor: Colors.grayDark,
    height: height,
  },
  action: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 20,
  },
  itemContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
});

export default Filter;
