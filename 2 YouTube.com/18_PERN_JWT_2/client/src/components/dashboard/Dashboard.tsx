import React from "react";
import { toast } from "react-toastify";

// Components
import InputTodo from "./todoList/InputTodo";
import ListTodos, { ToDo } from "./todoList/ListTodos";

const Dashboard = ({ setAuth }: { setAuth(arg0: boolean): void }): JSX.Element => {
  const [name, setName] = React.useState<string>("");
  const [allTodos, setAllTodos] = React.useState<Array<ToDo>>([]);
  const [todosChange, setTodosChange] = React.useState<boolean>(false);

  const getProfile = async () => {
    try {
      const res = await fetch("/api/dashboard/", {
        method: "GET",
        headers: { jwt_token: localStorage.jwt_token },
      });

      const parseData = await res.json();
      // console.log({ parseData });
      setName(parseData[0].user_name);
      setAllTodos(parseData);
    } catch (error) {
      console.error({ error });
    }
  };

  const logout = async (event: any) => {
    event.preventDefault();
    try {
      localStorage.removeItem("jwt_token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (error) {
      console.error({ error });
    }
  };

  React.useEffect(() => {
    getProfile();
    setTodosChange(false);
  }, [todosChange]);

  return (
    <React.Fragment>
      <div className="d-flex mt-5 justify-content-around">
        <h2>{name}'s Todo List</h2>
        <button onClick={(event) => logout(event)} className="btn btn-primary">
          Logout
        </button>
      </div>
      <InputTodo setTodosChange={setTodosChange} />
      <ListTodos allTodos={allTodos} setTodosChange={setTodosChange} />
    </React.Fragment>
  );
};

export default Dashboard;
