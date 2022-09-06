import React from "react";

import "./App.scss";

function App(): JSX.Element {
  const [state, setState] = React.useState<{apiResponse: string}>({apiResponse: "none"});
  // console.log({state});

  const callApi = () => {
    fetch("/test")
      .then((response) => response.json())
      .then((data) => {
        // console.log({data});
        setState({apiResponse: data});
      })
      .catch((error) => console.error({error}));
  };

  React.useEffect(() => {
    setTimeout(() => {
      callApi();
    }, 2000);
  }, []);

  return (
    <React.Fragment>
      <h1 style={{textAlign: "center"}}>MERN App</h1>
      <p style={{textAlign: "center"}}>Current State: {state.apiResponse}</p>
    </React.Fragment>
  );
}

export default App;
