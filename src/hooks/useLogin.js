import { useNavigation } from '@react-navigation/native';
import { useEffect, useReducer } from 'react';
import { registerLogin } from '../services';
import Utils from '../utility/Utils';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'success':
      return {
        ...state,
        loading: false,
        error: '',
        mobile: '',
        isSuccess: true,
      };
    case 'callApi':
      return {
        ...state,
        loading: true,
        error: '',
        mobile: payload,
        isSuccess: false,
      };
    case 'error':
      return {
        ...state,
        loading: false,
        error: payload,
        mobile: '',
        isSuccess: false,
      };
    default:
      return state;
  }
};

const initialState = {
  loading: false,
  error: '',
  mobile: '',
  isSuccess: false,
};

const useLogin = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { navigate } = useNavigation();

  const { loading, error, mobile, isSuccess } = state;

  const loginApi = async () => {
    try {
      const { ErrorList } = await registerLogin({
        mobile,
      });
      if (Array.isArray(ErrorList) && ErrorList.length === 0) {
        navigate('loginConfirm', { mobile });
        dispatch({ type: 'success' });
        Utils.showSnackbar({
          message: 'کد تایید برای شما ارسال شد!',
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

  const callApi = ({ mobile }) => {
    dispatch({ type: 'callApi', payload: mobile });
  };

  useEffect(() => {
    if (mobile !== '') {
      loginApi();
    }
  }, [mobile]);

  return { loading, error, callApi };
};

export default useLogin;
