import React from "react";
import { Typography, TextField, Button } from "@material-ui/core/";

import useStyles from "./styles";
import { AppDispatch, IPost } from "../../Types";
import { useAppDispatch } from "../../redux/hooks";
import { commentPost } from "../../redux/actions/posts";

const Comments = ({ post }: { post: IPost }): JSX.Element => {
  const user = JSON.parse(localStorage.getItem("profile") as string);

  const dispatch: AppDispatch = useAppDispatch();
  const classes = useStyles();

  const [comment, setComment] = React.useState<string>("");
  const [comments, setComments] = React.useState<string[]>(post?.comments as string[]);

  const commentsRef = React.useRef<null | HTMLDivElement>(null);

  const handleComment = async () => {
    const newComments = await dispatch(commentPost(`${user?.userData?.name}: ${comment}`, post._id));

    setComment("");
    setComments(newComments);

    commentsRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments?.map((singleComment: string, index: number) => (
            <Typography key={index} gutterBottom variant="subtitle1">
              <strong>{singleComment.split(": ")[0]}:</strong>
              {singleComment.split(":")[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {user?.userData?.name && (
          <div style={{ width: "65%" }}>
            <Typography gutterBottom variant="h6">
              Write a comment:
            </Typography>
            <TextField
              fullWidth
              minRows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
            <br />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment.trim().length}
              color="primary"
              variant="contained"
              onClick={handleComment}
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
