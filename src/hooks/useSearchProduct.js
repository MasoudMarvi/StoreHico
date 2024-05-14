import { useEffect, useReducer } from 'react';
import { searchProduct } from '../services';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'search':
      return {
        ...state,
        search: payload,
      };
    case 'isSearching':
      return {
        ...state,
        data: [],
        isSearching: true,
      };
    case 'success':
      return {
        ...state,
        data: payload,
        error: '',
        isSearching: false,
      };
    case 'error':
      return {
        ...state,
        isSearching: false,
        error: payload,
      };
    default:
      return state;
  }
};

const initialState = {
  data: [],
  error: '',
  isSearching: false,
  search: '',
};

const useSearchProduct = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { isSearching, data, error, search } = state;

  const searchProductApi = async () => {
    try {
      const {
        PriceRange,
        Products,
        TotalPages,
        AvailableSortOptions,
        SuccessMessage,
        StatusCode,
        ErrorList,
      } = await searchProduct(search);
      if (StatusCode === 200) {
        dispatch({ type: 'success', payload: Products });
      } else {
        dispatch({ type: 'error', payload: 'خطایی رخ داده است' });
      }
    } catch (exception) {
      dispatch({ type: 'error', payload: 'محصول مورد نظر یافت نشد!' });
    }
  };

  useEffect(() => {
    if (isSearching) {
      searchProductApi();
    }
  }, [isSearching]);

  return { dispatch, isSearching, data, error, search };
};

export default useSearchProduct;
