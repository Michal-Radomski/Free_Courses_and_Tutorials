import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import "../App.scss";
import * as ACTIONS from "../redux/actions";
import history from "../utils/history";
import { AppDispatch, RootState } from "../Interfaces";

interface CustomProps {
  db_profile: [{ uid: string; username: string }];
  set_user_posts(arg0: string[]): void;
  user_posts: string[];
  profile: Object;
}

class Profile extends React.Component<CustomProps, RootState> {
  constructor(props: CustomProps) {
    super(props);
    this.state = {
      open: false,
      post_id: null,
    };
  }

  componentDidMount() {
    const user_id = this.props.db_profile[0].uid;
    axios
      .get("/api/get/userposts", { params: { user_id: user_id } })
      .then((res) => this.props.set_user_posts(res.data))
      .catch((err) => console.log({ err }));
  }

  handleClickOpen = (pid: string) => {
    this.setState({ open: true, post_id: pid });
  };

  handleClickClose = () => {
    this.setState({ open: false, post_id: null });
  };

  RenderProfile = (props: RootState) => (
    <div>
      <h1>{props.profile.profile.nickname}</h1>
      <br />
      <img src={props.profile.profile.picture} alt="" />
      <br />
      <h4> {props.profile.profile.email}</h4>
      <br />
      <h5> {props.profile.profile.name} </h5>
      <br />
      <h6> Email Verified: </h6>
      {props.profile.profile.email_verified ? <p>Yes</p> : <p>No</p>}
      <br />
    </div>
  );

  RenderPosts = (post: { post: { pid: string; title: string; date_created: string; body: string } }) => (
    <Card style={{ width: "500px", height: "200px", marginBottom: "10px", paddingBottom: "80px" }}>
      <CardHeader
        title={<Link to={{ pathname: "/post/" + post.post.pid, state: { post } }}>{post.post.title}</Link>}
        subheader={
          <div className="FlexColumn">
            <div className="FlexRow">{post.post.date_created}</div>
            <div className="FlexRow">
              <Link to={{ pathname: "/editpost/" + post.post.pid, state: { post } }}>
                <button>Edit</button>
              </Link>
              <button onClick={() => this.handleClickOpen(post.post.pid)}>Delete</button>
            </div>
          </div>
        }
      />
      <br />
      <CardContent>
        <span style={{ overflow: "hidden" }}> {post.post.body} </span>
      </CardContent>
    </Card>
  );

  DeletePost = () => {
    const post_id = this.state.post_id;
    axios
      .delete("api/delete/postcomments", { data: { post_id: post_id } })
      .then(() => axios.delete("/api/delete/post", { data: { post_id: post_id } }).then((res) => console.log({ res })))
      .catch((err) => console.log({ err }))
      .then(() => this.handleClickClose())
      .then(() => setTimeout(() => history.replace("/"), 700));
  };

  handleClose = () => {
    this.setState({ ...this.state, open: false });
  };

  render() {
    return (
      <div>
        <div>
          <this.RenderProfile profile={this.props.profile} />
        </div>
        <div>
          <Link to={{ pathname: "/showmessages/" + this.state.user_id }}>
            <Button variant="contained" color="primary" type="submit">
              Show Messages
            </Button>
          </Link>
          <br />
        </div>
        <div>
          {this.props.user_posts
            ? this.props.user_posts.map((post: any) => <this.RenderPosts post={post} key={post.pid} />)
            : null}
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title"> Confirm Delete? </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">Deleting Post</DialogContentText>
            <DialogActions>
              <Button onClick={() => this.DeletePost()}>Agree</Button>
              <Button onClick={() => this.handleClickClose()}>Cancel</Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    profile: state.authReducer.profile,
    user_posts: state.postsReducer.user_posts,
    db_profile: state.authReducer.db_profile,
  };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return {
    set_user_posts: (posts: string[]) => dispatch(ACTIONS.fetch_user_posts(posts)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
