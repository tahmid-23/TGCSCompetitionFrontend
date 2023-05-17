import { FormEvent } from 'react';

function onLogin(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  console.log(e.currentTarget['token'].value);
}

const Token = () => {
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
