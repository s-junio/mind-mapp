import React from "react";
import "./MButton.css";

type Button={ 
    handleClick:()=>void,
    label:string;
}


function MButton(props:Button) {
        
  return (
    <button onClick={props.handleClick} className="mbutton"><span>{props.label}</span></button>
  );
}
export default MButton;
