import React from "react";
import axios from "axios";

import "./App.scss";
import Item from "./Item";

interface ToDoItem {
  _id: string;
  text: string;
}

function App(): JSX.Element {
  const [text, setText] = React.useState<string>("");
  const [todo, setTodo] = React.useState<Array<ToDoItem>>([]);
  const [isUpdating, setUpdating] = React.useState<string>("");

  const getList = () => {
    axios
      .get("/api/get-todo")
      .then((res) => setTodo(res.data))
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    getList();
  }, []);

  const addUpdateTodo = () => {
    if (isUpdating === "") {
      axios
        .post("/api/save-todo", {text})
        .then((res) => {
          console.log(res.data);
          setText("");
        })
        .then(() => getList())
        .catch((err) => console.log(err));
    } else {
      axios
        .post("/api/update-todo", {_id: isUpdating, text})
        .then((res) => {
          console.log(res.data);
          setText("");
          setUpdating("");
        })
        .then(() => getList())
        .catch((err) => console.log(err));
    }
  };

  const deleteTodo = (_id: string) => {
    axios
      .post("/api/delete-todo", {_id})
      .then((res) => console.log(res.data))
      .then(() => getList())
      .catch((err) => console.log(err));
  };

  const updateTodo = (_id: string, text: string) => {
    setUpdating(_id);
    setText(text);
  };

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setTimeout(() => {
      addUpdateTodo();
    }, 300);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>ToDo App</h1>
        <div className="top">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Write Something..."
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
            <div className="add" onClick={addUpdateTodo}>
              {isUpdating ? "Update" : "Add"}
            </div>
          </form>
        </div>

        <div className="list">
          {todo.map((item: ToDoItem) => (
            <Item
              key={item._id}
              text={item.text}
              remove={() => deleteTodo(item._id)}
              update={() => updateTodo(item._id, item.text)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
