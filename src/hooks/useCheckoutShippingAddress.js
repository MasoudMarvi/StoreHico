import { useEffect, useReducer } from 'react';
import {
  getCheckoutBillingAddress,
  getCheckoutShippingAddress,
} from '../services';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'success':
      return {
        ...state,
        data: payload,
        loading: false,
        error: '',
      };
    case 'loading':
      return {
        ...state,
        loading: true,
        error: '',
      };
    case 'error':
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

const initialState = {
  loading: false,
  data: [],
  error: '',
};

const useCheckoutShippingAddress = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { loading, data, error } = state;

  const getCheckoutShippingAddressApi = async () => {
    try {
      const { ErrorList, ShippingMethods, StatusCode, SuccessMessage } =
        await getCheckoutShippingAddress();
      if (StatusCode === 200) {
        dispatch({
          type: 'success',
          payload: ShippingMethods,
        });
      } else {
        dispatch({ type: 'error', payload: 'خطایی رخ داده است' });
      }
    } catch (exception) {
      dispatch({ type: 'error', payload: 'آدرسی ثبت نشده است!' });
    }
  };

  useEffect(() => {
    if (loading) {
      getCheckoutShippingAddressApi();
    }
  }, [loading]);

  return { loading, data, error, dispatch };
};

export default useCheckoutShippingAddress;
