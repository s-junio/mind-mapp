import {
  faCheckCircle,
  faExclamationTriangle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import './MInput.css';

export interface Valid {
  type: string;
  message?: string;
}

interface MInputProps extends React.InputHTMLAttributes<HTMLElement> {
  validation?: (value: string) => Valid | boolean;
}

const MInput: React.FC<MInputProps> = (props) => {
  const [valid, setValid] = useState<Valid | boolean>(false);
  const runValidation: React.FocusEventHandler<HTMLInputElement> = (ev) => {
    if (props.validation) {
      const value = ev.target.value;
      setValid(props.validation(value));
    } else {
      setValid(true);
    }
  };

  const getMessage = () => {
    if (typeof valid === 'object') {
      if (valid.message) {
        return valid.message;
      }
      return 'default message';
    }
    return null;
  };

  const getIcon = () => {
    if (typeof valid === 'object') {
      const type = valid.type;
      if (type === 'valid') {
        return <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>;
      } else if (type === 'invalid') {
        return <FontAwesomeIcon icon={faTimesCircle}></FontAwesomeIcon>;
      } else if (type === 'warning') {
        return <FontAwesomeIcon icon={faExclamationTriangle}></FontAwesomeIcon>;
      }
    }
    return null;
  };
  return (
    <div
      className={`m-input ${valid !== false ? 'run-validation' : ''}`}
      style={props.style}
    >
      <input {...props} placeholder="..." onBlur={runValidation}></input>
      <label htmlFor={props.id} className="label">
        <span className="label-content">
          {props.name}
          <span>
            {valid ? (
              <>
                <>{getIcon()}</> <>{getMessage()}</>
              </>
            ) : null}
          </span>
        </span>
      </label>
    </div>
  );
};

export default MInput;
