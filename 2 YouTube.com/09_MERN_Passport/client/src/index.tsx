import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import Context from "./Context";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Context>
      <App />
    </Context>
  </React.StrictMode>
);
