import { useEffect, useReducer } from 'react';
import { setCheckoutSaveAddress } from '../services';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'success':
      return {
        ...state,
        loading: false,
        error: '',
        address: null,
        isSuccess: true,
      };
    case 'callApi':
      return {
        ...state,
        loading: true,
        error: '',
        address: payload,
        isSuccess: false,
      };
    case 'error':
      return {
        ...state,
        loading: false,
        error: payload,
        address: null,
        isSuccess: false,
      };
    default:
      return state;
  }
};

const initialState = {
  loading: false,
  address: null,
  error: '',
  isSuccess: false,
};

const useCheckoutSaveBillingAddress = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { loading, address, error, isSuccess } = state;

  const setCheckoutSaveAddressApi = async () => {
    try {
      const data = await setCheckoutSaveAddress({ address });

      if (data.StatusCode === 200) {
        dispatch({ type: 'success', payload: data });
      } else {
        dispatch({
          type: 'error',
          payload: 'لطفا تمامی فیلدهای مورد نیاز را پر کنید!',
        });
      }
    } catch (exception) {
      dispatch({ type: 'error', payload: 'خطا در ثبت آدرس!' });
    }
  };

  const callApi = ({ data }) => {
    dispatch({ type: 'callApi', payload: data });
  };

  useEffect(() => {
    if (loading) {
      setCheckoutSaveAddressApi();
    }
  }, [loading]);

  return { loading, error, isSuccess, callApi };
};

export default useCheckoutSaveBillingAddress;
