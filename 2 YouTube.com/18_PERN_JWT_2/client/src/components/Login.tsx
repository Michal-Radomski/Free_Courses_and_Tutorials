import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ setAuth }: { setAuth(arg0: boolean): void }): JSX.Element => {
  const [inputs, setInputs] = React.useState<User>({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInputs({ ...inputs, [event.target.name]: event.target.value });

  const onSubmitForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("jwt_token", parseRes.jwtToken);
        setAuth(true);
        toast.success("Logged in Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <React.Fragment>
      <h1 className="mt-5 text-center">Login</h1>
      <form onSubmit={onSubmitForm}>
        <input
          placeholder="email"
          type="text"
          name="email"
          value={email}
          onChange={(event) => onChange(event)}
          className="form-control my-3"
        />
        <input
          placeholder="password"
          type="password"
          name="password"
          value={password}
          onChange={(event) => onChange(event)}
          className="form-control my-3"
        />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <Link to="/register">Register</Link>
      <br />
      <Link to="/">Home</Link>
    </React.Fragment>
  );
};

export default Login;
