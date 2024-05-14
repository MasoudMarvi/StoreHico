import { useEffect, useReducer } from 'react';
import { getCustomerInfo } from '../services';

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
  data: {
    Gender: 'M',
    LastName: '',
    FirstName: '',
    DateOfBirthDay: '',
    DateOfBirthMonth: '',
    DateOfBirthYear: '',
    Email: '',
    Phone: '',
  },
  error: '',
};

const useCustomerInfo = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { loading, data, error } = state;

  const getCustomerInfoApi = async () => {
    try {
      const data = await getCustomerInfo();
      //console.log(data);
      dispatch({ type: 'success', payload: data });
    } catch (exception) {
      dispatch({ type: 'error', payload: 'ارتباط دستگاه خود را بررسی نمائید' });
    }
  };

  useEffect(() => {
    getCustomerInfoApi();
    return () => {};
  }, []);

  return { loading, data, error };
};

export default useCustomerInfo;
