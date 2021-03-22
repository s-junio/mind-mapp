import React from "react";
import "./MInput.css";
export const MInput: React.FC<React.InputHTMLAttributes<any>> = (props) => {
  return (
    <div className="m-input">
      <input {...props} placeholder="..."></input>
      <label htmlFor={props.id} className="label">
        <span className="label-content">
          {props.name}
        </span>
      </label>
    </div>
  );
};
