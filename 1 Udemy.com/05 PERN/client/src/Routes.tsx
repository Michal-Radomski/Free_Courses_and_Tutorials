import React from "react";
import { connect } from "react-redux";
import { Router, Route, Switch, Redirect } from "react-router";

import Container1 from "./containers/Container1";
import Header from "./containers/Header";
import Profile from "./containers/Profile";
import RenderList from "./containers/RenderList";
import Callback from "./functional/Callback";
import PrivateComponent from "./functional/PrivateComponent";
import UnAuthRedirect from "./functional/UnAuthRedirect";
import Home from "./functional/Home";
import RenderListItem from "./functional/RenderListItem";
import SignUp from "./functional/SignUp";
import Posts from "./Blog/Posts";
import AddPost from "./Blog/AddPost";
import ShowPost from "./Blog/ShowPost";
import EditPost from "./Blog/EditPost";
import ShowUser from "./Profile/ShowUser";
import SendMessage from "./Profile/SendMessage";
import ShowMessages from "./Profile/ShowMessages";
import ReplyToMessage from "./Profile/ReplayToMessage";
import * as ACTIONS from "./redux/actions";
import Auth from "./utils/Auth";
import AuthCheck from "./utils/AuthCheck";
import history from "./utils/history";
import { AppDispatch, RootState } from "./Interfaces";

export const auth = new Auth();

const handleAuthentication = (props: { location: { hash: string } }) => {
  if (props.location.hash) {
    auth.handleAuth();
  }
};

const PrivateRoute = ({ component: Component, auth }: any) => (
  <Route
    render={(props) =>
      auth.isAuthenticated() === true ? <Component auth={auth} {...props} /> : <Redirect to={{ pathname: "/redirect" }} />
    }
  />
);

interface CustomProps {
  login_success(): void;
  add_profile(arg0: Object): void;
  login_failure(): void;
  remove_profile(): void;
}

class Routes extends React.Component<CustomProps, RootState> {
  componentDidMount() {
    if (auth.isAuthenticated()) {
      this.props.login_success();
      auth.getProfile();
      setTimeout(() => {
        this.props.add_profile(auth.userProfile);
      }, 400);
    } else {
      this.props.login_failure();
      this.props.remove_profile();
    }
  }

  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            <Header auth={auth} />
            <Switch>
              <Route exact path="/" component={Home} />
              {/* @ts-ignore */}
              <Route exact path="/container1" render={() => <Container1 auth={auth} />} />
              {/* @ts-ignore */}
              <Route path="/authcheck" render={() => <AuthCheck auth={auth} />} />
              <Route path="/redirect" component={UnAuthRedirect} />
              <Route path="/renderlist" component={RenderList} />

              <Route path="/user/:name" component={ShowUser} />
              <PrivateRoute path="/sendmessage" auth={auth} component={SendMessage} />
              <PrivateRoute path="/showmessages/:id" auth={auth} component={ShowMessages} />
              <PrivateRoute path="/replytomessage" auth={auth} component={ReplyToMessage} />

              <Route path="/posts" component={Posts} />
              <Route path="/post/:pid" component={ShowPost} />
              <Route path="/editpost/:pid" component={EditPost} />
              <Route path="/addpost" component={AddPost} />
              <Route path="/signup" render={(props) => <SignUp auth={auth} {...props} />} />

              <Route
                path="/callback"
                render={(props) => {
                  handleAuthentication(props);
                  return <Callback />;
                }}
              />

              <Route path="/listitem/:id" component={RenderListItem} />

              <PrivateRoute path="/privateroute" auth={auth} component={PrivateComponent} />
              <PrivateRoute path="/profile" auth={auth} component={Profile} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return {
    login_success: () => dispatch(ACTIONS.login_success()),
    login_failure: () => dispatch(ACTIONS.login_failure()),
    add_profile: (profile: Object) => dispatch(ACTIONS.add_profile(profile)),
    remove_profile: () => dispatch(ACTIONS.remove_profile()),
  };
}

export default connect(null, mapDispatchToProps)(Routes);
