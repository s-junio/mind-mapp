import React from "react";
import "./Switcher.css";

function Switcher(props: any) {
  return (
    <label className="switch">
      <input type="checkbox" onClick={props.switchHandler}></input>
      <span className="slider round"></span>
    </label>
  );
}

export default Switcher;
