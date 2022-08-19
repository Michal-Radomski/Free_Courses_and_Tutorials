// +One file React App in TSX

// Import the React and ReactDom libraries
import React from "react";
import ReactDOM from "react-dom/client";

//* Install: npm install --save-dev @types/webpack-env
if (module.hot) {
  module.hot.accept();
}

import {consoleLog} from "./index2";
consoleLog();

console.log(consoleLog, typeof consoleLog);

// Create a React Component
const App = (): JSX.Element => {
  return <h1>Hi there - from React!</h1>;
};

// Take the React Component and show it on the show

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
