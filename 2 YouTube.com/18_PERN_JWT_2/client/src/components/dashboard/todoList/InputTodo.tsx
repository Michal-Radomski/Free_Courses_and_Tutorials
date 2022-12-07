import React from "react";

const InputTodo = (): JSX.Element => {
  const [description, setDescription] = React.useState<string>("");

  const onSubmitForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("jwt_token", localStorage.jwt_token);

    try {
      const body = { description };
      const response = await fetch("/api/dashboard/todos", {
        method: "POST",
        // headers: { "Content-Type": "application/json" },
        headers: myHeaders,
        body: JSON.stringify(body),
      });
      const parseResponse = await response.json();
      console.log({ parseResponse });
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
