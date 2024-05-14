import { useContext } from 'react';
import { LoginContextSet } from '../context/LoginProvider';

function useSetUser() {
  return useContext(LoginContextSet);
}

export default useSetUser;
