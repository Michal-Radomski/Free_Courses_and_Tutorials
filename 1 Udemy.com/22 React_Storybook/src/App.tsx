import React from "react";

// Todo: refactor styles!
import "./App.scss";
import CustomButton from "./CustomButton";

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <CustomButton color={"darkmagenta"} />
      <br />
      <CustomButton />
    </React.Fragment>
  );
};

export default App;
