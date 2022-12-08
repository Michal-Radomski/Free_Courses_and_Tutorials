import React from "react";

import EditTodo from "./EditTodo";

export interface ToDo {
  todo_id: number;
  description: string;
  user_name: string;
}

const ListTodos = ({
  allTodos,
  setTodosChange,
}: {
  allTodos: ToDo[];
  setTodosChange: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => {
  // const [todos, setTodos] = React.useState<ToDo[]>([]);
  const [todos, setTodos] = React.useState<Array<ToDo>>([]);
  // console.log({ allTodos });

  //* Delete todo function
  const deleteTodo = async (id: number) => {
    // console.log({ id });
    try {
      await fetch(`/api/dashboard/todos/${id}`, {
        method: "DELETE",
        headers: { jwt_token: localStorage.jwt_token },
      });
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (error) {
      console.error({ error });
    }
  };

  React.useEffect(() => {
    setTodos(allTodos);
  }, [allTodos]);

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
          {todos.length !== 0 &&
            todos[0].todo_id !== null &&
            todos.map((todo: ToDo) => (
              <tr key={todo.todo_id}>
                <td>{todo.todo_id}</td>
                <td>{todo.description}</td>
                <td>
                  <EditTodo todo={todo} setTodosChange={setTodosChange} />
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
