import React from "react";
import { Container, Grow, Grid, AppBar, TextField, Button, Paper } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import useStyles from "./styles";
import { AppDispatch } from "../../Types";
import { useAppDispatch } from "../../redux/hooks";
import { getPosts, getPostsBySearch } from "../../redux/actions/posts";
import Paginate from "../Paginate";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = (): JSX.Element => {
  const classes = useStyles();
  // console.log({ classes });
  const dispatch: AppDispatch = useAppDispatch();
  const history = useHistory();

  const query = useQuery();
  const page = Number(query.get("page")) || 1;
  const searchQuery = query.get("searchQuery");
  // console.log({ searchQuery });

  const [currentId, setCurrentId] = React.useState<string>("");
  // console.log({ currentId });
  const [search, setSearch] = React.useState<string>("");
  const [tags, setTags] = React.useState<string[]>([]);
  // console.log({ tags });

  React.useEffect(() => {
    dispatch(getPosts(page));
  }, [dispatch, currentId, page]);

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      history.push(`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`);
    } else {
      history.push("/");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    // console.log({ event });
    // if (event.keyCode === 13) { //* Deprecated -> below the same
    if (event.key === "Enter") {
      searchPost();
    }
  };

  const handleAddChip = (tag: string) => setTags([...tags, tag]);
  const handleDeleteChip = (chipToDelete: string) => setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <React.Fragment>
      <Grow in>
        <Container maxWidth="xl">
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar className={classes.appBarSearch} position="static" color="inherit">
                <TextField
                  onKeyDown={handleKeyPress}
                  name="search"
                  variant="outlined"
                  label="Search Memories"
                  fullWidth
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
                <ChipInput
                  style={{ margin: "10px 0" }}
                  value={tags}
                  onAdd={(chip) => handleAddChip(chip)}
                  onDelete={(chip) => handleDeleteChip(chip)}
                  label="Search Tags"
                  variant="outlined"
                />
                <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">
                  Search
                </Button>
              </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
              {!searchQuery && !tags.length && (
                <Paper className={classes.paginate} elevation={6}>
                  <Paginate page={page} />
                </Paper>
              )}
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </React.Fragment>
  );
};

export default Home;
