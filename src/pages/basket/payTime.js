import React from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import CText from '../../components/CText';
import { Colors } from '../../utility/Colors';
import CButton from '../../components/CButton';
import { useNavigation } from '@react-navigation/core';
import DateItem from './components/DateItem';
import TimeItem from './components/TimeItem';

const PayTime = () => {
  const { navigate } = useNavigation();

  return (
    <>
      <ScrollView style={styles.container}>
        <CText mr={15} mt={15} mb={20} size={16} type="bold">
          تاریخ تحویل
        </CText>
        <FlatList
          data={[1, 2]}
          horizontal
          inverted
          renderItem={(item, index) => <DateItem />}
        />
        <CText mr={15} mt={15} mb={20} size={16} type="bold">
          زمان تحویل
        </CText>
        <FlatList
          data={[1, 2, 3, 4, 5, 6]}
          inverted
          renderItem={(item, index) => <TimeItem />}
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
          }}
        />
      </ScrollView>
      <CButton title="تایید" onPress={() => navigate('payBank')} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  content: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 10,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
  },
  inputContainer: {
    flexDirection: 'row',
    height: 55,
    borderColor: Colors.grayLight,
    borderWidth: 0.6,
    marginTop: 15,
    paddingRight: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 20,
    backgroundColor: Colors.white,
  },
  input: {
    padding: 0,
    fontSize: 20,
    fontFamily: 'IRANSansMobile(FaNum)',
    marginRight: 20,
    color: Colors.grayLight,
    flex: 1,
    textAlign: 'center',
  },
  addressContainer: {
    flexDirection: 'row',
    height: 45,
    marginTop: 30,
    paddingRight: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },
  plusButton: {
    height: 45,
    width: 45,
    borderRadius: 22.5,
    backgroundColor: Colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    alignSelf: 'center',
    marginBottom: 10,
  },
});

export default PayTime;
