import { FormEvent, useCallback } from 'react';
import { IP_ADDRESS } from '../../global';
import { useNavigate } from 'react-router-dom';

const Token = () => {
  const navigate = useNavigate();

  const onLogin = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      fetch(`${IP_ADDRESS}/token`, {
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

        navigate('/');
      });
    },
    [navigate]
  );

  return (
    <>
      <h1>Token Verification</h1>
      <p>Signed in as </p>
      <form onSubmit={onLogin}>
        <label htmlFor="token">Enter Token Here:</label>
        <input type="text" id="token" />
        <input type="submit" value="Verify" />
      </form>
      <p>
        Don't have a token? Click <a href="https://doubleknot.com">here</a>
      </p>
    </>
  );
};

export default Token;
