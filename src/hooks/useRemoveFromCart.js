import { useEffect, useReducer } from 'react';
import { removeFromCart } from '../services';
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
        isSuccess: true,
      };
    case 'callApi':
      return {
        ...state,
        loading: true,
        error: '',
        id: payload,
        isSuccess: false,
      };
    case 'error':
      return {
        ...state,
        loading: false,
        error: payload,
        id: 0,
        isSuccess: false,
      };
    default:
      return state;
  }
};

const initialState = {
  loading: false,
  error: '',
  id: 0,
  isSuccess: false,
};

const useRemoveFromCart = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setCount = useSetBasketCount();

  const { loading, error, id, isSuccess } = state;

  const removeFromCartApi = async () => {
    try {
      const {
        Success,
        ForceRedirect,
        Count,
        SuccessMessage,
        StatusCode,
        ErrorList,
      } = await removeFromCart({ Id: id });
      if (StatusCode === 200) {
        dispatch({ type: 'success' });
        setCount(Count);
        Utils.showSnackbar({ message: 'از سبد خرید حذف شد!' });
      } else {
        dispatch({ type: 'error', payload: 'خطایی رخ داده است' });
        Utils.showSnackbar({
          message:
            Array.isArray(ErrorList) && ErrorList.length > 0
              ? ErrorList[0]
              : 'متاسفانه حذف نشد!',
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
      removeFromCartApi();
    }
  }, [id]);

  return { loading, error, isSuccess, callApi };
};

export default useRemoveFromCart;
