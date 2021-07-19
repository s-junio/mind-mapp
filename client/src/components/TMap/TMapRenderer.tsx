import React, {
  MouseEventHandler,
  PropsWithChildren,
  useRef,
  useState,
  WheelEventHandler,
} from 'react';
import Controls from './Controls';
import { Edge, EdgeDefs } from './Edge';
import Node from './Node';
import './TMapRenderer.css';

type Coordinates = {
  x: number;
  y: number;
};

interface GroupProps {
  zoomScale: number;
  coordinates: Coordinates;
  className: string;
}
const Group = (props: PropsWithChildren<GroupProps>) => {
  const getTransformation = () => {
    //matrix (zoom, skew, skew, zoom, panX, panY)
    return `matrix(${props.zoomScale},0,0,${props.zoomScale},${props.coordinates.x},${props.coordinates.y})`;
  };
  return (
    <g transform={getTransformation()} className={props.className}>
      {props.children}
    </g>
  );
};

interface TMapProps {
  setActions: (actions: Actions) => void;
}

const TMap: React.FC<TMapProps> = (props) => {
  const ZOOM_STEPS = 0.3;
  const MAX_ZOOM_OUT = 5;

  const MAX_COORD_X = 2000;
  const MAX_COORD_Y = 2000;

  const ref = useRef({
    isDragging: false,
    prevMouseX: 0,
    prevMouseY: 0,
  });

  const [isDragging, setIsDragging] = useState(false);
  const [zoomScale, setZoomScale] = useState(MAX_ZOOM_OUT / 2);

  const [coordinates, setCoordinates] = useState({
    x: 0,
    y: 0,
  });

  const handleMouseDown: MouseEventHandler = (ev) => {
    ref.current.prevMouseX = ev.screenX;
    ref.current.prevMouseY = ev.screenY;
    setIsDragging(true);
  };

  const handleMouseMove: MouseEventHandler = (ev) => {
    if (isDragging) {
      const translationX = ev.screenX - ref.current.prevMouseX;
      const translationY = ev.screenY - ref.current.prevMouseY;

      ref.current.prevMouseX = ev.screenX;
      ref.current.prevMouseY = ev.screenY;

      let newX = coordinates.x + translationX;
      let newY = coordinates.y + translationY;
      setCoordinates({
        x: newX,
        y: newY,
      });
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleScroll: WheelEventHandler = (ev) => {
    if (ev.deltaY < 0) {
      executeZoomIn();
    } else if (ev.deltaY > 0) {
      executeZoomOut();
    }
  };

  const executeZoomIn = () => {
    let newScale = zoomScale + ZOOM_STEPS;
    if (newScale > MAX_ZOOM_OUT) newScale = MAX_ZOOM_OUT;
    setZoomScale(newScale);
  };
  const executeZoomOut = () => {
    let newScale = zoomScale - ZOOM_STEPS;
    if (newScale <= 0) newScale = ZOOM_STEPS;
    setZoomScale(newScale);
  };

  const executeRecenter = () => {
    setZoomScale(1);
    setCoordinates({
      x: 200,
      y: 50,
    });
  };

  props.setActions({
    handleZoomIn: executeZoomIn,
    handleZoomOut: executeZoomOut,
    handleRecenter: executeRecenter,
  });

  return (
    <div
      className="map-renderer-wrapper"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseLeave}
      onMouseLeave={handleMouseLeave}
      onWheel={handleScroll}
    >
      <svg style={{ width: '100%', height: '100%' }} height="500">
        <defs>
          <EdgeDefs></EdgeDefs>
        </defs>
        <Group
          coordinates={coordinates}
          zoomScale={zoomScale}
          className={isDragging ? '' : 'not-dragging'}
        >
          <pattern
            id="pattern-49629"
            x="8.742847705710636"
            y="0.659261499618033"
            width="10.556063286183162"
            height="10.556063286183162"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="0.2639015821545791"
              cy="0.2639015821545791"
              r="0.2639015821545791"
              fill="#a6a4a4"
            ></circle>
          </pattern>
          <rect
            x={-MAX_COORD_X}
            y={-MAX_COORD_Y}
            width={MAX_COORD_X * 2}
            height={MAX_COORD_Y * 2}
            fill="url(#pattern-49629)"
          ></rect>
        </Group>
        <Group
          coordinates={coordinates}
          zoomScale={zoomScale}
          className={isDragging ? '' : 'not-dragging'}
        >
          <Node position={{ x: 0, y: 50 }} color="red"></Node>
          <Node position={{ x: 0, y: 120 }} color="blue"></Node>
          <Edge></Edge>
        </Group>
      </svg>
    </div>
  );
};

interface Actions {
  handleZoomIn?: () => void;
  handleZoomOut?: () => void;
  handleRecenter?: () => void;
}

const TMapRenderer: React.FC = () => {
  const [isAnimated, setIsAnimated] = useState(true);

  let mapActions: Actions = {};
  const setActions = (actions: Actions) => {
    mapActions = actions;
  };

  const handleZoomIn = () => {
    if (mapActions.handleZoomIn) {
      mapActions.handleZoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapActions.handleZoomOut) {
      mapActions.handleZoomOut();
    }
  };

  const handleRecenter = () => {
    if (mapActions.handleRecenter) {
      mapActions.handleRecenter();
    }
  };

  const toggleAnimation = () => {
    setIsAnimated(!isAnimated);
  };

  return (
    <div className={isAnimated ? 'animated' : undefined}>
      <TMap setActions={setActions} />
      <Controls
        handleZoomIn={handleZoomIn}
        handleZoomOut={handleZoomOut}
        handleRecenter={handleRecenter}
        toggleAnimation={toggleAnimation}
      ></Controls>
    </div>
  );
};

export default TMapRenderer;
