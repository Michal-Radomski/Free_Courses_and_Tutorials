import React from "react";

const CustomButton = ({ color = "initial" }: { color?: string }): JSX.Element => {
  return (
    <React.Fragment>
      <button className="custom-button" style={{ color: color }}>
        Custom button
      </button>
    </React.Fragment>
  );
};

export default CustomButton;
