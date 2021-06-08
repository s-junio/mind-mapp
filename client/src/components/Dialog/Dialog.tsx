import React from 'react';
import './Dialog.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

type DialogProps = {
  show: boolean;
  onAction: (ev: React.MouseEvent) => void;
  onCancel: () => void;
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
      <div className="dialog">
        {props.children}
        <div className="buttons">
          <button onClick={onAction}>
            Yes
            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
          </button>
          <button onClick={props.onCancel} className="cancel">
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
