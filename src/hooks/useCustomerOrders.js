import { useEffect, useReducer } from 'react';
import { getCustomerOrders } from '../services';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'success':
      return {
        ...state,
        data: payload,
        loading: false,
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
  loading: true,
  data: [],
  error: '',
};

const useCustomerOrders = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { loading, data, error } = state;

  const getCustomerOrdersApi = async () => {
    try {
      const {
        Orders,
        CancelRecurringPaymentErrors,
        ErrorList,
        RecurringOrders,
        StatusCode,
        SuccessMessage,
      } = await getCustomerOrders();
      if (StatusCode === 200) {
        dispatch({ type: 'success', payload: Orders });
      } else {
        dispatch({ type: 'error', payload: 'خطایی رخ داده است' });
      }
    } catch (exception) {
      dispatch({ type: 'error', payload: 'تاکنون سفارشی ثبت نکرده اید!' });
    }
  };

  useEffect(() => {
    getCustomerOrdersApi();
    return () => {};
  }, []);

  return { loading, data, error, getCustomerOrdersApi };
};

export default useCustomerOrders;
