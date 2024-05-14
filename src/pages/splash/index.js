import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useEffect,  useState  } from 'react';
import {StyleSheet, View,Dimensions,Linking } from 'react-native';
import useThemeSettings from '../../hooks/useThemeSettings';
import useUser from '../../hooks/useUser';
import { Dialog, Portal } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import CText from '../../components/CText';
import CButton from '../../components/CButton';
import { Colors } from '../../utility/Colors';

const { height, width } = Dimensions.get('screen');

const Splash = () => {
  const navigation = useNavigation();
  const [exitDialog, setExitDialog] = useState(false);
  const [forceDownload, setForceDownload] = useState(false);
  const useThemeSetting = useThemeSettings();
  const user = useUser();
  const OnNextPage = () => {
    if (user) {
      if (user?.Token) {
        navigation.dispatch(StackActions.replace('dashboard'));
      } else {
        navigation.dispatch(StackActions.replace('login'));
      }
    }
    return () => {};
  };
   
  useEffect(() => {
    if(useThemeSetting.data.AppKey != null){
    if(useThemeSetting.data.AppKey!='1.0.0'){
      if(exitDialog!=true){
      setExitDialog(true);
      setForceDownload(useThemeSetting.data.AppNameOnGooglePlayStore)
    }
    }
    else{
      setExitDialog(false);
      if (user) {
        if (user?.Token) {
          navigation.dispatch(StackActions.replace('dashboard'));
        } else {
          navigation.dispatch(StackActions.replace('login'));
        }
      }
      return () => {};
    }
  }
   
  }, [user,useThemeSetting]);

  return (
    <View style={styles.container}>
       <FastImage
        source={require("../../assets/image/Logo1.png")}
        resizeMode={FastImage.resizeMode.contain}
        style={styles.image}
      />
      {/* <ActivityIndicator size={'large'} color={'#000'} /> */}
      <Portal>
        <Dialog visible={exitDialog} dismissable={false}>
          <Dialog.Content>
            <CText size={15}>لطفا نسخه خود را بروزرسانی نمایید؟</CText>
          </Dialog.Content>
          <Dialog.Actions style={{ justifyContent: 'space-around' }}>
            <CButton onPress={ ()=>{ Linking.openURL(useThemeSetting.data.AppUrlOnGooglePlayStore)}} style={{ width: 120 }} title="دانلود" />
            {(forceDownload =="false" ) || (
      <CButton disabled={forceDownload}
      onPress={() => OnNextPage()}
      style={{ width: 120, backgroundColor: Colors.grayLight }}
      title="فعلا نه!"
    />
      )}   
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>

  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginTop:30,
    height: height / 2.5,
    width: width,
    alignSelf: 'center',
  }
});

export default Splash;
