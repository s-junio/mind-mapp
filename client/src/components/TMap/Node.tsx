import React, { useRef, useState } from 'react';
import './Node.css';

interface NodeProps {
  position: {
    x: number;
    y: number;
  };
  color?: string;
}

const Node: React.FC<NodeProps> = (props) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({
    x: props.position.x,
    y: props.position.y,
  });

  const ref = useRef({
    prevPosition: {
      x: 0,
      y: 0,
    },
  });

  const handleClick: React.MouseEventHandler = (ev) => {
    ref.current.prevPosition = {
      x: ev.clientX,
      y: ev.clientY,
    };
    setIsDragging(true);
  };

  const getTransformation = () => {
    //matrix (zoom, skew, skew, zoom, panX, panY)
    return `matrix(1,0,0,1,${position.x},${position.y})`;
  };

  const handleMove: React.MouseEventHandler = (ev) => {
    if (isDragging) {
      console.log('oi');
      const xDiff = ref.current.prevPosition.x - ev.pageX;
      const yDiff = ref.current.prevPosition.y - ev.pageY;

      ref.current.prevPosition = {
        x: ev.clientX,
        y: ev.clientY,
      };

      console.log(xDiff);
      setPosition({
        x: position.x - xDiff,
        y: position.y - yDiff,
      });
      ev.stopPropagation();
    }
  };
  const handleLeave = () => {
    setIsDragging(false);
  };
  return (
      <g style={{ transform: getTransformation() }} role="img">
        <rect
          /* onMouseDown={handleClick}
          onMouseMove={handleMove}
          onMouseUp={handleLeave}
          onMouseLeave={handleLeave} */
          width="80"
          height="50"
          fill={props.color}
          x={position.x}
          y={position.y}
        ></rect>
      </g>
  );
};

export default Node;
