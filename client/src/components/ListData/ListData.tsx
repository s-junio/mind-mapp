import React from 'react';
import Loader from '../Loader/Loader';
import './ListData.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

interface Project {
  id: string;
  title: string;
}

const ListData = (props: any) => {
  return (
    <div className="list-wrapper">
      {props.isLoading && <Loader></Loader>}
      <TransitionGroup>
        {props.list.map((item: Project) => (
          <CSSTransition key={item.id} classNames="item-tran" timeout={500}>
            <div className="list-item" key={item.id} tabIndex={0}>
              <span className="title">{item.title}</span>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default ListData;
