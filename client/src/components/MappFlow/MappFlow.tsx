import React from "react";
import "./MappFlow.css";
import ReactFlow, {
  Handle,
  Position,
  Controls,
  Background,
  MiniMap,
  BackgroundVariant,
  ArrowHeadType,
} from "react-flow-renderer";
import type { NodeProps } from "react-flow-renderer";

const CustomNodeComponent = ({ data }: NodeProps) => {
  return (
    <div className="custom-node">
      <div className="header">{data.title}</div>
      <div className="content">
        <div>{data.text}</div>
        <Handle
          type="target"
          id="a"
          position={Position.Left}
          style={{ borderRadius: 0, top: "70%" }}
        />
        <Handle
          type="source"
          position={Position.Right}
          id="b"
          style={{ borderRadius: "50%", top: "70%" }}
        />
      </div>
    </div>
  );
};

function MappFlow() {
  /* Flow renderer */
  const elements = [
    {
      id: "2",
      type: "special",
      position: { x: 10, y: 10},
      data: { text: "Introduction", title: "Chapter 1" },
    },
    {
      id: "3",
      type: "special",
      position: { x: 300, y: 10 },
      data: { text: "Objectivess", title: "Chapter 2" },
    },
    {
      id: "e1-2",
      type: "smoothstep",
      source: "2",
      target: "3",
      animated: true,
      arrowHeadType: ArrowHeadType.ArrowClosed,
    },
  ];
  return (
    <ReactFlow
      snapToGrid={true}
      snapGrid={[50, 50]}
      elements={elements}
      defaultPosition={[100, 300]}
      nodeTypes={{ special: CustomNodeComponent }}
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
          if (n.type === "input") return "#0041d0";
          if (n.type === "output") return "#ff0072";
          if (n.type === "special") return "#1a192b";

          return "#eee";
        }}
        /*  nodeColor={(n) => {
                if (n.style?.background) return n.style.background;
  
                return "#fff";
              }} */
        nodeBorderRadius={2}
      />
    </ReactFlow>
  );
}

export default MappFlow;
