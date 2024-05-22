import React from "react";

import "./App.scss";
// import Header from "./Header";
import Navbar from "./components/Navbar";

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      {/* <Header /> */}
      <Navbar />
    </React.Fragment>
  );
};

export default App;
