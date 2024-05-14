import { useReducer, useEffect } from 'react';
import { getWishList } from '../services';

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
        error: '',
        data: [],
        loading: true,
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

const useWishList = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { loading, data, error } = state;

  const getWishListApi = async () => {
    try {
      const { StatusCode, Items } = await getWishList();
      if (StatusCode === 200) {
        dispatch({
          type: 'success',
          payload: Items,
        });
      } else {
        dispatch({ type: 'error', payload: 'خطایی رخ داده است!' });
      }
    } catch (exception) {
      dispatch({
        type: 'error',
        payload: 'لیست مورد علاقه مندی شما خالی است!',
      });
    }
  };

  useEffect(() => {
    if (loading) {
      getWishListApi();
    }
  }, [loading]);

  return { dispatch, loading, data, error };
};

export default useWishList;
