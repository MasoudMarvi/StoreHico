import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASKET_COUNT } from '../utility/Constants';

export const BasketContext = createContext();
export const BasketContextSetCount = createContext();

function BasketProvider({ children }) {
  const [count, setCount] = useState(0);

  const getBasketCountFromStorage = async () => {
    const basketCount = await AsyncStorage.getItem(BASKET_COUNT);
    if (basketCount) {
      setCount(JSON.parse(basketCount));
    }
  };

  useEffect(() => {
    getBasketCountFromStorage();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(BASKET_COUNT, JSON.stringify(count));
  }, [count]);

  return (
    <BasketContext.Provider value={count}>
      <BasketContextSetCount.Provider value={setCount}>
        {children}
      </BasketContextSetCount.Provider>
    </BasketContext.Provider>
  );
}

export default BasketProvider;
