import { useEffect, useReducer } from 'react';
import { addToCart } from '../services';
import Utils from '../utility/Utils';
import useSetBasketCount from './useSetBasketCount';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'success':
      return {
        ...state,
        loading: false,
        error: '',
        id: 0,
      };
    case 'callApi':
      return {
        ...state,
        loading: true,
        error: '',
        id: payload,
      };
    case 'error':
      return {
        ...state,
        loading: false,
        error: payload,
        id: 0,
      };
    default:
      return state;
  }
};

const initialState = {
  loading: false,
  error: '',
  id: 0,
};

const useAddToCart = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setCount = useSetBasketCount();

  const { loading, error, id } = state;

  const addToCartApi = async () => {
    try {
      const {
        Success,
        ForceRedirect,
        Count,
        SuccessMessage,
        StatusCode,
        ErrorList,
      } = await addToCart({ Id: id });
      if (StatusCode === 200) {
        dispatch({ type: 'success' });
        setCount(Count);
        Utils.showSnackbar({ message: 'به سبد خرید اضافه شد!' });
      } else {
        dispatch({ type: 'error', payload: 'خطایی رخ داده است' });
        Utils.showSnackbar({
          message:
            Array.isArray(ErrorList) && ErrorList.length > 0
              ? ErrorList[0]
              : 'به سبد خرید اضافه نشد!',
          type: 'error',
        });
      }
    } catch (exception) {
      dispatch({
        type: 'error',
        payload: 'ارتباط دستگاه خود را بررسی نمائید!',
      });
      Utils.showSnackbar({
        message: 'ارتباط دستگاه خود را بررسی نمائید!',
        type: 'error',
      });
    }
  };

  const callApi = ({ Id }) => {
    dispatch({ type: 'callApi', payload: Id });
  };

  useEffect(() => {
    if (id !== 0) {
      addToCartApi();
    }
  }, [id]);

  return { loading, error, callApi };
};

export default useAddToCart;
