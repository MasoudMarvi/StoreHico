import React, { memo } from 'react';
import { View } from 'react-native';
import { Colors } from '../utility/Colors';

function VerticalDivider({
  color = Colors.grayLight,
  marginTop = 0,
  marginBottom = 0,
  marginLeft = 0,
  marginRight = 0,
  width = 1,
  height = '60%',
}) {
  return (
    <View
      style={{
        backgroundColor: color,
        marginTop: marginTop,
        marginBottom: marginBottom,
        marginLeft: marginLeft,
        marginRight: marginRight,
        width: width,
        height: height,
        alignSelf: 'center',
      }}
    />
  );
}

export default memo(VerticalDivider);
