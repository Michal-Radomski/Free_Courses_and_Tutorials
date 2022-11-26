/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import * as ACTIONS from "../redux/actions";
import history from "../utils/history";
import { AppDispatch, RootState } from "../Interfaces";

interface CustomProps {
  isAuthenticated: boolean;
  comments: string[];
  location: RootState;
  set_comments(arg0: string[]): void;
  db_profile: [{ uid: string; username: string }];
}

class ShowPost extends React.Component<CustomProps, RootState> {
  constructor(props: CustomProps) {
    super(props);

    this.state = {
      open: false,
      comment: "",
      cid: "",
      opacity: 0,
      delete_comment_id: 0,
      comments_arr: [],
      comments_motion: [],
      cur_user_id: null,
      likes: this.props.location.state.post.post.likes,
      like_user_ids: this.props.location.state.post.post.like_user_id,
      like_post: true,
    };
  }

  componentDidMount() {
    axios
      .get("/api/get/allpostcomments", { params: { post_id: this.props.location.state.post.post.pid } })
      .then((res) => this.props.set_comments(res.data))
      .then(() => this.add_comments_to_state(this.props.comments))
      .catch((err) => console.log({ err }));
    this.setCurUserID();
    this.handleTransition();
  }

  setCurUserID = () => {
    if (this.props.isAuthenticated) {
      this.setState({ cur_user_id: this.props.db_profile[0].uid });
    }
  };

  handleTransition = () => setTimeout(() => this.setState({ opacity: 1 }), 400);

  add_comments_to_state = (comments: string[]) => {
    this.setState({ comments_arr: [...comments] });
    this.animate_comments();
  };

  animate_comments = () => {
    let i = 1;
    // eslint-disable-next-line array-callback-return
    this.state.comments_arr.map((comment: string) => {
      setTimeout(() => {
        this.setState({ comments_motion: [...this.state.comments_motion, comment] });
      }, 400 * i);
      i++;
    });
  };

  handleCommentSubmit = (submitted_comment: {
    cid: number;
    comment: string;
    user_id: string;
    author: string;
    date_created: string;
  }) => {
    setTimeout(() => this.setState({ comments_motion: [submitted_comment, ...this.state.comments_motion] }), 50);
  };

  handleCommentUpdate = (comment: {
    cid: string;
    comment?: string;
    user_id?: string;
    author?: string;
    date_created?: string;
    isEdited?: boolean;
  }) => {
    const commentIndex = this.state.comments_motion.findIndex((com: { cid: string }) => com.cid === comment.cid);
    let newArr = [...this.state.comments_motion];
    newArr[commentIndex] = comment;
    this.setState({ comments_motion: newArr });
  };

  handleCommentDelete = (cid: string) => {
    this.setState({ delete_comment_id: cid });
    const newArr = this.state.comments_motion.filter((com: { cid: string }) => com.cid !== cid);
    setTimeout(() => this.setState({ comments_motion: newArr }), 900);
  };

  RenderComments = (comment: {
    cur_user_id: number;
    comment: { cid: string; comment: string; date_created: string; isEdited: boolean; author: string; user_id: number };
  }) => (
    <div className={this.state.delete_comment_id === comment.comment.cid ? "FadeOutComment" : "CommentStyles"}>
      <h3> {comment.comment.comment} </h3>
      <small>
        {comment.comment.date_created === "Just Now" ? (
          <div> {comment.comment.isEdited ? <span> Edited </span> : <span> Just Now </span>}</div>
        ) : (
          comment.comment.date_created
        )}
      </small>
      <p> By: {comment.comment.author} </p>
      {comment.cur_user_id === comment.comment.user_id ? (
        <Button onClick={() => this.handleClickOpen(comment.comment.cid, comment.comment.comment)}>Edit</Button>
      ) : null}
    </div>
  );

  handleClickOpen = (cid: string, comment: string) => this.setState({ open: true, comment: comment, cid: cid });

  handleClose = () => this.setState({ open: false, comment: "", cid: "" });

  handleCommentChange = (event: { target: { value: string } }) => this.setState({ comment: event.target.value });

  handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    this.setState({ comment: "" });

    const comment = (event.target as any).comment.value;
    const user_id = this.props.db_profile[0].uid;
    const post_id = this.props.location.state.post.post.pid;
    const username = this.props.db_profile[0].username;
    const current_time = "Just Now";
    const temp_cid = 63426;

    const submitted_comment = {
      cid: temp_cid,
      comment: comment,
      user_id: user_id,
      author: username,
      date_created: current_time,
    };

    const data = { comment: comment, post_id: post_id, user_id: user_id, username: username };

    axios
      .post("/api/post/commenttodb", data)
      .then((res) => console.log({ res }))
      .catch((err) => console.log({ err }));
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
    this.handleCommentSubmit(submitted_comment);
  };

  handleUpdate = () => {
    const comment = this.state.comment;
    const cid = this.state.cid;
    const user_id = this.props.db_profile[0].uid;
    const post_id = this.props.location.state.post.post.pid;
    const username = this.props.db_profile[0].username;
    const isEdited = true;
    const current_time = "Just Now";

    const edited_comment = {
      cid: cid,
      comment: comment,
      user_id: user_id,
      author: username,
      date_created: current_time,
      isEdited: isEdited,
    };

    const data = { cid: cid, comment: comment, post_id: post_id, user_id: user_id, username: username };

    axios
      .put("/api/put/commenttodb", data)
      .then((res) => console.log({ res }))
      .catch((err) => console.log({ err }));
    this.handleCommentUpdate(edited_comment);
  };

  handleDelete = () => {
    const cid = this.state.cid;
    axios
      .delete("/api/delete/comment", { data: { cid: cid } })
      .then((res) => console.log({ res }))
      .catch((err) => console.log({ err }));
    this.handleCommentDelete(cid);
  };

  handleLikes = () => {
    const user_id = this.props.db_profile[0].uid;
    const post_id = this.props.location.state.post.post.pid;

    const data = { uid: user_id, post_id: post_id };
    axios
      .put("/api/put/likes", data)
      .then(() =>
        !this.state.like_user_ids.includes(user_id) && this.state.like_post
          ? this.setState({ likes: this.state.likes + 1 })
          : null
      )
      .then(() => this.setState({ like_post: false }))
      .catch((err) => console.log({ err }));
  };

  render() {
    return (
      <div>
        <div>
          <h2>Post</h2>
          <h4>{this.props.location.state.post.post.title}</h4>
          <p>{this.props.location.state.post.post.body}</p>
          <p>{this.props.location.state.post.post.author}</p>

          <a
            style={{ cursor: "pointer" }}
            onClick={this.props.isAuthenticated ? () => this.handleLikes() : () => history.replace("/signup")}
          >
            <i className="material-icons">thumb_up</i>
            <small className="notification-num-showpost"> {this.state.likes} </small>
          </a>
        </div>
        <div>
          <h2> Comments:</h2>
          {this.props.comments
            ? this.state.comments_motion.map((comment: any) => (
                <this.RenderComments comment={comment} key={comment.cid} cur_user_id={this.props.db_profile[0].uid as any} />
              ))
            : null}
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <TextField id="comment" label="Comment" margin="normal" />
            <br />
            {this.props.isAuthenticated ? (
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            ) : (
              <Link to="/signup">
                <Button variant="contained" color="primary">
                  Signup to Comment
                </Button>
              </Link>
            )}
          </form>
        </div>
        <div>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Edit Comment</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <input type="text" value={this.state.comment} onChange={this.handleCommentChange} />
              </DialogContentText>
              <DialogActions>
                <Button
                  onClick={() => {
                    this.handleUpdate();
                    this.handleClose();
                  }}
                >
                  Agree
                </Button>
                <Button onClick={() => this.handleClose()}>Cancel</Button>
                <Button
                  onClick={() => {
                    this.handleDelete();
                    this.handleClose();
                  }}
                >
                  Delete
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    comments: state.postsReducer.comments,
    db_profile: state.authReducer.db_profile,
    isAuthenticated: state.authReducer.is_authenticated,
  };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return {
    set_comments: (comments: string[]) => dispatch(ACTIONS.fetch_post_comments(comments)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowPost);
