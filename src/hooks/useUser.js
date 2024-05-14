import { useContext } from 'react';
import { LoginContext } from '../context/LoginProvider';

function useUser() {
  return useContext(LoginContext);
}

export default useUser;
