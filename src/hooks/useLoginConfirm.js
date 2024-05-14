import { StackActions, useNavigation } from '@react-navigation/native';
import { useEffect, useReducer } from 'react';
import { confirmRegisterLogin } from '../services';
import Utils from '../utility/Utils';
import useSetUser from './useSetUser';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'success':
      return {
        ...state,
        loading: false,
        error: '',
        mobile: '',
        code: '',
        isSuccess: true,
      };
    case 'callApi':
      return {
        ...state,
        loading: true,
        error: '',
        mobile: payload.mobile,
        code: payload.code,
        isSuccess: false,
      };
    case 'error':
      return {
        ...state,
        loading: false,
        error: payload,
        mobile: '',
        code: '',
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
  code: '',
  isSuccess: false,
};

const useLoginConfirm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setUser = useSetUser();

  const navigation = useNavigation();

  const { loading, error, mobile, code, isSuccess } = state;

  const loginConfirmApi = async () => {
    try {
      const {
        FirstName,
        LastName,
        Email,
        UserName,
        CustomerId,
        Token,
        ErrorList,
      } = await confirmRegisterLogin({
        mobile,
        code,
      });
      if (Array.isArray(ErrorList) && ErrorList.length === 0) {
        dispatch({ type: 'success' });
        setUser({ FirstName, LastName, Email, UserName, CustomerId, Token });
        navigation.dispatch(StackActions.replace('dashboard'));
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

  const callApi = ({ mobile, code }) => {
    dispatch({ type: 'callApi', payload: { mobile, code } });
  };

  useEffect(() => {
    if (mobile !== '' && code !== '') {
      loginConfirmApi();
    }
  }, [mobile, code]);

  return { loading, error, callApi };
};

export default useLoginConfirm;
