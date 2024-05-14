import { useEffect, useReducer } from 'react';
import { editAddress } from '../services';

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

const useEditAddress = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { loading, address, error, isSuccess } = state;

  const editAddressApi = async () => {
    try {
      const data = await editAddress({ address });
      if (data.StatusCode === 200) {
        dispatch({ type: 'success', payload: data });
      } else {
        dispatch({ type: 'error', payload: 'خطایی رخ داده است!' });
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
      editAddressApi();
    }
  }, [loading]);

  return { loading, error, isSuccess, callApi };
};

export default useEditAddress;
