import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import TextField from "@mui/material/TextField";

import { RootState } from "../Interfaces";
import history from "../utils/history";

interface CustomProps {
  location: RootState;
  db_profile: [{ uid: string; username: string }];
}

class EditPost extends React.Component<CustomProps, RootState> {
  constructor(props: CustomProps) {
    super(props);

    this.state = {
      title: "",
      body: "",
    };
  }

  componentDidMount() {
    this.setState({
      title: this.props.location.state.post.post.title,
      body: this.props.location.state.post.post.body,
    });
  }

  handleTitleChange = (event: { target: { value: string } }) => {
    this.setState({ title: event.target.value });
  };

  handleBodyChange = (event: { target: { value: string } }) => {
    this.setState({ body: event.target.value });
  };

  handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const user_id = this.props.db_profile[0].uid;
    const username = this.props.db_profile[0].username;
    const pid = this.props.location.state.post.post.pid;
    // @ts-ignore
    const title = event.target.title.value;
    // @ts-ignore
    const body = event.target.body.value;

    const data = {
      title: title,
      body: body,
      pid: pid,
      uid: user_id,
      username: username,
    };
    // console.log({data})
    axios
      .put("/api/put/post", data)
      .then((res) => console.log({ res }))
      .catch((err) => console.log({ err }))
      .then(() => setTimeout(() => history.replace("/profile"), 700));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextField id="title" label="title" margin="normal" value={this.state.title} onChange={this.handleTitleChange} />
          <br />
          <TextField
            id="body"
            label="body"
            multiline
            rows="4"
            margin="normal"
            value={this.state.body}
            onChange={this.handleBodyChange}
          />
          <br />
          <button type="submit"> Submit </button>
        </form>
        <br />
        <button onClick={() => history.goBack()}> Cancel </button>
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    db_profile: state.authReducer.db_profile,
  };
}

export default connect(mapStateToProps)(EditPost);
