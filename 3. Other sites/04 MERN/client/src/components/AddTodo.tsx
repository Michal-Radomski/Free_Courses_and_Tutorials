import React from "react";

type Props = {
  saveTodo: (event: React.FormEvent, formData: ITodo | any) => void;
};

const AddTodo: React.FC<Props> = ({saveTodo}) => {
  const [formData, setFormData] = React.useState<ITodo | {}>();

  const handleForm = (event: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [event.currentTarget.id]: event.currentTarget.value,
    });
  };

  return (
    <form className="Form" onSubmit={(event) => saveTodo(event, formData)}>
      <div>
        <div>
          <label htmlFor="name">Name</label>
          <input onChange={handleForm} type="text" id="name" />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input onChange={handleForm} type="text" id="description" />
        </div>
      </div>
      <button disabled={formData === undefined ? true : false}>Add Todo</button>
    </form>
  );
};

export default AddTodo;
