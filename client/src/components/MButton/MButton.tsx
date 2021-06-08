import React, { ButtonHTMLAttributes, MouseEventHandler } from 'react';
import Loader from '../Loader/Loader';
import './MButton.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  handleClick: MouseEventHandler<HTMLButtonElement>;
  label: string;
  loading?: boolean;
}

const MButton: React.FC<ButtonProps> = (props) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (ev) => {
    if (!props.loading) {
      props.handleClick(ev);
    }
  };
  return (
    <button onClick={handleClick} className="mbutton" {...props} data-loading={props.loading}>
      {props.loading ? <Loader></Loader> : <span>{props.label}</span>}
    </button>
  );
};
export default MButton;
