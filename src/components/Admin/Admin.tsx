import { ChangeEvent, useCallback, useState } from 'react';
import { IP_ADDRESS } from '../../Global';

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
  const [email, setEmail] = useState<string>('');
  const [displayedToken, setDislpayedToken] = useState<string>('');

  const onTokenGen = useCallback(async () => {
    const token = genToken(16);
    const data = {
      email: `${email}@gifted.org`,
      token: token
    };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    await fetch(`${IP_ADDRESS}/create-user`, options).then((res) => {
      if (res.status === 200) {
        setDislpayedToken(token);
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
    navigator.clipboard.writeText(displayedToken);
    alert('Token copied to clipboard!');
  }, [displayedToken]);

  return (
    <>
      <h1>Admin Only Interface</h1>
      <br />
      <br />
      <label htmlFor="email">Email</label>
      <br />
      <input type="text" id="email" onChange={onChange} />
      <label htmlFor="email">@gifted.org</label>
      <br />
      <br />
      <p>Token: {displayedToken}</p>
      {displayedToken && (
        <button title="Copy to Clipboard" onClick={onCopy}>
          <svg
            width="5%"
            height="5%"
            viewBox="0 0 18 18"
            preserveAspectRatio="xMidYMid meet"
            focusable="false"
          >
            <path
              d="M8 7v7h5V7H8zM3.99 2h7.942v2H4.985v8H3V2.995A1 1 0 0 1 3.99 2zM6 5.996c0-.55.446-.996.998-.996h7.004c.55 0 .998.445.998.996v9.008c0 .55-.446.996-.998.996H6.998A.996.996 0 0 1 6 15.004V5.996z"
              fillRule="evenodd"
            />
          </svg>
        </button>
      )}
      <br />
      <button onClick={onTokenGen}> Generate Token</button>
    </>
  );
};

export default Admin;
