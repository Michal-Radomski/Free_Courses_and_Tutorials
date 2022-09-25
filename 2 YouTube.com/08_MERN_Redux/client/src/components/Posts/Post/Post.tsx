import React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Tooltip, ButtonBase } from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useHistory } from "react-router-dom";

import useStyles from "./styles";
import { AppDispatch, IPost } from "../../../Types";
import { useAppDispatch } from "../../../redux/hooks";
import { deletePost, likePost } from "../../../redux/actions/posts";
import { ThumbUpAltOutlined } from "@material-ui/icons";

const Post = ({
  post,
  setCurrentId,
}: {
  post: IPost;
  setCurrentId: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element => {
  const classes = useStyles();
  const dispatch: AppDispatch = useAppDispatch();
  const history = useHistory();

  const user = JSON.parse(localStorage.getItem("profile") as string);

  const Likes = (): JSX.Element => {
    if (post && post.likes && post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.userData?.googleId || user?.userData?._id)) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const openPost = () => {
    history.push(`/posts/${post._id}`);
  };

  return (
    <React.Fragment>
      <Card className={classes.card} raised elevation={6}>
        <ButtonBase className={classes.cardAction} onClick={openPost} component="span">
          <CardMedia
            className={classes.media}
            image={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            title={post.title}
          />
          <div className={classes.overlay}>
            <Typography variant="h6">{post?.name || post?.creator}</Typography>
            <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
          </div>

          {(user?.userData?.googleId === post?.creator || user?.userData?._id === post?.creator) && (
            <div className={classes.overlay2}>
              <Tooltip title="Select this Memory">
                <Button onClick={() => setCurrentId(post._id)} style={{ color: "white" }} size="medium">
                  <MoreHorizIcon fontSize="large" />
                </Button>
              </Tooltip>
            </div>
          )}

          <div className={classes.details}>
            <Typography variant="body2" color="textSecondary" component="h2">
              {(post.tags as string[]).map((tag) => `#${tag} `)}
            </Typography>
          </div>
          <Typography className={classes.title} gutterBottom variant="h5" component="h2">
            {post.title}
          </Typography>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {post.message}
            </Typography>
            <br />
            <Typography variant="body2" color="textSecondary" component="h2">
              Number of comments: <strong>{post?.comments?.length}</strong>
            </Typography>
          </CardContent>
        </ButtonBase>
        <CardActions className={classes.cardActions}>
          <Button size="small" color="primary" disabled={!user?.userData} onClick={() => dispatch(likePost(post._id))}>
            <Likes />
          </Button>

          {(user?.result?.googleId === post?.creator || user?.userData?._id === post?.creator) && (
            <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
              <DeleteIcon fontSize="small" /> Delete
            </Button>
          )}
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

export default Post;
