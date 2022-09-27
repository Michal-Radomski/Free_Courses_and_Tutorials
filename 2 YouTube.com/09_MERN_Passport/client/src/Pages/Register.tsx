import React from "react";
import axios, { AxiosResponse } from "axios";

const Register = (): JSX.Element => {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const register = async () => {
    await axios
      .post(
        "/register",
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res: AxiosResponse) => {
        console.log({ res });
        if (res.data === "Created") {
          console.log("Register successfully");
          window.location.href = "/login";
          alert("Please login");
        }
      });
  };

  return (
    <div>
      <h1>Register</h1>
      <input type="text" placeholder="username" onChange={(event) => setUsername(event.target.value)} />
      <input type="text" placeholder="password" onChange={(event) => setPassword(event.target.value)} />
      <button onClick={register}>Register</button>
    </div>
  );
};

export default Register;
