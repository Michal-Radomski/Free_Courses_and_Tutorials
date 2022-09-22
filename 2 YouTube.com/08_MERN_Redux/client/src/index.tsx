import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App";
import store from "./redux/store";
const Google_clientId = process.env.REACT_APP_Google_clientId as string;

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  // <React.StrictMode>
  <React.Fragment>
    <GoogleOAuthProvider clientId={Google_clientId}>
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </React.Fragment>
  // </React.StrictMode>
);
