import { useEffect, useReducer } from 'react';
import { getProductByCategory } from '../services';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'success':
      return {
        ...state,
        data: payload.Products,
        name: payload.Name,
        totalPages: payload.TotalPages,
        loading: false,
        error: '',
      };
    case 'pagination':
      return {
        ...state,
        page: payload,
      };
    case 'loading':
      return {
        ...state,
        loading: payload,
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
  loading: true,
  data: [],
  name: '',
  error: '',
  page: 1,
  totalPages: 0,
};

const useProductByCategory = ({ Id }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { loading, data, error, name, page, totalPages } = state;

  const getProductByCategoryApi = async ({ Id, pageNumber }) => {
    try {
      const {
        Name,
        Products,
        ErrorList,
        IsEnabled,
        StatusCode,
        SuccessMessage,
        TotalPages,
      } = await getProductByCategory({ Id, pageNumber });
      if (StatusCode === 200) {
        dispatch({
          type: 'success',
          payload: { Products: [...data, ...Products], Name, TotalPages },
        });
      } else {
        dispatch({ type: 'error', payload: 'خطایی رخ داده است' });
      }
    } catch (exception) {
      dispatch({ type: 'error', payload: 'ارتباط دستگاه خود را بررسی نمائید' });
    }
  };

  useEffect(() => {
    dispatch({ type: 'loading', payload: true });
  }, [Id]);

  useEffect(() => {
    if (page > 1) {
      getProductByCategoryApi({ Id, pageNumber: page });
    }
  }, [page]);

  useEffect(() => {
    if (loading) {
      getProductByCategoryApi({ Id, pageNumber: page });
    }
  }, [loading]);

  return { loading, data, error, name, totalPages, page, dispatch };
};

export default useProductByCategory;
