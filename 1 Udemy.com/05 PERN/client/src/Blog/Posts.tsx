import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Pagination from "react-js-pagination";

import * as ACTIONS from "../redux/actions";
import "../App.scss";
import { AppDispatch, RootState } from "../Interfaces";

interface CustomProps {
  posts: string[];
  set_posts(args: string[]): void;
  posts_search: string[];
  search_posts_success(args: string[]): void;
  db_search_posts: string[];
  is_authenticated: boolean;
}

class Posts extends React.Component<CustomProps, RootState> {
  constructor(props: CustomProps) {
    super(props);

    this.state = {
      posts: [],
      opacity: 0,
      posts_motion: [],
      num_posts: 0,
      page_range: 0,
      activePage: 1,
      posts_per_page: 5,
      posts_slice: [],
      posts_search: [],
      posts_search_motion: [],
    };
  }

  componentDidMount() {
    this.handleTransition();
    axios
      .get("/api/get/allposts")
      .then((res) => this.props.set_posts(res.data))
      .then(() => this.add_posts_to_state(this.props.posts))
      .catch((err) => console.log({ err }));
  }

  animate_search_posts = () => {
    this.setState({ posts_search_motion: [] });
    let i = 1;
    // eslint-disable-next-line array-callback-return
    this.state.posts_search.map((post: string) => {
      setTimeout(() => {
        this.setState({ posts_search_motion: [...this.state.posts_search_motion, post] });
      }, 50 * i);
      i++;
    });
  };

  add_search_posts_to_state = (posts: string[]) => {
    this.setState({ posts_search: [] });
    this.setState({ posts_search: [...posts] });

    this.animate_search_posts();
  };

  handleSearch = (event: { target: { value: string } }) => {
    const search_query = event.target.value;
    axios
      .get("/api/get/searchpost", { params: { search_query: search_query } })
      .then((res) => this.props.search_posts_success(res.data))
      .then(() => this.add_search_posts_to_state(this.props.db_search_posts))
      .catch(function (error) {
        console.log({ error });
      });
  };

  handleTransition = () => {
    setTimeout(() => this.setState({ opacity: 1 }), 400);
  };

  add_posts_to_state = (posts: string[]) => {
    this.setState({ posts: [...posts] });
    this.setState({ num_posts: this.state.posts.length });
    this.setState({ page_range: this.state.num_posts / 5 });

    this.slice_posts();
    this.animate_posts();
  };

  slice_posts = () => {
    const indexOfLastPost = this.state.activePage * this.state.posts_per_page;
    const indexOfFirstPost = indexOfLastPost - this.state.posts_per_page;

    this.setState({ posts_slice: this.state.posts.slice(indexOfFirstPost, indexOfLastPost) });
  };

  animate_posts = () => {
    this.setState({ posts_motion: [] });
    let i = 1;

    this.state.posts_slice.forEach((post: string) => {
      setTimeout(() => {
        this.setState({ posts_motion: [...this.state.posts_motion, post] });
      }, 400 * i);
      i++;
    });
  };

  handlePageChange = (pageNumber: number) => {
    this.setState({ activePage: pageNumber });

    setTimeout(() => {
      this.slice_posts();
    }, 50);
    setTimeout(() => {
      this.animate_posts();
    }, 100);
  };

  RenderPosts = (post: {
    post: { pid: string; title: string; date_created: Date; author: string; likes: number; body: string };
  }) => (
    <div className="CardStyles">
      <Card>
        <CardHeader
          title={<Link to={{ pathname: "/post/" + post.post.pid, state: { post } }}>{post.post.title}</Link>}
          subheader={
            <div className="FlexColumn">
              <div className="FlexRow">{moment(post.post.date_created).format("MMMM Do, YYYY | h:mm a")}</div>
              <div className="FlexRow">
                By:
                <Link
                  style={{ paddingLeft: "5px", textDecoration: "none" }}
                  to={{ pathname: "/user/" + post.post.author, state: { post } }}
                >
                  {post.post.author}
                </Link>
              </div>
              <div className="FlexRow">
                <i className="material-icons">thumb_up</i>
                <div className="notification-num-allposts"> {post.post.likes} </div>
              </div>
            </div>
          }
        />
        <br />
        <CardContent>
          <span style={{ overflow: "hidden" }}> {post.post.body} </span>
        </CardContent>
      </Card>
    </div>
  );

  render() {
    //  console.log(this.state.posts);
    return (
      <div>
        <div style={{ opacity: this.state.opacity, transition: "opacity 2s ease" }}>
          <br />
          {this.props.is_authenticated ? (
            <Link to="/addpost">
              <Button variant="contained" color="primary">
                Add Post
              </Button>
            </Link>
          ) : (
            <Link to="/signup">
              <Button variant="contained" color="primary">
                Sign Up to Add Post
              </Button>
            </Link>
          )}
        </div>
        <TextField id="search" label="Search" margin="normal" onChange={this.handleSearch} />
        <hr />
        <hr />
        <div>
          {this.state.posts_search
            ? this.state.posts_search_motion.map((post: { pid: string }) => (
                <div>
                  <this.RenderPosts key={post.pid} post={post as any} />
                </div>
              ))
            : null}
        </div>

        <div style={{ opacity: this.state.opacity, transition: "opacity 2s ease" }}>
          <h1>Posts</h1>
          {/* <div>
            {this.state.posts
              ? this.state.posts_motion.map((post: { pid: string }) => (
                  <this.RenderPosts key={post.pid} post={post as any} />
                ))
              : null}
          </div> */}
          {/* //* Fixed */}
          <div>
            {this.state.posts
              ? this.state.posts.map((post: { pid: string }) => <this.RenderPosts key={post.pid} post={post as any} />)
              : null}
          </div>
        </div>
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={5}
          totalItemsCount={this.state.num_posts}
          pageRangeDisplayed={this.state.page_range}
          onChange={this.handlePageChange}
        />
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    posts: state.postsReducer.posts,
    is_authenticated: state.authReducer.is_authenticated,
    db_search_posts: state.postsReducer.db_search_posts,
  };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return {
    set_posts: (posts: string[]) => dispatch(ACTIONS.fetch_db_posts(posts)),
    search_posts_success: (posts: string[]) => dispatch(ACTIONS.fetch_search_posts(posts)),
    remove_search_posts: () => dispatch(ACTIONS.remove_search_posts()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
