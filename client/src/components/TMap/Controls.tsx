import React, { useState } from 'react';
import './Controls.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretUp,
  faCompress,
  faMinus,
  faPlus,
  faUnlink,
} from '@fortawesome/free-solid-svg-icons';

interface ControlsProps {
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  handleRecenter: () => void;
  toggleAnimation: () => void;
}

const Controls: React.FC<ControlsProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const controls = [
    {
      id: 'control-zoomIn',
      title: 'Zoom In',
      handleClick: props.handleZoomIn,
      icon: faPlus,
    },
    {
      id: 'control-zoomOut',
      title: 'Zoom Out',
      handleClick: props.handleZoomOut,
      icon: faMinus,
    },
    {
      id: 'control-recenter',
      title: 'Recenter',
      handleClick: props.handleRecenter,
      icon: faCompress,
    },
    {
      id: 'control-animations',
      title: 'Animation',
      handleClick: props.toggleAnimation,
      icon: faUnlink,
    },
  ];

  const elementHeight = controls.length * 50 + 45 + 'px';

  return (
    <div
      className="controls-wrapper"
      style={{
        height: isOpen ? elementHeight : '50px',
        width: isOpen ? '60px' : '50px',
      }}
    >
      <button
        className={`control-drawer ${isOpen ? 'open' : null}`}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        title={isOpen ? 'Hide controls' : 'Reveal controls'}
      >
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <FontAwesomeIcon icon={faCaretUp}></FontAwesomeIcon>
      </button>
      {isOpen ? (
        <div className="controls">
          {controls.map((control) => (
            <button onClick={control.handleClick} title={control.title}>
              <FontAwesomeIcon icon={control.icon}></FontAwesomeIcon>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Controls;
