import TextBox from '../InputComponents/TextBox';

const Login = () => {
  return (
    <>
      <h1>TGCS Competition Database</h1>
      <p>
        Please log in to your TGCS email account. You will then be prompted for
        your authentication token. The database remains accessible for 24 hours
        after entering the token.
      </p>
      <div
        className="g_id_signin"
        data-type="standard"
        data-size="large"
        data-theme="outline"
        data-text="sign_in_with"
        data-shape="rectangular"
        data-logo_alignment="left"
      />
      <br />
      <TextBox id="username" name="Username" />
      <br />
      <input type="password" name="Password" id="password" />
      <label htmlFor="password">Password</label>
      <br />
      <TextBox id="auth_token" name="Auth Token" />
    </>
  );
};

export default Login;
