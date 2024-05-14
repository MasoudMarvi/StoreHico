import { useEffect, useReducer } from 'react';
import { updateCartItem } from '../services';
import Utils from '../utility/Utils';
import useSetBasketCount from './useSetBasketCount';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'success':
      return {
        ...state,
        loading: false,
        error: '',
        Id: 0,
        productId: 0,
        count: 0,
        isSuccess: true,
      };
    case 'callApi':
      return {
        ...state,
        loading: true,
        error: '',
        Id: payload.Id,
        productId: payload.ProductId,
        count: payload.count,
        isSuccess: false,
      };
    case 'error':
      return {
        ...state,
        loading: false,
        error: payload,
        Id: 0,
        productId: 0,
        count: 0,
        isSuccess: false,
      };
    default:
      return state;
  }
};

const initialState = {
  loading: false,
  error: '',
  Id: 0,
  productId: 0,
  count: 0,
  isSuccess: false,
};

const useUpdateCart = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setCount = useSetBasketCount();

  const { loading, error, Id, productId, count, isSuccess } = state;

  const updateCartItemApi = async () => {
    try {
      const {
        Success,
        ForceRedirect,
        Count,
        SuccessMessage,
        StatusCode,
        ErrorList,
      } = await updateCartItem({ ProductId: productId, Count: count,CartItemId:Id });
      if (StatusCode === 200) {
        dispatch({ type: 'success' });
        setCount(Count);
        Utils.showSnackbar({ message: 'بروز شد!' });
      } else {
        dispatch({ type: 'error', payload: 'خطایی رخ داده است!' });
        Utils.showSnackbar({
          message:
            Array.isArray(ErrorList) && ErrorList.length > 0
              ? ErrorList[0]
              : 'خطایی رخ داده است!',
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

  const callApi = ({ ProductId, count,Id }) => {
    dispatch({ type: 'callApi', payload: { ProductId, count,Id } });
  };

  useEffect(() => {
    if (productId !== 0) {
      updateCartItemApi();
    }
  }, [productId]);

  return { loading, error, callApi, isSuccess };
};

export default useUpdateCart;
