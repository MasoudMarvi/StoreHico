import { useEffect, useReducer } from 'react';
import { getHomeCategories } from '../services';

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

const useHomeCategories = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { loading, data, error } = state;

  const getHomeCategoriesApi = async () => {
    try {
      const {
        Data,
        ErrorList,
        IsEnabled,
        StatusCode,
        SuccessMessage,
      } = await getHomeCategories();
      if (StatusCode === 200) {
        dispatch({ type: 'success', payload: Data });
      } else {
        dispatch({ type: 'error', payload: 'خطایی رخ داده است' });
      }
    } catch (exception) {
      dispatch({ type: 'error', payload: 'ارتباط دستگاه خود را بررسی نمائید' });
    }
  };

  useEffect(() => {
    getHomeCategoriesApi();
    return () => {};
  }, []);

  return { loading, data, error };
};

export default useHomeCategories;
