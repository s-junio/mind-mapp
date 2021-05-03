import React, { useRef } from 'react';
import './Doc.css';
import { useStoreState } from 'react-flow-renderer';
import type { Node } from 'react-flow-renderer';

type DocProps = {
  style?: React.CSSProperties;
};

const Item = (props: any) => {
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

  return (
    <div id={`item-${props.id}`} className="item">
      <div className="section">{renderBasedOnLevel(level)}</div>
      <p style={{ textAlign: 'justify' }}>
        officia incididunt labore laborum in sunt deserunt sint aliqua irure. Do
        laborum consequat id minim ad deserunt deserunt reprehenderit pariatur
        proident aliqua est anim. Consectetur veniam laborum excepteur id
        commodo dolore dolor Lorem nulla enim incididunt nisi voluptate. Nisi
        proident labore in sint nostrud nostrud voluptate ut elit mollit do.
        Eiusmod ea nostrud cupidatat nisi duis aliquip.
      </p>
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
      if (prev[i].data !== next[i].data) {
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
      if (obj.data.children) {
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
    console.log(nodesParsed);
    return nodesParsed;
  };

  const nodes = useStoreState(
    (store: any) => parseNodes(store.nodes),
    compareNodes
  );

  const exportDoc = function () {
    const docElem: any = elem.current;

    if (docElem.innerHTML) {
      console.log(docElem);
      const header =
        "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
        "xmlns:w='urn:schemas-microsoft-com:office:word' " +
        "xmlns='http://www.w3.org/TR/REC-html40'>" +
        "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
      const footer = '</body></html>';
      const sourceHTML = header + docElem.innerHTML + footer;
      console.log(nodes);
      const source =
        'data:application/vnd.ms-word;charset=utf-8,' +
        encodeURIComponent(sourceHTML);
      const fileDownload = document.createElement('a');
      document.body.appendChild(fileDownload);
      fileDownload.href = source;
      fileDownload.download = 'document.docx';
      fileDownload.click();
      document.body.removeChild(fileDownload);
    }
  };

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
      let scrollTimeout: any;
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
      <button onClick={exportDoc}>Download</button>
      <div className="outline-helper">
        {nodes && nodes[0] ? (
          nodes.map((node: any) => (
            <Item
              id={node.id}
              key={node.id}
              headerTitle={node.data.headerTitle}
              headerType={node.data.headerType}
              children={node.data.children}
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
