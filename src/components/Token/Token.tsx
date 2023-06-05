import { FormEvent, useCallback } from 'react';
import { API_BASE_URL } from '../../global';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { setHasAccess } from '../../features/login';

const Token = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onLogin = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      fetch(`${API_BASE_URL}/token`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: e.currentTarget['token'].value
        })
      }).then((res) => {
        if (res.status !== 200) {
          alert('Invalid token');
          return;
        }

        dispatch(setHasAccess);
        navigate('/');
      });
    },
    [dispatch, navigate]
  );

  return (
    <>
      <Typography variant="h3">Token Verification</Typography>
      <br />
      <form onSubmit={onLogin}>
        <div style={{ display: 'flex' }}>
          <TextField
            id="token"
            label="Token"
            InputLabelProps={{ shrink: true }}
            placeholder="Enter token here"
          />
          &nbsp;
          <Button variant="contained" type="submit">
            Verify
          </Button>
        </div>
      </form>
      <Typography>
        Don't have a token? Click <a href="https://doubleknot.com">here</a>
      </Typography>
    </>
  );
};

export default Token;
