import React from "react";

const win: Window = window;

// * Proxy is only in dev mode!, in prod mode is ignored!

const InputTodo = (): JSX.Element => {
  const [description, setDescription] = React.useState<string>("");

  const onSubmitForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const body = { description };
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await console.log({ response });

      win.location = "/";
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <React.Fragment>
      <h1 className="text-center mt-5">Pern Stack App Todo List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </React.Fragment>
  );
};

export default InputTodo;
