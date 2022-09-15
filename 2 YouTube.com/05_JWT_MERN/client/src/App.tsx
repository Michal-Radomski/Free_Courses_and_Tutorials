import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Secret from "./pages/Secret";

import "./App.scss";

function App(): JSX.Element {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Secret />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
