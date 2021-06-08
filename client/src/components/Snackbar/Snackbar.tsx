import {
  faExclamationTriangle,
  faInfoCircle,
  faTimes,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import './Snackbar.css';

export interface MessageInfo {
  message: string;
  severity?: string;
  timeout?: number;
  autoDismiss?: boolean;
}

interface SnackbarProps {
  handleDismiss: () => void;
  messageInfo: MessageInfo;
}

const Snackbar: React.FC<SnackbarProps> = (props) => {
  const RADIUS = 22;
  const CIRCUNFERENCE = RADIUS * 2 * Math.PI;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let counter = 1;

    if (props.messageInfo.autoDismiss !== false) {
      const time = props.messageInfo.timeout || 3500;
      console.log(counter);
      const interval = window.setInterval(() => {
        setProgress(Math.min((210 * counter) / time, 1));
        counter += 1;
      }, 200);
      const timeout = window.setTimeout(() => {
        props.handleDismiss();
        window.clearInterval(interval);
      }, time);

      return () => {
        window.clearInterval(interval);
        window.clearTimeout(timeout);
      };
    }
  }, []);

  const getSeverityColor = ()=> {
    const severity = props.messageInfo.severity;
    if (severity === 'error') return 'var(--alert)';
    else if (severity === 'warning') return 'var(--warning)';
    else return 'var(--info)';
  }

  const Icon = (() => {
    const severity = props.messageInfo.severity;
    if (severity === 'error') return faTimesCircle;
    else if (severity === 'warning') return faExclamationTriangle;
    else return faInfoCircle;
  })();

  return (
    <div className="snackbar">
      <div>
        <div className="icon-space" style={{backgroundColor: getSeverityColor()}}>
          <FontAwesomeIcon icon={Icon}></FontAwesomeIcon>
        </div>
        {props.messageInfo.message}
      </div>
      <div className="dismiss" onClick={props.handleDismiss}>
        <svg className="progress-ring" width="60" height="60">
          <circle
            className="progress-ring__circle"
            stroke="white"
            strokeWidth="3"
            strokeDashoffset={CIRCUNFERENCE - progress * CIRCUNFERENCE}
            strokeDasharray={`${CIRCUNFERENCE} ${CIRCUNFERENCE}`}
            fill="transparent"
            r={RADIUS}
            cx="30"
            cy="30"
          />
        </svg>
        <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
      </div>
    </div>
  );
};

export default Snackbar;
