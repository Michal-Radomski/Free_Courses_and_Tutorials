import React from "react";
import axios from "axios";

class CreateComponent extends React.Component<Props, State> {
  constructor(props: Props) {
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
    await axios.post("/add", serverPort).then((res) => console.log(res.data));
    await this.setState({
      name: "",
      port: "",
    });
  };

  render() {
    return (
      <div style={{marginTop: 50}}>
        <h3>Add New Server</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Add Host Name: </label>
            <input type="text" value={this.state.name} className="form-control" onChange={this.onChangeHostName} />
          </div>
          <div className="form-group">
            <label>Add Server Port: </label>
            <input type="text" value={this.state.port} className="form-control" onChange={this.onChangePort} />
          </div>
          <div className="form-group">
            <input type="submit" value="Add Node server" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateComponent;
