import { ChangeEvent, useCallback, useState } from 'react';
import { API_BASE_URL } from '../../global';
import { useAppSelector } from '../../hooks/redux-hooks';
import { selectLogin } from '../../features/login';
import { useNavigate } from 'react-router-dom';
import { useRefreshLoginState } from '../../hooks/login-hooks';
import {
  Button,
  Divider,
  IconButton,
  TextField,
  Typography
} from '@mui/material';
import styles from './Admin.module.css';
import { ContentCopy } from '@mui/icons-material';

function genToken(length: number) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
    counter += 1;
  }
  return result;
}

const Admin = () => {
  const loginState = useAppSelector(selectLogin);
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>();
  const [displayedToken, setDisplayedToken] = useState<string>();
  const refreshed = useRefreshLoginState();

  const onTokenGen = useCallback(async () => {
    const token = genToken(16);
    const data = {
      email: `${email}@giftedchildsociety.org`,
      token: token
    };
    const options: RequestInit = {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    await fetch(`${API_BASE_URL}/create-user`, options).then((res) => {
      if (res.status === 200) {
        setDisplayedToken(token);
      } else {
        alert('Something went wrong!\nPlease regenerate token!');
        console.error(res.status);
      }
    });
  }, [email]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setEmail(e.currentTarget.value);
    },
    [setEmail]
  );

  const onCopy = useCallback(() => {
    if (displayedToken) {
      navigator.clipboard.writeText(displayedToken);
    }
  }, [displayedToken]);

  if (!refreshed) {
    return <></>;
  }

  if (!loginState.admin) {
    navigate('/');
    return <></>;
  }

  return (
    <>
      <Typography variant="h3">Admin Only Interface</Typography>
      <Divider />
      <br />
      <Typography variant="h5">Token Generator</Typography>
      <div className={styles.emailWrapper}>
        <TextField
          id="email"
          label="Email"
          variant="standard"
          onChange={onChange}
        />
        <span className={styles.emailEnd}>@giftedchildsociety.org</span>
      </div>
      <br />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography>Token: {displayedToken}</Typography>
        &nbsp;
        <IconButton
          sx={{ visibility: displayedToken ? 'visible' : 'hidden' }}
          onClick={onCopy}
        >
          <ContentCopy />
        </IconButton>
      </div>
      <Button onClick={onTokenGen} variant="contained">
        Generate Token
      </Button>
    </>
  );
};

export default Admin;
