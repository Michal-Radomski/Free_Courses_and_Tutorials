import React from "react";

export interface CustomButtonProps {
  color?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ color = "initial" }: { color?: string }): JSX.Element => {
  return (
    <React.Fragment>
      <button className="custom-button" style={{ color: color }}>
        Custom button
      </button>
    </React.Fragment>
  );
};

export default CustomButton;
