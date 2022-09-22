import React from "react";
import { Container, Grow, Grid } from "@material-ui/core";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import useStyles from "./styles";
import { AppDispatch } from "../../Types";
import { useAppDispatch } from "../../redux/hooks";
import { getPosts } from "../../redux/actions/posts";

const Home = (): JSX.Element => {
  const classes = useStyles();
  // console.log({ classes });
  const dispatch: AppDispatch = useAppDispatch();

  const [currentId, setCurrentId] = React.useState<string>("");
  // console.log({ currentId });

  React.useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentId]);

  return (
    <React.Fragment>
      <Grow in>
        <Container>
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.mainContainer}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </React.Fragment>
  );
};

export default Home;
