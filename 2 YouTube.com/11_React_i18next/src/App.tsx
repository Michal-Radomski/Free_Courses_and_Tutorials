import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

const NotFound = (): JSX.Element => <h1 style={{ textAlign: "center", marginTop: "80px" }}>Page Not Found</h1>;

function App(): JSX.Element {
  return (
    <React.Suspense fallback={<h1 style={{ textAlign: "center", marginTop: "80px" }}>Loading...</h1>}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
}

export default App;
