import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = (): JSX.Element => {
  const navigate = useNavigate();

  const [values, setValues] = React.useState<Credentials>({ email: "", password: "" });

  const generateError = (error: string) =>
    toast.error(error, {
      position: "top-right",
    });

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "/api/login",
        {
          ...values,
        },
        { withCredentials: true }
      );
      if (data) {
        if (data.errors) {
          // console.log("data.errors:", data.errors);
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      console.log({ err });
    }
  };

  return (
    <div className="container">
      <h2>Login to your Account</h2>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(event) => setValues({ ...values, [event.target.name]: event.target.value })}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(event) => setValues({ ...values, [event.target.name]: event.target.value })}
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Don't have an account ?<Link to="/register"> Register </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
