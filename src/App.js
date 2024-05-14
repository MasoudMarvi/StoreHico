import React from 'react';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import BasketProvider from './context/BasketProvider';
import LoginProvider from './context/LoginProvider';
import Router from './Router';
import { Colors } from './utility/Colors';
import { theme } from './utility/theme';

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <LoginProvider>
        <BasketProvider>
          <StatusBar backgroundColor={Colors.o2market} />
          <Router />
        </BasketProvider>
      </LoginProvider>
    </PaperProvider>
  );
};

export default App;
