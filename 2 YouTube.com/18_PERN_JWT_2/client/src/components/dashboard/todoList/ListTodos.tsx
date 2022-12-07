import React from "react";

import EditTodo from "./EditTodo";

export interface ToDo {
  todo_id: number;
  description: string;
}

const ListTodos = (): JSX.Element => {
  // const [todos, setTodos] = React.useState<ToDo[]>([]);
  const [todos, setTodos] = React.useState<Array<ToDo>>([]);
  //  console.log({ todos });

  //* Delete todo function
  const deleteTodo = async (id: number) => {
    // console.log({ id });
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
      // console.log({ jsonData });

      setTodos(jsonData);
    } catch (error) {
      console.error({ error });
    }
  };

  React.useEffect(() => {
    getTodos();
  }, []);

  return (
    <React.Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>PSQL_ID</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo: ToDo) => (
            <tr key={todo.todo_id}>
              <td>{todo.todo_id}</td>
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
