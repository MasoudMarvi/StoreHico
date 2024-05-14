import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../utility/Colors';
import CText from './CText';

function PayTabItem({ state, descriptors, navigation, position }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        let label = '';
        let icon = '';
        switch (route.name) {
          case 'payAddress':
            label = 'آدرس';
            icon = 'map-pin';
            break;
          case 'payShipping':
            label = 'روش ارسال';
            icon = 'map-pin';
            break;
          case 'payTime':
            label = 'زمان تحویل';
            icon = 'calendar-times-o';
            break;
          case 'payBank':
            label = 'پرداخت';
            icon = 'paypal';
            break;
          case 'payConfirm':
            label = 'تایید سفارش';
            icon = 'check-circle';
            break;
          default:
            label = 'بدون اسم';
            break;
        }

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            activeOpacity={0.3}
            disabled={state.index < index}
            key={route.name}
            onPress={onPress}
            style={[
              styles.container,
              {
                borderBottomWidth: isFocused ? 3 : 0,
                borderBottomColor: Colors.white,
              },
            ]}>
            <FontAwesome name={icon} size={20} color={Colors.white} />
            <CText size={16} color={Colors.white} mt={5} type="medium">
              {label}
            </CText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.o2market,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PayTabItem;
