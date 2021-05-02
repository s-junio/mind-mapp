import React, { useEffect, useRef, useState } from "react";
import "./Card.css";

type CardProps = {
  name: string;
  desc: string;
  image: any;
};

export default (props: CardProps) => {
  //Movement Animation to happen
  const card: any = useRef(null);

  const [isHover, setIsHover] = useState(false);
  const [coords, setCoords] = useState({xAxis: 0, yAxis: 0});

 
  //Moving Animation Event
  /*   if (card.current) {
    card.current.addEventListener("mousemove", (e: any) => {
      // Get the bounding rectangle of target
      const { left, top } = card.current.getBoundingClientRect();

      // Mouse position
      const x = e.clientX - left;
      const y = e.clientY - top;

      const height = 600;
      const width = 400;
      let xAxis = (x - width / 2) / 25;
      let yAxis = (y - height / 2) / 25;

      card.current.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
  } */

  const mousemove = (e: any) => {

    const { left, top } = card.current.getBoundingClientRect();

    // Mouse position
    const x = e.clientX - left;
    const y = e.clientY - top;

    const height = 700;
    const width = 500;
    let xAxis = (x - width / 2) / 25;
    let yAxis = (y - height / 2) / 25;
    setCoords({
      xAxis,
      yAxis
    });
  };
 
  //Animate In
  const mouseEnter = (e: any) => {
    setIsHover(true);
  };
  //Animate Out
  const mouseLeave = (e: any) => {
    setIsHover(false);
    setCoords({
      xAxis: 0,
      yAxis: 0
    });
  };

  return (
    <div
      className={`card ${isHover ? "enter" : ""}`}
      ref={card}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      onMouseMove={mousemove}
      style={{transform: `rotateY(${coords.xAxis}deg) rotateX(${coords.yAxis}deg)`}}
    >
      <div className="profilepic">
        <div className="circle"></div>
        <img src={props.image} alt="User Photo" />
      </div>
      <div className="info">
        <h1 className="title">{props.name}</h1>
        <h3>{props.desc}</h3>
        <div className="contact">
          <button>Contact</button>
        </div>
      </div>
    </div>
  );
};
