import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors } from '../utility/Colors';

const LoadingComponent = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={Colors.o2market} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingComponent;
