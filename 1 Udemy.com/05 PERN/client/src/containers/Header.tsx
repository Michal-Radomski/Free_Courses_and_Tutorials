import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { RootState } from "../Interfaces";

class Header extends React.Component<{ is_authenticated: boolean; auth: { login(): void; logout(): void } }, {}> {
  render() {
    return (
      <div>
        <Link to="/" style={{ padding: "5px" }}>
          Home
        </Link>
        <Link to="/profile" style={{ padding: "5px" }}>
          Profile
        </Link>
        <Link to="/renderlist" style={{ padding: "5px" }}>
          List
        </Link>
        <Link to="/posts" style={{ padding: "5px" }}>
          Forum
        </Link>
        <Link to="/privateroute" style={{ padding: "5px" }}>
          Private Route
        </Link>
        {!this.props.is_authenticated ? (
          <button onClick={() => this.props.auth.login()}>Login</button>
        ) : (
          <button onClick={() => this.props.auth.logout()}>Logout</button>
        )}
        <br />
        <br />
        <br />
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    is_authenticated: state.authReducer.is_authenticated,
  };
}

export default connect(mapStateToProps)(Header);
