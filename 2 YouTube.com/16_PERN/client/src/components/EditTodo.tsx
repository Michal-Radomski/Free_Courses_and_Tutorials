import React from "react";

import { ToDo } from "./ListTodos";

const win: Window = window;

const EditTodo = ({ todo }: { todo: ToDo }): JSX.Element => {
  // console.log({ todo });
  const [description, setDescription] = React.useState<string>(todo.description);
  // console.log({ description });

  //* Edit description function
  const updateDescription = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const body = { description };
      const response = await fetch(`/api/todos/${todo.todo_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log({ response });
      win.location = "/";
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <React.Fragment>
      <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${todo.todo_id}`}>
        Edit
      </button>

      {/* //* Reset description */}
      <div className="modal" id={`id${todo.todo_id}`} onClick={() => setDescription(todo.description)}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              {/* //* Reset description */}
              <button type="button" className="close" data-dismiss="modal" onClick={() => setDescription(todo.description)}>
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={(event) => updateDescription(event)}
              >
                Edit
              </button>
              {/* //* Reset description */}
              <button
                type="button"
                className="btn btn-info"
                data-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EditTodo;
