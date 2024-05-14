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

const useAddress = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { loading, data, error } = state;

  const getAddressApi = async () => {
    try {
      const {
        ErrorList,
        ExistingAddresses,
        StatusCode,
        SuccessMessage,
      } = await getCheckoutBillingAddress();
      if (StatusCode === 200) {
        dispatch({ type: 'success', payload: ExistingAddresses });
      } else {
        dispatch({ type: 'error', payload: 'خطایی رخ داده است' });
      }
    } catch (exception) {
      dispatch({ type: 'error', payload: 'آدرسی ثبت نشده است!' });
    }
  };

  useEffect(() => {
    if (loading) {
      getAddressApi();
    }
  }, [loading]);

  return { loading, data, error, dispatch };
};

export default useAddress;
