import React, { useRef } from "react";
import "./Doc.css";
import { useStoreState } from "react-flow-renderer";
import type { Node } from "react-flow-renderer";

type DocProps = {
  style?: React.CSSProperties;
};

const Item = (props: any) => (
  <div id={props.id} className="item">
    <div className="section">
      <h1>{props.headerTitle}</h1>
      <span>{props.headerType}</span>
    </div>
    <p style={{ textAlign: "justify" }}>
      Excepteur veniam sunt qui exercitation enim occaecat aliquip est cillum ad
      ex occaecat ex. Lorem ad pariatur duis pariatur eu quis laboris ea. Elit
      ullamco aute id laborum. Culpa in reprehenderit fugiat culpa laboris
      mollit incididunt. Consequat et nisi sint dolore sit amet aliquip sit est
      commodo consectetur esse. Ex nisi exercitation sunt non ut commodo elit
      elit voluptate enim exercitation. Esse ea deserunt amet et amet do nostrud
      ullamco veniam ut nostrud. Deserunt commodo duis dolore ipsum ea eiusmod.
      Ad nostrud et Lorem occaecat culpa sunt eiusmod eu incididunt irure
      incididunt exercitation. Mollit officia mollit proident reprehenderit
      nostrud amet. Ad proident pariatur ad qui aliquip Lorem quis deserunt esse
      dolore ullamco exercitation laboris eu. Pariatur ullamco ullamco nulla
      occaecat veniam proident cupidatat pariatur proident sunt eu est. Eiusmod
      est proident anim ipsum ad magna nisi anim ea dolor in. Nostrud incididunt
      magna Lorem amet amet ad enim dolor esse. Amet tempor dolor et eiusmod
      incididunt proident aute in. Adipisicing sint in aliqua do est. Veniam do
      nostrud officia sint ipsum fugiat veniam minim. Incididunt quis laborum
      laborum nostrud in. Sunt pariatur nulla qui irure dolore eiusmod
      reprehenderit officia esse ad. Id commodo quis ut enim reprehenderit
      cillum cillum eiusmod aute non eiusmod. Occaecat Lorem qui qui elit
      officia incididunt labore laborum in sunt deserunt sint aliqua irure. Do
      laborum consequat id minim ad deserunt deserunt reprehenderit pariatur
      proident aliqua est anim. Consectetur veniam laborum excepteur id commodo
      dolore dolor Lorem nulla enim incididunt nisi voluptate. Nisi proident
      labore in sint nostrud nostrud voluptate ut elit mollit do. Eiusmod ea
      nostrud cupidatat nisi duis aliquip.
    </p>
  </div>
);

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

  const nodes = useStoreState((store: any) => store.nodes, compareNodes);

  const elem = useRef(null);
  const selectedElements = useStoreState(
    (store: any) => store.selectedElements
  );
  console.log(selectedElements);
  if (selectedElements && selectedElements[0]) {
    if (elem && elem.current) {
      const { children }: any = elem.current;
      const child = children.namedItem(selectedElements[0].id);
      child.scrollIntoView({ block: "start", behavior: "smooth" });
      child.classList.remove("scrolled-to");
      let scrollTimeout: any;
      const current: any = elem.current;
      const handleScroll = (e: any) => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function () {
          child.classList.add("scrolled-to");
          current.removeEventListener("scroll", handleScroll);
        }, 20);
      };
      current.addEventListener("scroll", handleScroll);
    }
  }

  return (
    <div className="doc" style={props.style} ref={elem}>
      {nodes && nodes[0] ? (
        nodes.map((node: any) => (
          <Item
            id={node.id}
            key={node.id}
            headerTitle={node.data.headerTitle}
            headerType={node.data.headerType}
          ></Item>
        ))
      ) : (
        <h3>*First add a node to the diagram to start*</h3>
      )}
    </div>
  );
};

export default Doc;
