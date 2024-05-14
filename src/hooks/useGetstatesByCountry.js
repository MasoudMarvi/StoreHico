import { useEffect, useReducer } from 'react';
import { getstatesbycountry } from '../services';
import Utils from '../utility/Utils';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'success':
      return {
        ...state,
        loading: false,
        error: '',
  
        isSuccess: true,
        countries: payload,
      };
    case 'error':
      return {
        ...state,
        loading: false,
        error: payload,

        isSuccess: false,
      };
    default:
      return state;
  }
};

const initialState = {
  countries: [],
  loading: false,
  error: '',

  isSuccess: false,
};

const useGetstatesByCountry = ({ Id = 106 } = {}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { countries, loading, error, isSuccess } = state;

  const getstatesByCountryApi = async () => {
    try {
      const {
        Data: {
          Result
        },
        StatusCode
      } = await getstatesbycountry({ Id });
      if (StatusCode === 200) {
        dispatch({ type: 'success', payload: Result });
        // Utils.showSnackbar({ message: 'اطلاعات با موفقیت بارگذاری شد!' });
      } else {
        dispatch({ type: 'error', payload: 'خطایی رخ داده است' });
        Utils.showSnackbar({
          message:
            Array.isArray(ErrorList) && ErrorList.length > 0
              ? ErrorList[0]
              : 'متاسفانه اطلاعات بارگذاری نشد!',
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

  useEffect(() => {
    getstatesByCountryApi();
  }, []);

  return { countries, loading, error, isSuccess };
};

export default useGetstatesByCountry;
