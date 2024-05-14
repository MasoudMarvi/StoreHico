import { useEffect, useReducer } from 'react';
import { addToWishList } from '../services';
import Utils from '../utility/Utils';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'success':
      return {
        ...state,
        loading: false,
        error: '',
        id: 0,
      };
    case 'callApi':
      return {
        ...state,
        loading: true,
        error: '',
        id: payload,
      };
    case 'error':
      return {
        ...state,
        loading: false,
        error: payload,
        id: 0,
      };
    default:
      return state;
  }
};

const initialState = {
  loading: false,
  error: '',
  id: 0,
};

const useAddToWishList = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { loading, error, id } = state;

  const addToWishListApi = async () => {
    try {
      const {
        Success,
        ForceRedirect,
        Count,
        SuccessMessage,
        StatusCode,
        ErrorList,
      } = await addToWishList({ Id: id });
      if (StatusCode === 200) {
        dispatch({ type: 'success' });
        Utils.showSnackbar({ message: 'به علاقه مندی اضافه شد!' });
      } else {
        dispatch({ type: 'error', payload: 'خطایی رخ داده است!' });
        Utils.showSnackbar({
          message:
            Array.isArray(ErrorList) && ErrorList.length > 0
              ? ErrorList[0]
              : 'به علاقه مندی اضافه نشد!',
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
      addToWishListApi();
    }
  }, [id]);

  return { loading, error, callApi };
};

export default useAddToWishList;
