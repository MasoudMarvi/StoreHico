import { useEffect, useReducer } from 'react';
import { setCheckoutShippingAddressName } from '../services';

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
        Name: payload.Name,
        ShippingRateComputationMethodSystemName:
          payload.ShippingRateComputationMethodSystemName,
        isSuccess: false,
      };
    case 'error':
      return {
        ...state,
        loading: false,
        error: payload,
        Name: '',
        ShippingRateComputationMethodSystemName: '',
        isSuccess: false,
      };
    default:
      return state;
  }
};

const initialState = {
  loading: false,
  Name: '',
  ShippingRateComputationMethodSystemName: '',
  error: '',
  isSuccess: false,
};

const useCheckoutSelectShippingAddress = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    loading,
    Name,
    ShippingRateComputationMethodSystemName,
    error,
    isSuccess,
  } = state;

  const setCheckoutShippingAddressNameApi = async () => {
    try {
      const data = await setCheckoutShippingAddressName({
        Name,
        ShippingRateComputationMethodSystemName,
      });
      if (data.StatusCode === 200) {
        dispatch({ type: 'success', payload: data });
      } else {
        dispatch({ type: 'error', payload: 'خطایی رخ داده است!' });
      }
    } catch (exception) {
      dispatch({ type: 'error', payload: 'خطا در انتخاب آدرس!' });
    }
  };

  const callApi = ({ Name, ShippingRateComputationMethodSystemName }) => {
    dispatch({
      type: 'callApi',
      payload: { Name, ShippingRateComputationMethodSystemName },
    });
  };

  useEffect(() => {
    if (loading) {
      setCheckoutShippingAddressNameApi();
    }
  }, [loading]);

  return { loading, error, isSuccess, callApi };
};

export default useCheckoutSelectShippingAddress;
