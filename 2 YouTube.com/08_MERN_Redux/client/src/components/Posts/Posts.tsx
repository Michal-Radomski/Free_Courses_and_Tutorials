import React from "react";

import useStyles from "./styles";
import Post from "./Post/Post";

const Posts = (): JSX.Element => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Post />
      <Post />
    </React.Fragment>
  );
};

export default Posts;
