import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { Button, Card, CardContent, CardHeader } from "@mui/material";

import * as ACTIONS from "../redux/actions";
import { AppDispatch, RootState } from "../Interfaces";

interface CustomProps {
  profile: RootState;
  db_profile: [{ uid: string; username: string }];
  location: RootState;
  set_profile(arg0: RootState): void;
  set_db_posts(arg0: RootState): void;
  user_profile: RootState;
  user_posts: RootState;
}

class ShowUser extends React.Component<CustomProps, RootState> {
  componentDidMount() {
    const username = this.props.location.state.post.post.author;
    axios
      .get("/api/get/otheruserprofilefromdb", { params: { username: username } })
      .then((res) => this.props.set_profile(res.data))
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get("/api/get/otheruserposts", { params: { username: username } })
      .then((res) => this.props.set_db_posts(res.data))
      .catch(function (error) {
        console.log(error);
      });
    window.scrollTo({ top: 0, left: 0 });
  }

  RenderProfile = (props: RootState) => (
    <div>
      <div className="FlexRow">
        <h1>{props.profile.username}</h1>
      </div>
      <div className="FlexRow">
        <Link to={{ pathname: "/sendmessage/", state: { props } }}>
          <Button variant="contained" color="primary" type="submit">
            Send Message
          </Button>
        </Link>
      </div>
    </div>
  );

  RenderPosts = (post: RootState) => (
    <div>
      <Card className="CardStyles">
        <CardHeader
          title={<Link to={{ pathname: "/post/" + post.post.pid, state: { post } }}>{post.post.title}</Link>}
          subheader={
            <div>
              <div>{moment(post.post.date_created).format("MMMM Do, YYYY | h:mm a")}</div>
              <div>{post.post.author}</div>
            </div>
          }
        />
        <CardContent>
          <span style={{ overflow: "hidden" }}>{post.post.body} </span>
        </CardContent>
      </Card>
    </div>
  );

  render() {
    return (
      <div>
        <div className="FlexRow">
          {this.props.user_profile ? <this.RenderProfile profile={this.props.user_profile[0]} /> : null}
        </div>

        <br />
        <hr className="style-two" />

        <h3> Latest Activity: </h3>
        <div className="FlexColumn">
          {this.props.user_posts
            ? this.props.user_posts.map((post: RootState) => (
                <div>
                  <this.RenderPosts key={post.pid} post={post} />
                  <br />
                </div>
              ))
            : null}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    user_profile: state.userReducer.OtherUserDBProfile,
    user_posts: state.userReducer.db_other_user_posts,
  };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return {
    set_db_posts: (posts: RootState) => dispatch(ACTIONS.get_other_user_db_posts(posts)),
    set_profile: (profile: RootState) => dispatch(ACTIONS.set_other_user_db_profile(profile)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowUser);
