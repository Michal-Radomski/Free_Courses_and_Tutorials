import React from "react";

import "./App.scss";
import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";

function App(): JSX.Element {
  return (
    <React.Fragment>
      <div className="container">
        <InputTodo />
        <ListTodos />
      </div>
    </React.Fragment>
  );
}

export default App;
