import { useEffect, useReducer } from 'react';
import { updateCustomerInfo } from '../services';
import Utils from '../utility/Utils';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'success':
      return {
        ...state,
        loading: false,
        error: '',
        user: null,
        isSuccess: true,
      };
    case 'callApi':
      return {
        ...state,
        loading: true,
        error: '',
        user: payload,
        isSuccess: false,
      };
    case 'error':
      return {
        ...state,
        loading: false,
        error: payload,
        user: null,
        isSuccess: false,
      };
    default:
      return state;
  }
};

const initialState = {
  loading: false,
  user: null,
  error: '',
  isSuccess: false,
};

const useUpdateCustomerInfo = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { loading, user, error, isSuccess } = state;

  const updateCustomerInfoApi = async () => {
    try {
      const data = await updateCustomerInfo({ user });
      if (data.StatusCode === 200) {
        dispatch({ type: 'success', payload: data });
        Utils.showSnackbar({
          message: 'ویرایش با موفقیت انجام شد!',
          type: 'success',
        });
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

  const callApi = ({ data }) => {
    dispatch({ type: 'callApi', payload: data });
  };

  useEffect(() => {
    if (loading) {
      updateCustomerInfoApi();
    }
  }, [loading]);

  return { loading, error, isSuccess, callApi };
};

export default useUpdateCustomerInfo;
