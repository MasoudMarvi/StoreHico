import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';

function CText(props) {
  switch (props.type) {
    case 'bold':
      return (
        <Text
          {...props}
          allowFontScaling={false}
          style={[
            styles.bold,
            {
              color: props.color,
              fontSize: props.size,
              margin: props.m,
              marginTop: props.mt,
              marginBottom: props.mb,
              marginLeft: props.ml,
              marginRight: props.mr,
              padding: props.p,
              paddingLeft: props.pl,
              paddingRight: props.pr,
              paddingBottom: props.pb,
              paddingTop: props.pt,
              textAlign: props.textAlign,
            },
            props.style,
          ]}>
          {props.children}
        </Text>
      );
    case 'light':
      return (
        <Text
          {...props}
          allowFontScaling={false}
          style={[
            styles.light,
            {
              color: props.color,
              fontSize: props.size,
              margin: props.m,
              marginTop: props.mt,
              marginBottom: props.mb,
              marginLeft: props.ml,
              marginRight: props.mr,
              padding: props.p,
              paddingLeft: props.pl,
              paddingRight: props.pr,
              paddingBottom: props.pb,
              paddingTop: props.pt,
              textAlign: props.textAlign,
            },
            props.style,
          ]}>
          {props.children}
        </Text>
      );
    case 'medium':
      return (
        <Text
          {...props}
          allowFontScaling={false}
          style={[
            styles.medium,
            {
              color: props.color,
              fontSize: props.size,
              margin: props.m,
              marginTop: props.mt,
              marginBottom: props.mb,
              marginLeft: props.ml,
              marginRight: props.mr,
              padding: props.p,
              paddingLeft: props.pl,
              paddingRight: props.pr,
              paddingBottom: props.pb,
              paddingTop: props.pt,
              textAlign: props.textAlign,
            },
            props.style,
          ]}>
          {props.children}
        </Text>
      );

    default:
      return (
        <Text
          {...props}
          allowFontScaling={false}
          style={[
            styles.normal,
            {
              color: props.color,
              fontSize: props.size,
              margin: props.m,
              marginTop: props.mt,
              marginBottom: props.mb,
              marginLeft: props.ml,
              marginRight: props.mr,
              padding: props.p,
              paddingLeft: props.pl,
              paddingRight: props.pr,
              paddingBottom: props.pb,
              paddingTop: props.pt,
              textAlign: props.textAlign,
            },
            props.style,
          ]}>
          {props.children}
        </Text>
      );
  }
}

CText.defaultProps = {
  type: 'regular',
  color: '#555679',
  size: 10,
  textAlign: 'right',
};

CText.propsTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number,
  mt: PropTypes.number, //marginTop
  mb: PropTypes.number, //marginBottom
  ml: PropTypes.number, //marginLeft
  mr: PropTypes.number, //marginRight
  m: PropTypes.number, //margin
  p: PropTypes.number, //padding
  pl: PropTypes.number, //paddingLeft
  pr: PropTypes.number, //paddingRight
  pb: PropTypes.number, //paddingBottom
  pt: PropTypes.number, //paddingTop
  textAlign: PropTypes.string,
};

const styles = StyleSheet.create({
  normal: {
    fontFamily: 'IRANSansMobile(FaNum)',
  },
  bold: {
    fontFamily: 'IRANSansMobile(FaNum)_Bold',
  },
  light: {
    fontFamily: 'IRANSansMobile(FaNum)_Light',
  },
  medium: {
    fontFamily: 'IRANSansMobile(FaNum)_Medium',
  },
});

export default memo(CText);
