import { useEffect, useReducer } from 'react';
import { getShoppingCart } from '../services';
import useSetBasketCount from './useSetBasketCount';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'success':
      return {
        ...state,
        data: payload.Items,
        detail: payload.OrderTotalResponseModel,
        loading: false,
        error: '',
      };
      case 'callApi':
      return {
        ...state,
        loading: true,
        error: '',
        isSuccess: false,
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
  detail: {
    OrderTotal: '',
    OrderTotalDiscount: '',
    SubTotal: '',
    SubTotalDiscount: '',
  },
  error: '',
};

const useShoppingCart = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setCount = useSetBasketCount();

  const { loading, data, error, detail } = state;

  const getShoppingCartApi = async () => {
    try {
      const {
        StatusCode,
        Items,
        OrderTotalResponseModel,
      } = await getShoppingCart();
      if (StatusCode === 200) {
        dispatch({
          type: 'success',
          payload: { Items, OrderTotalResponseModel },
        });
        setCount(Array.isArray(Items) ? Items.length : 0);
      } else {
        dispatch({ type: 'error', payload: 'خطایی رخ داده است' });
      }
    } catch (exception) {
      dispatch({ type: 'error', payload: 'سبد خرید شما خالی است!' });
    }
  };
  const callApi = () => {
    //dispatch({ type: 'callApi'  });
    dispatch({ type: 'loading' })
  };


  useEffect(() => {
    console.log(detail);
    if (loading) {
      getShoppingCartApi();
    }
  }, [loading]);

  return { dispatch, loading, data, error, detail,callApi };
};

export default useShoppingCart;
