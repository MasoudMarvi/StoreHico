import { useEffect, useReducer } from 'react';
import { setCheckoutSaveAddressId } from '../services';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'success':
      return {
        ...state,
        loading: false,
        error: '',
        isSuccess: true,
      };
    case 'callApi':
      return {
        ...state,
        loading: true,
        error: '',
        Id: payload,
        isSuccess: false,
      };
    case 'error':
      return {
        ...state,
        loading: false,
        error: payload,
        Id: null,
        isSuccess: false,
      };
    default:
      return state;
  }
};

const initialState = {
  loading: false,
  Id: null,
  error: '',
  isSuccess: false,
};

const useCheckoutSelectBillingAddress = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { loading, Id, error, isSuccess } = state;

  const setCheckoutSaveAddressIdApi = async () => {
    try {
      const data = await setCheckoutSaveAddressId({ Id });
      if (data.StatusCode === 200) {
        dispatch({ type: 'success', payload: data });
      } else {
        dispatch({ type: 'error', payload: 'خطایی رخ داده است!' });
      }
    } catch (exception) {
      dispatch({ type: 'error', payload: 'خطا در انتخاب آدرس!' });
    }
  };

  const callApi = ({ Id }) => {
    dispatch({ type: 'callApi', payload: Id });
  };

  useEffect(() => {
    if (loading) {
      setCheckoutSaveAddressIdApi();
    }
  }, [loading]);

  return { loading, error, isSuccess, callApi, Id };
};

export default useCheckoutSelectBillingAddress;
