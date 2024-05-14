import React, { useContext } from 'react';
import { BasketContext } from '../context/BasketProvider';

function useBasketCount() {
  return useContext(BasketContext);
}

export default useBasketCount;
