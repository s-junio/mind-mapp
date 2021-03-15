import React, { useState } from "react";
import Doc from "../../components/Doc/Doc";
import MappFlow from "../../components/MappFlow/MappFlow";
import Dialog from "../../components/Dialog/Dialog";
import "./Mapp.css";

function Mapp() {
  const [showDialog, setShowDialog] = useState(true);
  const onDialogAction = () => {
    setShowDialog(!showDialog);
  };
  return (
    <div className="mapp">
      <button onClick={onDialogAction}>CLICK!!!</button>
      <div className="mapp-header">
        <h1>Untitled</h1>
      </div>
      <div className="mapp-content">
        <MappFlow></MappFlow>
        {/* <div className="seperator"></div> */}
        <Doc></Doc>
      </div>
      <Dialog show={showDialog} onAction={onDialogAction}>
        Do you want to delete this project?
      </Dialog>
    </div>
  );
}

export default Mapp;
