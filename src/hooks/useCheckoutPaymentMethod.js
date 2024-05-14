import { useEffect, useReducer } from 'react';
import { getCheckoutPaymentMethod } from '../services';

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

const useCheckoutPaymentMethod = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { loading, data, error } = state;

  const getCheckoutPaymentMethodApi = async () => {
    try {
      const {
        ErrorList,
        PaymentMethods,
        StatusCode,
        SuccessMessage,
      } = await getCheckoutPaymentMethod();
      if (StatusCode === 200) {
        dispatch({
          type: 'success',
          payload: PaymentMethods,
        });
      } else {
        dispatch({ type: 'error', payload: 'خطایی رخ داده است' });
      }
    } catch (exception) {
      dispatch({ type: 'error', payload: 'درگاه بانکی ثبت نشده است!' });
    }
  };

  useEffect(() => {
    if (loading) {
      getCheckoutPaymentMethodApi();
    }
  }, [loading]);

  return { loading, data, error, dispatch };
};

export default useCheckoutPaymentMethod;
