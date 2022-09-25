import React from "react";
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import { GoogleLogin } from "react-google-login"; //* Deprecated - It was removed from package.json
import { CredentialResponse, GoogleLogin } from "@react-oauth/google"; //* @react-oauth/google -> base version
// import { useGoogleLogin } from "@react-oauth/google"; //* @react-oauth/google -> custom version
import { useHistory } from "react-router-dom";
import { signin, signup } from "../../redux/actions/auth";
import jwt_decode from "jwt-decode";

import useStyles from "./styles";
import Input from "./Input";
import { AppDispatch, SignUp } from "../../Types";
import { useAppDispatch } from "../../redux/hooks";
import { AUTH } from "../../redux/actionTypes";

const initialState: SignUp = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" };

const Auth = (): JSX.Element => {
  // const Google_clientId = process.env.REACT_APP_Google_clientId as string; //* to react-google-login
  // console.log({ Google_clientId });
  const classes = useStyles();
  const dispatch: AppDispatch = useAppDispatch();
  const history = useHistory();

  const [isSignup, setIsSignup] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState<SignUp>(initialState);

  //* V1
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
  //* v2
  //* const handleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    // console.log({ event });
    // console.log({ formData });
    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value });

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  // * @react-oauth/google -> custom version
  // const loginWithGoogle = useGoogleLogin({
  //   onSuccess: async (tokenResponse) => {
  //     // console.log({ tokenResponse });
  //     const token = tokenResponse.access_token;
  //     // console.log({ token });
  //     const expireIn = tokenResponse.expires_in * 1000 + new Date().getTime();
  //     // console.log({ expireIn });
  //     const userInfo = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     const userData = userInfo.data;
  //     // console.log({ userData });

  //     try {
  //       dispatch({ type: AUTH, data: { userData, token, expireIn } });
  //       history.push("/");
  //     } catch (error) {
  //       console.log({ error });
  //     }
  //   },
  //   onError: (error) => {
  //     console.log("Google Sign In was unsuccessful. Try again later", error);
  //     alert("Google Sign In was unsuccessful. Try again later");
  //   },
  // });

  // * @react-oauth/google -> base version
  const loginWithGoogle = (credentialResponse: CredentialResponse) => {
    // console.log("credentialResponse:", credentialResponse);
    const token = credentialResponse.credential;
    // console.log("credential:", credential);
    const decodedToken: {
      picture: any;
      email: string;
      given_name: string;
      exp: number;
    } = jwt_decode(token as string);
    // console.log("decoded:", decodedToken);

    const userData = {
      email: decodedToken.email,
      name: decodedToken.given_name,
      expireIn: decodedToken.exp,
      picture: decodedToken.picture,
    };
    // console.log({ userData });

    try {
      dispatch({ type: AUTH, data: { userData, token } });
      history.push("/");
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isSignup ? "Sign up" : "Sign in"}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignup && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                  <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                </>
              )}
              <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
              {isSignup && (
                <Input
                  name="confirmPassword"
                  label="Repeat Password"
                  handleChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  handleShowPassword={handleShowPassword}
                />
              )}
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              {isSignup ? "Sign Up" : "Sign In"}
            </Button>

            {/* //* Google-React-Login -> Deprecated  */}
            {/* <GoogleLogin
              clientId={Google_clientId}
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant="contained"
                >
                  Google Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleError}
              cookiePolicy="single_host_origin"
            /> */}

            {/* //* @react-oauth/google -> base version */}
            {!isSignup && (
              <GoogleLogin
                locale="en"
                width="364px"
                onSuccess={(credentialResponse) => {
                  loginWithGoogle(credentialResponse);
                }}
                onError={() => {
                  console.log("Google Sign In was unsuccessful. Try again later");
                  alert("Google Sign In was unsuccessful. Try again later");
                }}
              />
            )}

            {/* //* @react-oauth/google -> custom version */}
            {/* <Button
              onClick={() => loginWithGoogle()}
              className={classes.googleButton}
              color="secondary"
              fullWidth
              startIcon={<Icon />}
              variant="contained"
            >
              Sign In With Google
            </Button> */}

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignup ? (
                    <p style={{ margin: 4 }}>
                      Already have an account? <span style={{ color: "maroon", fontWeight: "bold" }}>Sign In</span>
                    </p>
                  ) : (
                    <p style={{ margin: 4 }}>
                      Don't have an account? <span style={{ color: "maroon", fontWeight: "bold" }}>Sign Up</span>
                    </p>
                  )}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default Auth;
