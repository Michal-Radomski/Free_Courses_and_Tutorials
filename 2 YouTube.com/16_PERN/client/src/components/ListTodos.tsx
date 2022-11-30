import React from "react";

import EditTodo from "./EditTodo";

export interface ToDo {
  todo_id: number;
  description: string;
}

const ListTodos = (): JSX.Element => {
  const [todos, setTodos] = React.useState<Array<ToDo>>([]);

  // Delete todo function
  const deleteTodo = async (id: number) => {
    try {
      const deleteTodo = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });
      console.log({ deleteTodo });
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (error) {
      console.error({ error });
    }
  };

  const getTodos = async () => {
    try {
      const response = await fetch("/api/todos");
      const jsonData = await response.json();

      setTodos(jsonData);
    } catch (error) {
      console.error({ error });
    }
  };

  React.useEffect(() => {
    getTodos();
  }, []);

  console.log({ todos });

  return (
    <React.Fragment>
      {" "}
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default ListTodos;
