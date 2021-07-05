import React, { useRef, useState } from 'react';
import './Doc.css';
import { useStoreActions, useStoreState } from 'react-flow-renderer';
import type { Node } from 'react-flow-renderer';

type DocProps = {
  style?: React.CSSProperties;
};

const Item = (props: any) => {
  const [edit, setEdit] = useState(false);
  const setElements = useStoreActions((store: any) => store.setElements);
  const [nodes, edges] = useStoreState((store: any) => [
    store.nodes,
    store.edges,
  ]);

  let level = props.level || 1;
  const nextLevel = level + 1;

  const renderBasedOnLevel = (lvl: number) => {
    switch (lvl) {
      case 1:
        return <h1>{props.headerTitle}</h1>;
      case 2:
        return <h2>{props.headerTitle}</h2>;
      case 3:
        return <h3>{props.headerTitle}</h3>;
      case 4:
        return <h4>{props.headerTitle}</h4>;
      case 5:
        return <h5>{props.headerTitle}</h5>;
      default:
        return <h6>{props.headerTitle}</h6>;
    }
  };

  const handleEdit = () => {
    setEdit(true);
  };
  const handleBlur = (ev: any) => {
    const newData = [];
    for (let i in nodes) {
      const node = nodes[i];
      if (node.id === props.id) {
        node.data.text = ev.target.value;
      }
      newData.push(node);
    }

    setElements([...newData, ...edges]);
    setEdit(false);
  };

  return (
    <div id={`item-${props.id}`} className="item">
      <div className="section">{renderBasedOnLevel(level)}</div>
      {!edit ? (
        <p style={{ textAlign: 'justify' }} onDoubleClick={handleEdit}>
          {props.text}
        </p>
      ) : (
        <textarea
          autoFocus={true}
          onBlur={handleBlur}
          defaultValue={props.text}
        />
      )}
      <div className="outline-helper">
        {props.children &&
          props.children.map((child: Node) => (
            <Item
              id={child.id}
              key={child.id}
              headerTitle={child.data.headerTitle}
              headerType={child.data.headerType}
              children={child.data.children}
              level={nextLevel}
              text={child.data.text}
            ></Item>
          ))}
      </div>
    </div>
  );
};

const Doc: React.FC<DocProps> = (props) => {
  const compareNodes = (prev: Array<Node>, next: Array<Node>): boolean => {
    if (prev.length !== next.length) return false;
    let areEqual = true;
    for (let i = 0; i < prev.length; i++) {
      if(prev[i].__rf.position.x === next[i].__rf.position.x || prev[i].__rf.position.y === next[i].__rf.position.y){
          areEqual = false;
          break;
      }
    }
    return areEqual;
  };
  const parseNodes = function (nodes: Node[]) {
    const hardCopy = [...nodes];
    const nodeObj: any = {};
    for (let i in hardCopy) {
      const node: Node = hardCopy[i];
      nodeObj[node.id] = node;
    }
    const nodesParsed = [];

    function getChildren(child: any) {
      let obj;
      if (typeof child === 'object') {
        obj = child;
      } else {
        obj = nodeObj[child];
      }
      if (obj && obj.data.children && obj.data.children.length) {
        obj.data.children = obj.data.children.map(getChildren);
      }
      return obj;
    }
    for (let i in hardCopy) {
      const node = hardCopy[i];
      if (!node.data.parent) {
        nodesParsed.push(getChildren(node.id));
      }
    }
    return nodesParsed;
  };

  const nodes = useStoreState(
    (store: any) => parseNodes(store.nodes),
    compareNodes
  );

  const selectedElements = useStoreState(
    (store: any) => store.selectedElements
  );
  const elem = useRef(null);
  if (elem && selectedElements && selectedElements[0]) {
    const selectedElem = document.getElementById(
      `item-${selectedElements[0].id}`
    );
    if (selectedElem) {
      selectedElem.scrollIntoView({ block: 'start', behavior: 'smooth' });
      selectedElem.classList.remove('scrolled-to');
      let scrollTimeout: ReturnType<typeof setTimeout>;
      const current: any = elem.current;
      const handleScroll = (e: any) => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function () {
          selectedElem.classList.add('scrolled-to');
          current.removeEventListener('scroll', handleScroll);
        }, 20);
      };
      current.addEventListener('scroll', handleScroll);
    }
  }

  return (
    <div className="doc" style={props.style} ref={elem}>
      <div className="outline-helper">
        {nodes && nodes[0] ? (
          nodes.map((node: any) => (
            <Item
              id={node.id}
              key={node.id}
              headerTitle={node.data.headerTitle}
              headerType={node.data.headerType}
              children={node.data.children}
              text={node.data.text}
            ></Item>
          ))
        ) : (
          <h3>*First add a node to the diagram to start*</h3>
        )}
      </div>
    </div>
  );
};

export default Doc;
