import React from "react";
import "./Doc.css";

type DocProps = {
  style?: React.CSSProperties
}



const Doc = (props: DocProps) => {
  return (
    <div className="doc" style={props.style}>
      <div className="section">
        <h1>Introduction</h1>
        <span>Chapter 1</span>
      </div>

      <p style={{ textAlign: "justify" }}>
        Excepteur in aute sunt consectetur. Incididunt excepteur sit sint tempor
        laborum elit ipsum commodo mollit nostrud. Quis non ut qui in non
        pariatur cillum deserunt. Id deserunt excepteur nulla officia
        consectetur qui aliqua mollit.
      </p>
      <div className="section">
        <h1>Objectives</h1>
        <span>Chapter 2</span>
      </div>

      <p style={{ textAlign: "justify" }}>
        Labore occaecat duis est minim ex elit ut velit. In velit quis nisi duis
        eu est esse ipsum sint non. Minim aute sit anim labore aliquip laborum
        incididunt eu occaecat amet exercitation. Lorem nostrud qui laborum est
        labore qui est veniam consequat ea incididunt deserunt. Enim voluptate
        adipisicing fugiat voluptate labore mollit irure enim amet Lorem ullamco
        occaecat esse. Lorem qui velit nisi duis et culpa pariatur. Est
        incididunt tempor elit Lorem duis proident dolor Lorem amet.
      </p>
    </div>
  );
};

export default Doc;
