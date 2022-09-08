import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";

class TableRow extends React.Component<{obj: {_id: string; name: string; port: number}}, {}> {
  delete = () => {
    axios
      .delete("/delete/" + this.props.obj._id)
      .then(() => {
        // console.log("Port was deleted with this id:", this.props.obj._id)
        alert("Port was deleted with this id: " + this.props.obj._id);
      })
      .then(() => window.location.reload())
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <tr>
        <td>{this.props.obj._id}</td>
        <td>{this.props.obj.name}</td>
        <td>{this.props.obj.port}</td>
        <td>
          {/* <button className="btn btn-primary">Edit</button> */}
          <Link to={"/edit/" + this.props.obj._id} className="btn btn-primary">
            Edit
          </Link>
        </td>
        <td>
          <button className="btn btn-danger" onClick={this.delete}>
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default TableRow;
