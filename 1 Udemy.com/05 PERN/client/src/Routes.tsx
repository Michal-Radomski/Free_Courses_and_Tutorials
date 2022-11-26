import React from "react";
import { connect } from "react-redux";

// import Container1 from './containers/container1'
// import Header from './containers/header';
import Profile from "./containers/Profile";
// import Form1 from './containers/form1';
// import RenderList from './containers/renderlist';

// import Component1 from './functional/component1';
// import Callback from './functional/callback';
// import PrivateComponent from './functional/privatecomponent';
// import UnauthRedirect from './functional/unauthredirect';
// import Home from './functional/home';
// import RenderListItem from './functional/renderlistitem';
// import SignUp from './functional/signup';

import Posts from "./Blog/Posts";
import AddPost from "./Blog/AddPost";
import ShowPost from "./Blog/ShowPost";
import EditPost from "./Blog/EditPost";

// import ShowUser from './Profile/showuser';
// import SendMessage from './Profile/sendmessage';
// import ShowMessages from './Profile/showmessages';
// import ReplytoMessage from './Profile/replytomessage';

import * as ACTIONS from "./redux/actions";

// import Auth from './utils/auth';
import AuthCheck from "./utils/AuthCheck";
import history from "./utils/history";

import { Router, Route, Switch, Redirect } from "react-router";
import { AppDispatch } from "./Interfaces";

// export const auth = new Auth()

// const handleAuthentication = (props) => {
//   if(props.location.hash) {
//     auth.handleAuth()
//   }
// }

// const PrivateRoute = ({component: Component, auth }) => (
//   <Route render={props => auth.isAuthenticated() === true
//     ? <Component auth={auth} {...props} />
//     : <Redirect to={{pathname:'/redirect'}} />
//   }
//   />
// )

class Routes extends React.Component {
  // componentDidMount() {
  //   if(auth.isAuthenticated()) {
  //     this.props.login_success()
  //     auth.getProfile()
  //     setTimeout(() => {this.props.add_profile(auth.userProfile)}, 400)
  //   }
  //   else {
  //     this.props.login_failure()
  //     this.props.remove_profile()
  //   }
  // }

  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            {/* <Header auth={auth} /> */}
            <Switch>
              {/* <Route exact path='/' component={Home} /> */}
              {/* <Route exact path='/form1' component={Form1} /> */}
              {/* <Route exact path='/container1' render={() => <Container1 auth={auth} /> } /> */}
              {/* <Route path='/authcheck' render={() => <AuthCheck auth={auth} /> } /> */}
              {/* <Route path='/redirect' component={UnauthRedirect} /> */}
              {/* <Route path='/renderlist' component={RenderList} /> */}

              {/* <Route path="/user/:name" component={ ShowUser } /> */}
              {/* <PrivateRoute path="/sendmessage"  auth={auth} component={ SendMessage } /> */}
              {/* <PrivateRoute path="/showmessages/:id"  auth={auth}  component={ ShowMessages } /> */}
              {/* <PrivateRoute path="/replytomessage"  auth={auth}  component={ ReplytoMessage } /> */}

              <Route path="/posts" component={Posts} />
              <Route path="/post/:pid" component={ShowPost} />
              <Route path="/editpost/:pid" component={EditPost} />
              <Route path="/addpost" component={AddPost} />
              {/* <Route path="/signup" render={(props) => <SignUp auth={auth} {...props} />} /> */}

              {/* <Route path='/callback' render={(props) => { handleAuthentication(props); return <Callback />}} /> */}
              {/* <Route path="/component1" render={(props) => <Component1 {...props} /> } /> */}

              {/* <Route path="/listitem/:id" component={RenderListItem} /> */}

              {/* <PrivateRoute path="/privateroute" auth={auth} component={PrivateComponent} />
            <PrivateRoute path="/profile" auth={auth} component={Profile} /> */}
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
