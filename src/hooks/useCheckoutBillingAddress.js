import { useEffect, useReducer } from 'react';
import { getCheckoutBillingAddress } from '../services';

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

const useCheckoutBillingAddress = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { loading, data, error } = state;

  const getCheckoutBillingAddressApi = async () => {
    try {
      const {
        ErrorList,
        ExistingAddresses,
        StatusCode,
        SuccessMessage,
      } = await getCheckoutBillingAddress();
      if (StatusCode === 200) {
        const tempAddress = {
          Id: 0,
          City: '',
          Address1: 'آدرس جدید',
        };

        const address = [...ExistingAddresses];

        address.unshift(tempAddress);

        dispatch({
          type: 'success',
          payload: address,
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
      getCheckoutBillingAddressApi();
    }
  }, [loading]);

  return { loading, data, error, dispatch };
};

export default useCheckoutBillingAddress;
