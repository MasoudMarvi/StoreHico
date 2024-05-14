import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CText from '../../../components/CText';
import { Colors } from '../../../utility/Colors';

const { height, width } = Dimensions.get('screen');

const BankItem = ({ item, paymentMethod, onSelectPress }) => {
  const { Name, Selected, LogoUrl, PaymentMethodSystemName } = item;

  return (
    <View style={styles.container}>
    
    {/* <ImageBackground
      style={styles.container}
      source={{ uri: LogoUrl }}
      resizeMode="stretch">
    </ImageBackground> */}

     
      <TouchableOpacity style={styles.content} onPress={onSelectPress}>
      <FastImage
        source={{ uri: LogoUrl }}
        resizeMode={FastImage.resizeMode.contain}
        style={styles.image}
      />
        <CText size={16} mr={10} color={Colors.white}>
          {Name}
        </CText>
        <Ionicons
          name={
            PaymentMethodSystemName === paymentMethod
              ? 'radio-button-on'
              : 'radio-button-off'
          }
          size={20}
          color={Colors.green}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width:'70%',
    // margin: 10,
    marginTop: 20,
    marginBottom: 10,
    marginLeft:70,
     borderRadius: 20
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    // margin: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 10,

  },
  image: {
    height: height / 5.5,
    width: '100%',
    alignSelf: 'center',

  },
});

export default BankItem;
