import React from "react";

import useStyles from "./styles";
import Post from "./Post/Post";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../Types";

const Posts = (): JSX.Element => {
  const posts = useAppSelector((state: RootState) => state.posts);
  console.log({ posts });

  const classes = useStyles();
  return (
    <React.Fragment>
      <Post />
      <Post />
    </React.Fragment>
  );
};

export default Posts;
