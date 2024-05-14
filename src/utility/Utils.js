import { Alert, Linking, Platform } from 'react-native';
import Snackbar from 'react-native-snackbar';
import { Colors } from './Colors';

const Utils = {
  formatMoney(num, persianDigit = false) {
    if (num === 'undefined' || typeof num === undefined) {
      return '';
    }
    let n = num,
      c = 0,
      d = '',
      t = ',',
      s = n < 0 ? '-' : '',
      i = String(parseInt((n = Math.abs(Number(n) || 0).toFixed(c)))),
      j = (j = i.length) > 3 ? j % 3 : 0;
    const result =
      s +
      (j ? i.substr(0, j) + t : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${t}`) +
      (c
        ? d +
          Math.abs(n - i)
            .toFixed(c)
            .slice(2)
        : '');
    return persianDigit ? Utils.toPersianDigits(result) : result;
  },

  formatMoneyInput(num) {
    let number = '';

    number = num.replace(/\D/g, '');

    number = number.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,');

    return number;
  },

  formatMobile(number, toPersianDigits = false) {
    if (typeof number === 'undefined') {
      return '';
    }

    number += ''; // Convert to string

    let result = '';

    if (number.length >= 11) {
      result = `${number.substr(0, 4)} ${number.substr(4, 3)} ${number.substr(
        7,
        2,
      )} ${number.substr(9)}`;
    }

    return toPersianDigits ? Utils.toPersianDigits(result) : result;
  },

  toEnglishDigits(number) {
    return number
      .replace(/[\u0660-\u0669]/g, c => {
        return c.charCodeAt(0) - 0x0660;
      })
      .replace(/[\u06f0-\u06f9]/g, c => {
        return c.charCodeAt(0) - 0x06f0;
      });
  },

  shallowEqual(objA: mixed, objB: mixed): boolean {
    if (objA === objB) {
      return true;
    }

    if (
      typeof objA !== 'object' ||
      objA === null ||
      typeof objB !== 'object' ||
      objB === null
    ) {
      return false;
    }

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
      return false;
    }
    const bHasOwnProperty = hasOwnProperty.bind(objB);
    for (let i = 0; i < keysA.length; i++) {
      if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
        return false;
      }
    }
    return true;
  },

  shallowCompare(instance, nextProps, nextState) {
    return (
      !Utils.shallowEqual(instance.props, nextProps) ||
      !Utils.shallowEqual(instance.state, nextState)
    );
  },

  objToString(obj) {
    var str = '';
    for (var p in obj) {
      if (p === 'detail') {
        str = obj[p];
      } else {
        if (obj.hasOwnProperty(p)) {
          str += p + ' : ' + obj[p] + '\n';
        }
      }
    }
    return str;
  },

  validateHhMm(time) {
    var isValid = /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/.test(
      time,
    );
    return isValid;
  },

  convertHMStoSeconds(time) {
    let a = time.split(':');
    return +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
  },

  showSnackbar({
    message,
    duration = Snackbar.LENGTH_SHORT,
    type = 'success',
  }) {
    Snackbar.show({
      text: message,
      duration: duration,
      action: {
        text: 'بستن',
        textColor: 'white',
        onPress: () => {
          Snackbar.dismiss();
        },
      },
      backgroundColor: type === 'success' ? Colors.green : Colors.error,
      textColor: 'white',
      fontFamily: 'IRANSansMobile(FaNum)',
    });
  },

  openSite(site) {
    Linking.canOpenURL(site).then(supported => {
      if (supported) {
        return Linking.openURL(site);
      } else {
        Alert.alert('This site is not available');
      }
    });
  },
};

export default Utils;
