import { useEffect, useReducer } from 'react';
import { getThemeSettings } from '../services';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'success':
      return {
        ...state,
        loading: false,
        data: payload,
        error: ''
      };
    case 'error':
      return {
        ...state,
        loading: false,
        error: payload
      };
    default:
      return state;
  }
};

const initialState = {
  loading: false,
  error: '',
  data: []
};

const useThemeSettings = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { loading, error, data } = state;

  const themeSettingsApi = async () => {
    try {
      const {   Data,
        ErrorList,
        IsEnabled,
        StatusCode,
        SuccessMessage } = await getThemeSettings();
        if (StatusCode === 200) {
          dispatch({ type: 'success', payload: Data });
        } else {
          dispatch({ type: 'error', payload: 'خطایی رخ داده است' });
        }
      } catch (exception) {
        dispatch({ type: 'error', payload: 'ارتباط دستگاه خود را بررسی نمائید' });
      }
  };


  useEffect(() => {
    
    themeSettingsApi();
   
  }, []);

  return { loading, data, error };
};

export default useThemeSettings;
