import React, { useState } from 'react';

import './MappFlow.css';
import ReactFlow, {
  Handle,
  Position,
  Controls,
  Background,
  MiniMap,
  BackgroundVariant,
  ArrowHeadType,
  useStoreState,
  removeElements,
} from 'react-flow-renderer';
import type { Node, NodeProps } from 'react-flow-renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faEdit,
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const RainbowButtons = () => (
  <div className="rainbow-buttons">
    <div className="rainbow-button">
      <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
    </div>
    <div className="rainbow-button">
      <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
    </div>
    <div className="rainbow-button">
      <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
    </div>
    <div className="rainbow-button">
      <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
    </div>
  </div>
);
const CustomNodeComponent = ({ data, selected }: NodeProps) => {
  const [, , zoom] = useStoreState((state: any) => state.transform);
  const showContent = zoom >= 0.6;
  return (
    <div
      className={`custom-node react-flow__node-default ${
        showContent || 'zoomed-out'
      }`}
      data-title={data.headerType}
      style={{ backgroundColor: data.color }}
    >
      {selected && <RainbowButtons></RainbowButtons>}
      <div>{showContent ? data.headerTitle : data.headerType}</div>
      <Handle
        type="target"
        id="a"
        position={Position.Left}
        style={{ borderRadius: 0 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        style={{ borderRadius: '50%' }}
      />
    </div>
  );
};

function MappFlow() {
  const query = useQuery();

  console.log(query.get("id")) // load data with this id
  /* Flow renderer */
  const initialElements = [
    {
      id: '1',
      type: 'special',
      position: { x: 10, y: 10 },
      data: {
        headerTitle: 'Introdução',
        headerType: 'Chapter 1',
        children: ['11', '12', '13'],
      },
    },
    {
      id: '2',
      type: 'special',
      position: { x: 300, y: 10 },
      data: { headerTitle: 'Estado da Arte', headerType: 'Chapter 2' },
    },
    {
      id: '3',
      type: 'special',
      position: { x: 600, y: 10 },
      data: { headerTitle: 'Design e implementacao', headerType: 'Chapter 3' },
    },
    {
      id: '11',
      type: 'special',
      position: { x: 10, y: 200 },
      data: {
        headerTitle: 'Motivação',
        headerType: 'Sub 1',
        color: '#FC5130',
        parent: '1',
      },
    },
    {
      id: '12',
      type: 'special',
      position: { x: 300, y: 200 },
      data: {
        headerTitle: 'Organização',
        headerType: 'Sub 2',
        color: '#FC5130',
        parent: '1',
      },
    },
    {
      id: '13',
      type: 'special',
      position: { x: 600, y: 200 },
      data: {
        headerTitle: 'Objetivos',
        headerType: 'Sub 3',
        color: '#FC5130',
        parent: '1',
      },
    },
    {
      id: 'e1-2',
      type: 'smoothstep',
      source: '1',
      target: '2',
      animated: true,
      arrowHeadType: ArrowHeadType.ArrowClosed,
    },
    {
      id: 'e2-3',
      type: 'smoothstep',
      source: '2',
      target: '3',
      animated: true,
      arrowHeadType: ArrowHeadType.ArrowClosed,
    },
    {
      id: 'e11-12',
      type: 'smoothstep',
      source: '11',
      target: '12',
      animated: true,
      arrowHeadType: ArrowHeadType.ArrowClosed,
    },
    {
      id: 'e12-13',
      type: 'smoothstep',
      source: '12',
      target: '13',
      animated: true,
      arrowHeadType: ArrowHeadType.ArrowClosed,
    },
    {
      id: 'e1-e11',
      type: 'smoothstep',
      source: '1',
      target: '11',
      animated: true,
      arrowHeadType: ArrowHeadType.ArrowClosed,
    },
  ];
  const [elements, setElements] = useState(initialElements);

  const onLoad = (reactFlowInstance: any) => {
    reactFlowInstance.fitView();
  };

  const onElementsRemove = (elementsToRemove: any) => {
    const removeFunc: any = (els: any) => removeElements(elementsToRemove, els);
    setElements(removeFunc);
  };

  /* const selectedNode = useStoreState((state:any) => state.selectedElements && state.selectedElements[0]); */
  return (
    <>
      <ReactFlow
        snapToGrid={true}
        snapGrid={[50, 50]}
        elements={elements}
        nodeTypes={{ special: CustomNodeComponent }}
        onLoad={onLoad}
        onElementsRemove={onElementsRemove}
        onNodeContextMenu={console.log}
      >
        <Controls showInteractive={false} />
        <Background
          color="#aaa"
          gap={32}
          size={0.1}
          variant={BackgroundVariant.Lines}
        />
        <MiniMap
          nodeStrokeColor={(n: any) => {
            if (n.style?.background) return n.style.background;
            if (n.type === 'input') return '#0041d0';
            if (n.type === 'output') return '#ff0072';
            if (n.type === 'special') return '#1a192b';

            return '#eee';
          }}
          nodeColor={(n: Node<any>) => n.data.color || '#fff'}
          nodeBorderRadius={2}
        />
      </ReactFlow>
    </>
  );
}

export default MappFlow;
