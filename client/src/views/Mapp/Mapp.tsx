import React, { useState } from "react";
import Doc from "../../components/Doc/Doc";
import MappFlow from "../../components/MappFlow/MappFlow";
import Dialog from "../../components/Dialog/Dialog";

import "./Mapp.css";
import { ReactFlowProvider } from "react-flow-renderer";

function Mapp() {
  const [showDialog, setShowDialog] = useState(false);
  const onDialogAction = () => {
    setShowDialog(!showDialog);
  };
  return (
    <div className="mapp">
      <div className="mapp-header">
        <h1>Untitled</h1>
        <button onClick={onDialogAction}>Delete!!!</button>
      </div>
      <div className="mapp-content">
        <ReactFlowProvider>
          <MappFlow></MappFlow>
          {/* <div className="seperator"></div> */}
          <Doc></Doc>
        </ReactFlowProvider>
      </div>
      <Dialog show={showDialog} onAction={onDialogAction}>
        Are you sure you want to delete this project?
      </Dialog>
    </div>
  );
}

export default Mapp;
