import React from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";

import { getPosts } from "../redux/actions/posts";
import useStyles from "./styles";
import { AppDispatch, RootState } from "../Types";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const Paginate = ({ page }: { page: number }): JSX.Element => {
  const { numberOfPages } = useAppSelector((state: RootState) => state.posts);
  const dispatch: AppDispatch = useAppDispatch();

  const classes = useStyles();

  React.useEffect(() => {
    if (page) {
      dispatch(getPosts()); //+ ---------------------------
    }
  }, [dispatch, page]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      showFirstButton={true}
      showLastButton={true}
      boundaryCount={2}
      renderItem={(item) => <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />}
    />
  );
};

export default Paginate;
