import { useEffect, useReducer } from 'react';
import { deleteAddress } from '../services';
import Utils from '../utility/Utils';

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

const useDeleteAddress = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { loading, error, id, isSuccess } = state;

  const deleteAddressApi = async () => {
    try {
      const {
        Success,
        ForceRedirect,
        Count,
        SuccessMessage,
        StatusCode,
        ErrorList,
      } = await deleteAddress({ Id: id });
      if (StatusCode === 200) {
        dispatch({ type: 'success' });
        Utils.showSnackbar({ message: 'آدرس حذف شد!' });
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
      deleteAddressApi();
    }
  }, [id]);

  return { loading, error, isSuccess, callApi };
};

export default useDeleteAddress;
