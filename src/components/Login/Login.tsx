import { GoogleLogin } from '@react-oauth/google';
import { API_BASE_URL } from '../../global';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { setAdmin, setHasAccess, setNotAdmin } from '../../features/login';
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
            .then((res) => {
              if (res.status === 200) {
                res.json().then((loginData) => {
                  if (loginData.admin) {
                    dispatch(setHasAccess());
                    dispatch(setAdmin());
                  } else {
                    dispatch(setNotAdmin());
                  }

                  if (loginData.admin) {
                    navigate('/admin');
                  } else {
                    navigate('/token');
                  }
                });
              } else {
                alert('Something went wrong!');
              }
            })
            .catch((err) => {
              console.error(err);
              alert('Something went wrong!');
            });
        }}
      />
    </>
  );
};

export default Login;
