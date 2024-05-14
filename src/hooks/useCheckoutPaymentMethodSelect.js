import { useEffect, useReducer } from 'react';
import { setCheckoutPaymentMethod } from '../services';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'success':
      return {
        ...state,
        loading: false,
        error: '',
        isSuccess: true,
      };
    case 'callApi':
      return {
        ...state,
        loading: true,
        error: '',
        PaymentMethodSystemName: payload,
        isSuccess: false,
      };
    case 'error':
      return {
        ...state,
        loading: false,
        error: payload,
        PaymentMethodSystemName: null,
        isSuccess: false,
      };
    default:
      return state;
  }
};

const initialState = {
  loading: false,
  PaymentMethodSystemName: null,
  error: '',
  isSuccess: false,
};

const useCheckoutPaymentMethodSelect = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { loading, PaymentMethodSystemName, error, isSuccess } = state;

  const setCheckoutPaymentMethodApi = async () => {
    try {
      const data = await setCheckoutPaymentMethod({
        bank: PaymentMethodSystemName,
      });
      if (data.StatusCode === 200) {
        dispatch({ type: 'success', payload: data });
      } else {
        dispatch({ type: 'error', payload: 'خطایی رخ داده است!' });
      }
    } catch (exception) {
      dispatch({ type: 'error', payload: 'خطا در انتخاب آدرس!' });
    }
  };

  const callApi = ({ PaymentMethodSystemName }) => {
    dispatch({ type: 'callApi', payload: PaymentMethodSystemName });
  };

  useEffect(() => {
    if (loading) {
      setCheckoutPaymentMethodApi();
    }
  }, [loading]);

  return { loading, error, isSuccess, callApi, PaymentMethodSystemName };
};

export default useCheckoutPaymentMethodSelect;
