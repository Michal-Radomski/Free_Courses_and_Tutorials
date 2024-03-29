import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";

import useStyles from "./styles";
import Post from "./Post/Post";
import { useAppSelector } from "../../redux/hooks";
import { IPost, RootState } from "../../Types";

const Posts = ({ setCurrentId }: { setCurrentId: React.Dispatch<React.SetStateAction<string>> }): JSX.Element => {
  const { posts, isLoading } = useAppSelector((state: RootState) => state?.posts);
  // console.log({ posts });

  const classes = useStyles();

  if (!posts.length && !isLoading) {
    return <h1 style={{ textAlign: "center", marginTop: "80px" }}>No Posts</h1>;
  }

  return (
    <React.Fragment>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
          {posts.map((post: IPost) => (
            <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>
      )}
    </React.Fragment>
  );
};

export default Posts;
