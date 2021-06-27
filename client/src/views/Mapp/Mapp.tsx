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
import DataManager from '../../DataManager';
import { useHistory } from 'react-router-dom';

const DataManagerInstance = DataManager.Instance;

function Mapp() {
  const [showDialog, setShowDialog] = useState(false);
  const [snackInfo, setSnackInfo] = useState<MessageInfo | null>(null);
  const [isDocOpen, setIsDocOpen] = useState(false);
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [projectTitle, setProjectTitle] = useState('Untitled');
  const [projectId, setProjectId] = useState('');

  const history = useHistory();

  const enableDelete = () => {
    setShowDialog(!showDialog);
  };

  const onDialogAction = () => {
    setShowDialog(!showDialog);
    DataManagerInstance.removeProject(projectId);
    history.push(`/mapp`);
  };
  const onDialogCancel = () => {
    setShowDialog(!showDialog);
  };

  const enableEdit = () => {
    setIsEditEnabled(true);
  };

  const inputOutOfFocus = async (ev: any) => {
    setIsEditEnabled(false);
    setProjectTitle(ev.target.value);

    if (projectId) {
      setIsFetching(true);
      try {
        await DataManagerInstance.setProjectTitle(projectId, ev.target.value);
        setSnackInfo({ message: 'Project title changed.' });
      } catch (err) {
        setSnackInfo({ message: err, severity: 'error' });
      } finally {
        setIsFetching(false);
      }
    } else {
      // while the project has no ID just change the variable
    }
  };

  const handleDismiss = () => {
    setSnackInfo(null);
  };
  return (
    <div className="mapp">
      <div className={`mapp-header ${isFetching ? 'fetching' : ''}`}>
        <div className="title-input">
          {isEditEnabled ? (
            <input
              className="input"
              autoFocus={true}
              defaultValue={projectTitle}
              onBlur={inputOutOfFocus}
            />
          ) : (
            <div className="input">{projectTitle}</div>
          )}
          <div className="actions">
            {!isEditEnabled && !isFetching && (
              <>
                <div onClick={enableEdit} className="action">
                  <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                </div>
                {projectId ? (
                  <div onClick={enableDelete} className="action">
                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="mapp-content">
        <ReactFlowProvider>
          <MappFlow
            projectTitle={projectTitle}
            projectTitleSetter={setProjectTitle}
            fetcher={[isFetching, setIsFetching]}
            projectIdent={[projectId, setProjectId]}
          ></MappFlow>
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
        onCancel={onDialogCancel}
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
