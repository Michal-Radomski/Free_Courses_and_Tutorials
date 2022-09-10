import React from "react";

const Item = ({text, remove, update}: {text: string; remove: () => void; update: () => void}): JSX.Element => {
  return (
    <React.Fragment>
      <div className="item">
        <div className="text">{text}</div>
        <div className="icons">
          <i className="ri-pencil-fill" onClick={update}></i>
          <i className="ri-delete-bin-7-fill" onClick={remove}></i>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Item;
