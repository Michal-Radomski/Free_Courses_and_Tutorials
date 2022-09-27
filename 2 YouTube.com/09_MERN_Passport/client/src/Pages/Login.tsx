import React from "react";
import axios, { AxiosResponse } from "axios";

const Login = (): JSX.Element => {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const login = async () => {
    await axios
      .post(
        "/login",
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then(
        (res: AxiosResponse) => {
          console.log({ res });
          if (res.data === "Success") {
            console.log("Login successfully");
            window.location.href = "/";
          }
        },
        (error) => {
          console.log("Failure", error);
        }
      );
  };

  return (
    <div>
      <h1>Login</h1>
      <input type="text" placeholder="username" onChange={(event) => setUsername(event.target.value)} />
      <input type="text" placeholder="password" onChange={(event) => setPassword(event.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
};

export default Login;
