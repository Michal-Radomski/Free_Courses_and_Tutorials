import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { TableBody, TableCell, TableHead, TableRow, Table } from "@mui/material";

import * as ACTIONS from "../redux/actions";
import history from "../utils/history";
import { AppDispatch, RootState } from "../Interfaces";

interface CustomProps {
  db_profile: [{ uid: string; username: string }];
  message: {
    mid: string;
    message_sender: string;
    message_title: string;
    message_body: string;
    date_created: string;
  };
  set_user_messages(arg0: RootState): void;
  user_messages: RootState;
}

class ShowMessages extends React.Component<CustomProps, RootState> {
  componentDidMount() {
    const username = this.props.db_profile[0].username;
    axios
      .get("/api/get/usermessages", { params: { username: username } })
      .then((res) => this.props.set_user_messages(res.data))
      .catch(function (error) {
        console.log(error);
      });
  }

  RenderMessages = (props: RootState) => (
    <TableRow>
      <TableCell>
        <p>
          {" "}
          <strong>From: </strong> {props.message.message_sender}{" "}
        </p>
        <p>
          {" "}
          <strong>Title </strong> {props.message.message_title}{" "}
        </p>
        <p>
          <strong> Message:</strong> {props.message.message_body}{" "}
        </p>
        <small> {props.message.date_created} </small>
        <br />
        <Link to={{ pathname: "/replytomessage", state: { props } }}>
          <button>Reply</button>
        </Link>
        <button onClick={() => this.DeleteMessage(props.message.mid)}> Delete </button>
        <br />
        <br />
        <button onClick={() => history.goBack()}> Cancel </button>
      </TableCell>
    </TableRow>
  );

  DeleteMessage = (mid: string) => {
    axios
      .delete("/api/delete/usermessage", { data: { mid: mid } })
      .then((res) => console.log({ res }))
      .catch(function (error) {
        console.log({ error });
      })
      .then(() =>
        setTimeout(function () {
          history.replace("/");
        }, 700)
      );
  };

  render() {
    return (
      <div>
        <div className="FlexRow">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  {" "}
                  <strong> Messages </strong>{" "}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.user_messages
                ? this.props.user_messages.map((message: RootState) => (
                    <this.RenderMessages key={message.mid} message={message} />
                  ))
                : null}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    db_profile: state.authReducer.db_profile,
    user_messages: state.userReducer.UserMessages,
  };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return {
    set_user_messages: (messages: RootState) => dispatch(ACTIONS.set_user_messages(messages)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowMessages);
