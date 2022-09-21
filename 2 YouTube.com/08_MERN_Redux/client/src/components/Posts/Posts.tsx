import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";

import useStyles from "./styles";
import Post from "./Post/Post";
import { useAppSelector } from "../../redux/hooks";
import { IPost, RootState } from "../../Types";

const Posts = (): JSX.Element => {
  const posts = useAppSelector((state: RootState) => state.posts);
  console.log({ posts });

  const classes = useStyles();
  return (
    <React.Fragment>
      {!posts.length ? (
        <CircularProgress />
      ) : (
        <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
          {posts.map((post: IPost) => (
            <Grid key={post._id} item xs={12} sm={6} md={6}>
              <Post post={post} />
            </Grid>
          ))}
        </Grid>
      )}
    </React.Fragment>
  );
};

export default Posts;
