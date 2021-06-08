import React, { useState } from 'react';
import Doc from '../../components/Doc/Doc';
import MappFlow from '../../components/MappFlow/MappFlow';
import Dialog from '../../components/Dialog/Dialog';

import './Mapp.css';
import { ReactFlowProvider } from 'react-flow-renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDoubleLeft,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import Snackbar from '../../components/Snackbar/Snackbar';
import type { MessageInfo } from '../../components/Snackbar/Snackbar';

function Mapp() {
  const [showDialog, setShowDialog] = useState(false);
  const [snackInfo, setSnackInfo] = useState<MessageInfo | null>(null);
  const [isDocOpen, setIsDocOpen] = useState(false);
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  let nameInput: HTMLDivElement | null;

  const onDialogAction = () => {
    setShowDialog(!showDialog);
  };
  const onDialongCancel = () => {
    setShowDialog(!showDialog);
  };

  const enableEdit = () => {
    console.log(nameInput);
    if (nameInput) {
      nameInput.contentEditable = 'true';
      nameInput.focus();
      setIsEditEnabled(true);
    }
  };

  const inputOutOfFocus = () => {
    setIsEditEnabled(false);
    if (nameInput) {
      nameInput.contentEditable = 'false';
    }
    setIsFetching(true);
    setTimeout(() => {
      /* simulating service call  */
      setIsFetching(false);
      setSnackInfo({ message: 'Saved!' });
    }, 3000);
  };

  const handleDismiss = () => {
    setSnackInfo(null);
  };
  return (
    <div className="mapp">
      <div className={`mapp-header ${isFetching ? 'fetching' : ''}`}>
        <div className="title-input">
          <div
            className="input"
            contentEditable={false}
            onBlur={inputOutOfFocus}
            ref={(input) => {
              nameInput = input;
            }}
          >
            Untitled
          </div>
          <div className="actions">
            {!isEditEnabled && !isFetching && (
              <>
                <div onClick={enableEdit} className="action">
                  <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                </div>
                <div onClick={onDialogAction} className="action">
                  <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="mapp-content">
        <ReactFlowProvider>
          <MappFlow></MappFlow>
          <div
            className="separator"
            onClick={() => setIsDocOpen(!isDocOpen)}
            title={`${isDocOpen ? 'Hide' : 'Reveal'} Text View`}
          >
            <div className="icon">
              <FontAwesomeIcon
                icon={faAngleDoubleLeft}
                style={{
                  transform: `rotate(${isDocOpen ? '180deg' : '0deg'})`,
                }}
              ></FontAwesomeIcon>
            </div>
          </div>
          {isDocOpen && <Doc></Doc>}
        </ReactFlowProvider>
      </div>
      <Dialog
        show={showDialog}
        onAction={onDialogAction}
        onCancel={onDialongCancel}
      >
        Are you sure you want to delete this project?
      </Dialog>
      {snackInfo ? (
        <Snackbar
          handleDismiss={handleDismiss}
          messageInfo={snackInfo}
        ></Snackbar>
      ) : null}
    </div>
  );
}

export default Mapp;
