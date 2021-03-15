import React from "react";
import {CSSTransition} from 'react-transition-group';
import "./Dialog.css";
type DialogProps = {
  show: boolean;
  onAction: (ev: React.MouseEvent) => void;
};

const Dialog: React.FC<DialogProps> = (props) => {
  const onAction = (ev: React.MouseEvent) => {
    props.onAction && props.onAction(ev);
  };
  if (!props.show) {
    return null;
  }
  return (
    <div className="dialog-wrapper">
      <CSSTransition timeout={200} classNames="my-node">
        <div className="dialog">
          {props.children}
          <button onClick={onAction}>Yes</button>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Dialog;
