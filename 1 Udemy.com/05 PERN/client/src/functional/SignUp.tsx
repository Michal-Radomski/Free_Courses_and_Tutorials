import React from "react";
import { Button } from "@mui/material";

import { RootState } from "../Interfaces";

const SignUp = (props: RootState): JSX.Element => (
  <React.Fragment>
    <div className="FlexRowMain">
      <div>
        <h1>Signup and Create an Account</h1>
        <Button color="primary" size="large" variant="contained" onClick={() => props.auth.login()}>
          Signup
        </Button>
      </div>
    </div>
  </React.Fragment>
);

export default SignUp;
