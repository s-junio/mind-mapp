import React, { MouseEventHandler } from 'react';
import Loader from '../Loader/Loader';
import './ListData.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';

interface Coords {
  x: number;
  y: number;
}

interface Project {
  id: string;
  title: string;
  handleArrow: (id: string, coords: Coords) => void;
}

const ItemData: React.FC<Project> = (props) => {
  const handleArrow: React.MouseEventHandler = (event) => {
    const coords: Coords = {
      x: event.clientX,
      y: event.clientY,
    };
    props.handleArrow(props.id, coords);
  };
  return (
    <div className="list-item" key={props.id} tabIndex={0}>
      <span className="title">{props.title}</span>
      <div className="buttons">
        <div>
          <FontAwesomeIcon icon={faTrash} />
        </div>
        <div onClick={handleArrow}>
          <FontAwesomeIcon icon={faArrowCircleRight} />
        </div>
      </div>
    </div>
  );
};

const ListData = (props: any) => {
  return (
    <div className="list-wrapper">
      {props.isLoading && <Loader></Loader>}
      <TransitionGroup>
        {props.list.map((item: Project) => (
          <CSSTransition key={item.id} classNames="item-tran" timeout={500}>
            <ItemData
              id={item.id}
              title={item.title}
              key={item.id}
              handleArrow={props.handleArrow}
            ></ItemData>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default ListData;
