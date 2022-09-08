import React from "react";
import axios from "axios";
import {History} from "history";
import {withRouter} from "react-router-dom";

class CreateComponent extends React.Component<{history: History}, State> {
  constructor(props: any) {
    super(props);

    //* Unnecessary
    // this.onChangeHostName = this.onChangeHostName.bind(this);
    // this.onChangePort = this.onChangePort.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      port: "",
    };
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
    // await console.log(`Name is ${this.state.name} and Port is ${this.state.port}`);

    const serverPort = {
      name: this.state.name,
      port: this.state.port,
    };
    // await console.log({serverPort});
    await axios.post("/add", serverPort).then((res) => {
      alert("Port was added successfully: " + res.data.serverPort.name + " : " + res.data.serverPort.port);
      // console.log(res.data);
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
        <h3>Add New Server Port</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Add Host Name: </label>
            <input type="text" value={this.state.name} className="form-control" onChange={this.onChangeHostName} />
          </div>
          <div className="form-group">
            <label>Add Server Port: </label>
            <input type="text" value={this.state.port} className="form-control" onChange={this.onChangePort} />
          </div>
          <br />
          <div className="form-group">
            <input type="submit" value="Add Port" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(CreateComponent as any);
