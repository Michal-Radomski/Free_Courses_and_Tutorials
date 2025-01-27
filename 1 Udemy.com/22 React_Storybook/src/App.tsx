import React from "react";

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
