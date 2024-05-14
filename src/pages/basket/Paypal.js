import { useRoute } from '@react-navigation/native';
import React from 'react';
import { WebView } from 'react-native-webview';

const Paypal = () => {
  const { params } = useRoute();

  return <WebView originWhitelist={['*']} source={{ html: params?.site }} />;
};

export default Paypal;
