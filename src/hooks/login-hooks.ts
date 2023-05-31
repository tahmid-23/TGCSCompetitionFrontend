import { useEffect, useState } from 'react';
import { checkLogin } from '../api/api';
import { useAppDispatch } from './redux-hooks';
import {
  setAdmin,
  setHasAccess,
  setNotAdmin,
  setNotHasAccess
} from '../features/login';

export const useRefreshLoginState = () => {
  const [complete, setComplete] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    checkLogin().then((loginState) => {
      if (loginState.admin) {
        dispatch(setAdmin());
      } else {
        dispatch(setNotAdmin());
      }
      if (loginState.hasAccess) {
        dispatch(setHasAccess());
      } else {
        dispatch(setNotHasAccess());
      }

      setComplete(true);
    });
  }, [complete, dispatch]);

  return complete;
};
