import React from "react";
import axios from "axios";
import {History} from "history";
import {withRouter} from "react-router-dom";

class EditComponent extends React.Component<{match: {params: {id: string}}; history: History}, State> {
  constructor(props: {match: {params: {id: string}}; history: History}) {
    super(props);
    this.state = {name: "", port: ""};
    // console.log("this.state:", this.state);
  }

  async componentDidMount() {
    await axios
      .get("/edit/" + this.props.match.params.id)
      .then((response) => {
        this.setState({name: response.data.serverPort.name, port: response.data.serverPort.port});
      })
      .catch(function (error) {
        console.log(error);
      });
    // await console.log("this.state:", this.state);
  }

  onChangeHostName = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      name: (event.target as HTMLInputElement).value,
    });
  };

  onChangePort = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      port: (event.target as HTMLInputElement).value,
    });
  };

  onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const serverPort = {
      name: this.state.name,
      port: this.state.port,
    };
    // await console.log({serverPort});
    await axios.post("/update/" + this.props.match.params.id, serverPort).then((res) => {
      alert("Port was edited successfully: " + res.data);
      // console.log(res.data)
    });
    await this.setState({
      name: "",
      port: "",
    });
    await setTimeout(() => {
      this.props.history.push("/index");
    }, 1000);
  };

  render() {
    return (
      <div style={{marginTop: 50}}>
        <h3>Edit Server Port</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Edit Host Name: </label>
            <input type="text" value={this.state.name} className="form-control" onChange={this.onChangeHostName} />
          </div>
          <div className="form-group">
            <label>Edit Server Port: </label>
            <input type="text" value={this.state.port} className="form-control" onChange={this.onChangePort} />
          </div>
          <br />
          <div className="form-group">
            <input type="submit" value="Update Port" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(EditComponent as any);
