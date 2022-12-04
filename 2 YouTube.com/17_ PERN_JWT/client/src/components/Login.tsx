import React from "react";

const Login = ({ setAuth }: { setAuth(arg0: boolean): void }): JSX.Element => {
  console.log({ setAuth });
  return (
    <React.Fragment>
      Login
      <button onClick={() => setAuth(true)}>Login</button>
    </React.Fragment>
  );
};

export default Login;
