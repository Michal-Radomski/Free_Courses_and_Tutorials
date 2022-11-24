import React from "react";
import axios from "axios";

import "./App.scss";

function App(): JSX.Element {
  const [hello, setHello] = React.useState<string>("");

  //* componentDidMount
  React.useEffect(() => {
    axios
      .get("/api/hello")
      .then((response) => {
        console.log(response.data);
        setHello(response.data.msg);
      })
      .catch((error) => {
        console.log({ error });
      });
  });

  return (
    <React.Fragment>
      PERN App
      <br />
      {hello}
    </React.Fragment>
  );
}

export default App;
