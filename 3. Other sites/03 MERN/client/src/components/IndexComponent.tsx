import React from "react";
import axios from "axios";

import TableRow from "./TableRow";

export default class IndexComponent extends React.Component<Props[], {serverPorts: ServerPort[] | null}> {
  constructor(props: Props[]) {
    super(props);
    this.state = {serverPorts: null};
  }

  async componentDidMount() {
    await axios
      .get("/getall")
      .then((response) => {
        // console.log("response.data.serverPorts:", response.data.serverPorts);
        this.setState({serverPorts: response.data.serverPorts});
      })
      .catch(function (error) {
        console.log({error});
      });
  }

  // componentDidUpdate() {
  //   console.log("this.state:", this.state.serverPorts);
  // }

  tabRow() {
    return this.state?.serverPorts?.map(function (object: ServerPort, i: number) {
      return <TableRow obj={object} key={i} />;
    });
  }

  render() {
    return (
      <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Port</td>
              <td>Edit</td>
              <td>Delete</td>
            </tr>
          </thead>
          <tbody>{this.tabRow()}</tbody>
        </table>
      </div>
    );
  }
}
