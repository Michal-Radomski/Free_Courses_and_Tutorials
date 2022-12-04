import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = ({ setAuth }: { setAuth(arg0: boolean): void }): JSX.Element => {
  const [inputs, setInputs] = React.useState<User>({
    email: "",
    password: "",
    name: "",
  });

  const { email, password, name } = inputs;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInputs({ ...inputs, [event.target.name]: event.target.value });

  const onSubmitForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    // console.log({ inputs });
    try {
      const body = { email, password, name };
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      // console.log({ response });
      const parseRes = await response.json();
      // console.log({ parseRes });

      if (parseRes.jwtToken) {
        localStorage.setItem("jwt_token", parseRes.jwtToken);
        setAuth(true);
        toast.success("Register Successfully");
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
      <h1 className="mt-5 text-center">Register</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="email"
          value={email}
          placeholder="email"
          //* Can be: onChange={onChange}
          onChange={(event) => onChange(event)}
          className="form-control my-3"
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={(event) => onChange(event)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="name"
          value={name}
          placeholder="name"
          onChange={(event) => onChange(event)}
          className="form-control my-3"
        />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <Link to="/login">login</Link>
    </React.Fragment>
  );
};

export default Register;
