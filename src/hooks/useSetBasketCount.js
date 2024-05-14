import React, { useContext } from 'react';
import { BasketContextSetCount } from '../context/BasketProvider';

function useSetBasketCount() {
  return useContext(BasketContextSetCount);
}

export default useSetBasketCount;
