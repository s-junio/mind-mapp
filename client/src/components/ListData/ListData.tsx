import React, { useState } from 'react';
import Loader from '../Loader/Loader';
import './ListData.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faArrowCircleRight,
  faSadTear,
} from '@fortawesome/free-solid-svg-icons';

interface Coords {
  x: number;
  y: number;
}

interface Project {
  id: string;
  title: string;
  handleArrow: (id: string, coords: Coords) => void;
  handleDelete: (id: string) => Promise<boolean>;
}

const ItemData: React.FC<Project> = (props) => {
  const [isRemoving, setIsRemoving] = useState<boolean>(false);

  const handleArrow: React.MouseEventHandler = (event) => {
    const coords: Coords = {
      x: event.clientX,
      y: event.clientY,
    };
    props.handleArrow(props.id, coords);
  };

  const handleDelete: React.MouseEventHandler = async () => {
    if (!isRemoving) {
      setIsRemoving(true);
      try {
        await props.handleDelete(props.id);
      } catch (error) {
        throw new Error(error);
      }
    }
  };
  return (
    <div className="list-item" key={props.id} tabIndex={0}>
      <div className="pre-title">
        {isRemoving ? <Loader></Loader> : <div className="circle"></div>}
      </div>
      <span className="title">{props.title}</span>
      {isRemoving ? (
        <></>
      ) : (
        <div className="buttons">
          <>
            <div onClick={handleDelete} className="button">
              <FontAwesomeIcon icon={faTrash} />
            </div>
            <div onClick={handleArrow} className="button">
              <FontAwesomeIcon icon={faArrowCircleRight} />
            </div>
          </>
        </div>
      )}
    </div>
  );
};

const ListData = (props: any) => {
  return (
    <div className="list-wrapper">
      {props.isLoading && <Loader></Loader>}
      {!props.isLoading && !props.list.length ? (
        <div className="no-data">
          <FontAwesomeIcon icon={faSadTear}></FontAwesomeIcon>
          <div>No projects found</div>
        </div>
      ) : null}
      <TransitionGroup>
        {props.list.map((item: Project) => (
          <CSSTransition key={item.id} classNames="item-tran" timeout={500}>
            <ItemData
              id={item.id}
              title={item.title}
              key={item.id}
              handleArrow={props.handleArrow}
              handleDelete={props.handleDelete}
            ></ItemData>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default ListData;
