import { StackActions, useNavigation } from '@react-navigation/native';
import { useEffect, useReducer } from 'react';
import { Linking } from 'react-native';
import { checkoutComplete } from '../services';
import Utils from '../utility/Utils';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'success':
      return {
        ...state,
        data: payload,
        loading: false,
        error: '',
      };
    case 'loading':
      return {
        ...state,
        loading: true,
        error: '',
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
  data: '',
  error: '',
};

const useCheckoutComplete = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigation = useNavigation();

  const { loading, data, error } = state;

  const checkoutCompleteApi = async () => {
    try {
      const { OrderId, StatusCode } = await checkoutComplete();
      if (StatusCode === 200) {
        const url = `https://MivSmart.com/api/checkout/OpcCompleteRedirectionPayment?orderid=${OrderId}`;
        const canOpen = await Linking.canOpenURL(url);
        if (canOpen) {
          dispatch({ type: 'success', payload: OrderId });
          Linking.openURL(url);
        }

        // navigation.dispatch(StackActions.replace('paypal', { site: site }));
        navigation.dispatch(StackActions.replace('orders'));
      } else {
        dispatch({ type: 'error', payload: 'خطایی رخ داده است' });
        Utils.showSnackbar({
          message: 'خطا در ثبت نهایی',
          type: 'error',
        });
      }
    } catch (exception) {
      dispatch({ type: 'error', payload: 'خطا در ثبت نهایی' });
      Utils.showSnackbar({
        message: 'سبد خرید شما خالی است',
        type: 'error',
      });
    }
  };

  useEffect(() => {
    if (loading) {
      checkoutCompleteApi();
    }
  }, [loading]);

  return { loading, dispatch };
};

export default useCheckoutComplete;
