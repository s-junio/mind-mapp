import React from 'react';
import './Edge.css';

const EdgeDefs: React.FC = () => {
  return (
    <>
      <marker
        id="edgeStart"
        viewBox="0 0 10 10"
        refX="5"
        refY="5"
        markerWidth="5"
        markerHeight="5"
      >
        <circle cx="5" cy="5" r="3" fill="#c9c9c9" />
      </marker>
      <marker
        id="edgeEnd"
        markerWidth="12.5"
        markerHeight="12.5"
        viewBox="-10 -10 20 20"
        orient="auto"
        refX="0"
        refY="0"
      >
        <polyline
          stroke="#c9c9c9"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          fill="none"
          points="-5,-4 0,0 -5,4"
        ></polyline>
      </marker>
    </>
  );
};

const Edge: React.FC = () => {
  const calcEdge = () => {
    //points
    const p1x = 25; //may have to use parseFloat
    const p1y = 50;
    const p2x = 25;
    const p2y = 100;

    // mid-point of line:
    var mpx = (p2x + p1x) * 0.5;
    var mpy = (p2y + p1y) * 0.5;

    // angle of perpendicular to line:
    const beta = Math.PI / 1.5;
    var theta = Math.atan2(p2y - p1y, p2x - p1x) + beta;

    // distance of control point from mid-point of line:
    var offset = 30;

    // location of control point:
    var c1x = mpx + (beta ? offset * Math.cos(theta) : 0);
    var c1y = mpy + (beta ? offset * Math.sin(theta) : 0);

    // construct the command to draw a quadratic curve
    var curve =
      'M' + p1x + ' ' + p1y + ' Q ' + c1x + ' ' + c1y + ' ' + p2x + ' ' + p2y;
    return curve;
  };
  return (
    <path
      d={calcEdge()}
      stroke="red"
      strokeWidth="2"
      strokeLinecap="round"
      fill="transparent"
      className="edge"
      markerStart="url(#edgeStart)"
      markerEnd="url(#edgeEnd)"
    ></path>
  );
};

export { Edge, EdgeDefs };
