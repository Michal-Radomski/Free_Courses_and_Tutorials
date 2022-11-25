import React from "react";
import { withRouter } from "react-router-dom";
import { History } from "history";
import { connect } from "react-redux";
import axios from "axios";

import { AppDispatch, RootState } from "../Interfaces";
import * as ACTIONS from "../redux/actions";

interface CustomProps {
  history: History;
  auth: RootState;
  login_success: () => void;
  remove_profile: () => void;
  login_failure: () => void;
  remove_db_profile: () => void;
  set_db_profile: (arg0: Object) => void;
  add_profile: (arg0: Object) => void;
}

class AuthCheck extends React.Component<CustomProps, {}> {
  send_profile_to_db = (profile: { profile: { email: string } }) => {
    const data = profile;
    axios
      .post("/api/posts/userprofiletodb", data)
      .then(() =>
        axios
          .get("/api/get/userprofiletodb", { params: { email: profile.profile.email } })
          .then((res) => this.props.set_db_profile(res.data))
      );
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated()) {
      this.props.login_success();
      this.props.add_profile(this.props.auth.userProfile);
      this.send_profile_to_db(this.props.auth.userProfile);
      setTimeout(() => this.props.history.push("/"), 50);
    } else {
      this.props.login_failure();
      this.props.remove_profile();
      this.props.remove_db_profile();
      this.props.history.push("/");
    }
  }

  render() {
    return <div>{null}</div>;
  }
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return {
    login_success: () => dispatch(ACTIONS.login_success()),
    login_failure: () => dispatch(ACTIONS.login_failure()),
    add_profile: (profile: Object) => dispatch(ACTIONS.add_profile(profile)),
    remove_profile: () => dispatch(ACTIONS.remove_profile()),
    set_db_profile: (profile: Object) => dispatch(ACTIONS.set_db_profile(profile)),
    remove_db_profile: () => dispatch(ACTIONS.remove_db_profile()),
  };
}

// export default connect(mapStateToProps, mapDispatchToProps)(AuthCheck);

const AuthCheckWithRouter = withRouter(AuthCheck as any);
export default connect(null, mapDispatchToProps)(AuthCheckWithRouter as any);
