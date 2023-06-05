import { GoogleLogin } from '@react-oauth/google';
import { API_BASE_URL } from '../../global';
import { useAppDispatch } from '../../hooks/redux-hooks';
import {
  setAdmin,
  setHasAccess,
  setNotAdmin,
  setNotHasAccess
} from '../../features/login';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Typography>
        Please log in to your TGCS email account. You will then be prompted for
        your authentication token. The database remains accessible for 24 hours
        after entering the token.
      </Typography>
      <GoogleLogin
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onSuccess={(response) => {
          fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              credential: response.credential
            })
          })
            .then((res) => res.json())
            .then((loginData) => {
              if (loginData.admin) {
                dispatch(setAdmin);
              } else {
                dispatch(setNotAdmin);
              }

              if (loginData.hasAccess) {
                dispatch(setHasAccess);
              } else {
                dispatch(setNotHasAccess);
              }

              if (loginData.admin) {
                navigate('/admin');
              } else {
                navigate('/token');
              }
            });
        }}
      />
    </>
  );
};

export default Login;
