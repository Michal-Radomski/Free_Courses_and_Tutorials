import React from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { connect } from "react-redux";

import history from "../utils/history";
import { RootState } from "../Interfaces";

interface CustomProps {
  db_profile: [{ uid: string; username: string }];
}

class AddPost extends React.Component<CustomProps, {}> {
  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user_id = this.props.db_profile[0].uid;
    const username = this.props.db_profile[0].username;
    const data = {
      // @ts-ignore
      title: (event.target as HTMLFormElement).title.value,
      body: (event.target as HTMLFormElement).body.value,
      username: username,
      uid: user_id,
    };
    // console.log({ data });

    axios
      .post("/api/post/posttodb", data)
      .then((response) => console.log(response))
      .catch((err) => console.log(err))
      .then(() => setTimeout(() => history.replace("/"), 700));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextField id="title" label="Title" margin="normal" />
          <br />
          <TextField id="body" label="Body" multiline maxRows="4" margin="normal" />
          <br />
          <button type="submit"> Submit </button>
        </form>
        <br />
        <button onClick={() => history.replace("/posts")}> Cancel </button>
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    db_profile: state.authReducer.db_profile,
  };
}

export default connect(mapStateToProps, null)(AddPost);
