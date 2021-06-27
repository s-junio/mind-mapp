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
  _id: string;
  title: string;
  modified: string;
  handleArrow: (id: string, coords: Coords) => void;
  handleDelete: (id: string) => Promise<boolean>;
}

function timeSince(dateString: string) {
  const date = new Date(dateString).getTime();
  let seconds = Math.floor((Date.now() - date) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    const d = Math.floor(interval);
    return d + ' year' + (d > 1 ? 's': '');
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    const d = Math.floor(interval);
    return d + ' month' + (d > 1 ? 's': '');
  }
  interval = seconds / 86400;
  if (interval > 1) {
    const d = Math.floor(interval);
    return d + ' day' + (d > 1 ? 's': '');
  }
  interval = seconds / 3600;
  if (interval > 1) {
    const d = Math.floor(interval);
    return d + ' hour' + (d > 1 ? 's': '');
  }
  interval = seconds / 60;
  if (interval > 1) {
    const d = Math.floor(interval);
    return d + ' minute' + (d > 1 ? 's': '');
  }
  return Math.floor(seconds) + ' seconds';
}

const ItemData: React.FC<Project> = (props) => {
  const [isRemoving, setIsRemoving] = useState<boolean>(false);

  const handleArrow: React.MouseEventHandler = (event) => {
    const coords: Coords = {
      x: event.clientX,
      y: event.clientY,
    };
    props.handleArrow(props._id, coords);
  };

  const handleDelete: React.MouseEventHandler = async () => {
    if (!isRemoving) {
      setIsRemoving(true);
      try {
        await props.handleDelete(props._id);
      } catch (error) {
        throw new Error(error);
      }
    }
  };

  return (
    <div className="list-item" key={props._id} tabIndex={0}>
      <div className="pre-title">
        {isRemoving ? <Loader></Loader> : <div className="circle"></div>}
      </div>
      <div className="title-wrapper">
        <span className="title">{props.title}</span>
        <span>{`Last Updated: ${timeSince(props.modified)} ago`}</span>
      </div>
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
          <CSSTransition
            key={'tran-' + item._id}
            classNames="item-tran"
            timeout={500}
          >
            <ItemData
              _id={item._id}
              title={item.title}
              key={item._id}
              handleArrow={props.handleArrow}
              handleDelete={props.handleDelete}
              modified={item.modified}
            ></ItemData>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default ListData;
