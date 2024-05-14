import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Dialog, Portal } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CButton from '../../components/CButton';
import CText from '../../components/CText';
import HorizontalDivider from '../../components/HorizontalDivider';
import VerticalDivider from '../../components/VerticalDivider';
import useSetUser from '../../hooks/useSetUser';
import { Colors } from '../../utility/Colors';
import Actions from './components/Actions';

const Profile = () => {
  const [exitDialog, setExitDialog] = useState(false);

  const { navigate, dispatch } = useNavigation();

  const setUser = useSetUser();

  const onLogout = () => {
    setExitDialog(false);
    setUser({ token: '' });
    dispatch(StackActions.replace('splash'));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity style={styles.topContent}>
          <FontAwesome name="shopping-basket" size={35} />
          <CText size={15} type="medium" mt={10}>
            0 میواسمارت
          </CText>
        </TouchableOpacity>
        <VerticalDivider />
        <TouchableOpacity
          style={styles.topContent}
          onPress={() => navigate('account')}>
          <FontAwesome name="user" size={35} />
          <CText size={15} type="medium" mt={10}>
            حساب کاربری
          </CText>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Actions
          title="وقت خرید"
          icon="shopping-basket"
          onPress={() =>
            navigate('categoriesStack', {
              screen: 'products',
              initial: false,
              params: { Id: 3747, comeFrom: 'profile' },
            })
          }
        />
        <HorizontalDivider />
        <Actions
          title="تخفیفات ویژه"
          icon="percent"
          onPress={() =>
            navigate('categoriesStack', {
              screen: 'products',
              initial: false,
              params: { Id: 3748, comeFrom: 'profile' },
            })
          }
        />
        <HorizontalDivider />
        <Actions
          title="سفارشات"
          icon="th-list"
          onPress={() => navigate('orders')}
        />
        <HorizontalDivider />
        <Actions
          title="لیست علاقه مندی ها"
          icon="heart"
          onPress={() => navigate('favorite')}
        />
        <HorizontalDivider />
        <Actions
          title="آدرس ها"
          icon="map-pin"
          onPress={() => navigate('addresses')}
        />
        <HorizontalDivider />
        <Actions
          title="تماس با ما"
          icon="phone"
          onPress={() => navigate('contactUs')}
        />
        <HorizontalDivider />
        <Actions
          title="خروج"
          icon="sign-out"
          onPress={() => setExitDialog(true)}
        />
      </View>
      <Portal>
        <Dialog visible={exitDialog} dismissable={false}>
          <Dialog.Content>
            <CText size={15}>آیا برای خروج اطمینان دارید؟</CText>
          </Dialog.Content>
          <Dialog.Actions style={{ justifyContent: 'space-around' }}>
            <CButton onPress={onLogout} style={{ width: 120 }} title="تایید" />
            <CButton
              onPress={() => setExitDialog(false)}
              style={{ width: 120, backgroundColor: Colors.grayLight }}
              title="بستن"
            />
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
  },
  topContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 200,
    backgroundColor: Colors.white,
    elevation: 2,
  },
  topContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: Colors.white,
    marginTop: 20,
    elevation: 2,
  },
});

export default Profile;
