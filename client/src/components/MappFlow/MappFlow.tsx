import React, { useContext, useEffect, useState } from "react";

import "./MappFlow.css";
import ReactFlow, {
  Handle,
  Position,
  Controls,
  Background,
  MiniMap,
  BackgroundVariant,
  ArrowHeadType,
  useStoreState,
  useStoreActions,
} from "react-flow-renderer";
import type { Node, NodeProps } from "react-flow-renderer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faArrowRight,
  faArrowDown,
  faFileWord,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import {
  Document,
  Packer,
  Paragraph,
  HeadingLevel,
  AlignmentType,
  LevelFormat,
} from "docx";
import DataManager from "../../DataManager";
import { UserInfoContext } from "../../UserInfoProvider";
import Snackbar from "../../components/Snackbar/Snackbar";
import type { MessageInfo } from "../../components/Snackbar/Snackbar";

const DataManagerInstance = DataManager.Instance;

const COLORS = [undefined, "#FC5130", "#57A773", "#694D75", "#4E4D5C"];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

interface RainbowButtonsProps {
  nodeId: string;
  onAddSameLevel: () => void;
  onAddLevelBellow: () => void;
  onRemove: () => void;
  onEdit: () => void;
  showAddRight?: boolean;
}

const RainbowButtons: React.FC<RainbowButtonsProps> = ({
  onAddSameLevel,
  onAddLevelBellow,
  onRemove,
  onEdit,
  showAddRight,
}) => {
  return (
    <div className="rainbow-buttons">
      <div className="rainbow-button" onClick={onEdit} title="Edit">
        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
      </div>
      <div className="rainbow-button" onClick={onRemove} title="Remove">
        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
      </div>
      <div
        className="rainbow-button"
        onClick={onAddSameLevel}
        title="Add Bellow"
      >
        <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
      </div>
      {showAddRight ? (
        <div
          className="rainbow-button"
          onClick={onAddLevelBellow}
          title="Add Right"
        >
          <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
        </div>
      ) : null}
    </div>
  );
};

const generateUniqueId = () => "id" + new Date().getTime();

const CustomNodeComponent = ({ id, data, selected, xPos, yPos }: NodeProps) => {
  const setElements = useStoreActions((store: any) => store.setElements);
  const [nodes, edges] = useStoreState((store: any) => [
    store.nodes,
    store.edges,
  ]);

  const onAddLevelBellow = () => {
    const newId = generateUniqueId();

    let pos: any = {
      x: 0,
      y: 0,
    };

    const newNodes = [];

    for (let i in nodes) {
      const node = nodes[i];
      if (node.id === id) {
        if (!node.data.children) {
          node.data.children = [];
        }
        node.data.children.push(newId);
        console.log(node);
        pos.x = node.__rf.position.x + 100;
        pos.y = node.__rf.position.y;
      }
      newNodes.push(node);
    }

    const newLvl: number = data.level + 1;

    const newChild = {
      id: newId,
      type: "special",
      position: {
        x: pos.x,
        y: pos.y,
      },
      data: {
        headerTitle: `${getHeaderType(data.level)} 1`,
        level: newLvl,
        index: 0,
        children: [],
        color: COLORS[newLvl],
        parent: id,
      },
    };

    newNodes.push(newChild);
    edges.push({
      id: `e${id}-${newId}`,
      type: "smoothstep",
      source: id,
      target: newId,
      sourceHandle: "c",
      animated: true,
      arrowHeadType: ArrowHeadType.ArrowClosed,
    });

    setElements([...newNodes, ...edges]);
  };
  const onEdit = () => {
    setIsEditing(true);
  };

  const getChildrenIds: any = (children: any) => {
    let childrenArray = [];
    for (let j in children) {
      const child = children[j];
      const node = nodes.find((f: any) => f.id === child);
      if (node) {
        childrenArray.push(node.id);
        if (node.data.children && node.data.children.length) {
          childrenArray = [
            ...childrenArray,
            ...getChildrenIds(node.data.children),
          ];
        }
      }
    }
    return childrenArray;
  };
  const onRemove = () => {
    const childrenToRemove = getChildrenIds(data.children);

    const test = [...nodes];
    let replaceSource;
    let replaceTarget;
    const newElements = [];
    //evaluate nodes
    for (let i in test) {
      const element = test[i];
      if (element.id === data.parent) {
        element.data.children = element.data.children.filter(
          (c: any) => c !== id
        );
      }
      /* if (element.data.children && element.data.children.length) {
        element.data.children = element.data.children.filter(
          (c: any) => c !== data.id
        );
      } */
      if (
        element.type === "special" &&
        element.data &&
        element.data.level === data.level
      ) {
        if (element.data.index === data.index - 1) {
          replaceSource = element.id;
        } else if (element.data.index === data.index + 1) {
          replaceTarget = element.id;
        }
        if (element.data.index !== data.index) {
          newElements.push(element);
        }
        if (element.data.index > data.index) {
          element.data.index -= 1;
        }
      } else if (childrenToRemove.indexOf(element.id) === -1) {
        newElements.push(element);
      }
    }

    const newEdges = [];
    //evaluate edges
    for (let i in edges) {
      const edge = edges[i];
      if (
        edge.source !== replaceSource &&
        edge.target !== replaceTarget &&
        childrenToRemove.indexOf(edge.source) === -1 &&
        childrenToRemove.indexOf(edge.target) === -1
      ) {
        newEdges.push(edge);
      }
    }
    if (replaceSource && replaceTarget) {
      newEdges.push({
        id: `e${replaceSource}-${replaceTarget}`,
        type: "smoothstep",
        source: replaceSource,
        target: replaceTarget,
        animated: true,
        arrowHeadType: ArrowHeadType.ArrowClosed,
      });
    }
    if (data.parent && data.index === 0) {
      newEdges.push({
        id: `e${data.parent}-${replaceTarget}`,
        type: "smoothstep",
        source: data.parent,
        target: replaceTarget,
        sourceHandle: "c",
        animated: true,
        arrowHeadType: ArrowHeadType.ArrowClosed,
      });
    }
    setElements([...newElements, ...newEdges]);
  };
  const onAddSameLevel = () => {
    const newElements = [];
    const newIndex = data.index + 1;
    const replaceCoords = {
      x: xPos,
      y: (yPos || 0) + 100,
    };

    let replaceColor = data.color;
    const replaceSource = id;
    let replaceTarget;

    const test = [...nodes];

    const newId = generateUniqueId();

    //evaluate nodes
    for (let i in test) {
      const element = test[i];
      if (data.parent && element.id === data.parent) {
        element.data.children.push(newId);
      }
      if (
        element.type === "special" &&
        element.data &&
        element.data.level === data.level
      ) {
        if (element.data.index === newIndex) {
          replaceTarget = element.id;
          replaceCoords.x = element.__rf.position.x;
          replaceCoords.y = element.__rf.position.y;
          replaceColor = element.data.color;
        }
        if (element.data.index >= newIndex) {
          element.data.index += 1;
          element.position.y += 100;
          element.__rf.position.y += 100;
        }
      }
      newElements.push(element);
    }

    newElements.push({
      id: newId,
      type: "special",
      position: {
        x: replaceCoords.x,
        y: replaceCoords.y,
      },
      data: {
        headerTitle: `${getHeaderType(data.level)} ${newIndex + 1}`,
        level: data.level,
        index: newIndex,
        children: [],
        color: replaceColor,
      },
    });

    const newEdges = [];
    //evaluate edges
    for (let i in edges) {
      const edge = edges[i];
      if (edge.source !== replaceSource || edge.target !== replaceTarget) {
        newEdges.push(edge);
      }
    }
    if (replaceSource) {
      newEdges.push({
        id: `e${replaceSource}-${newId}`,
        type: "smoothstep",
        source: replaceSource,
        target: newId,
        animated: true,
        arrowHeadType: ArrowHeadType.ArrowClosed,
      });
    }
    if (replaceTarget) {
      newEdges.push({
        id: `e${newId}-${replaceTarget}`,
        type: "smoothstep",
        source: newId,
        target: replaceTarget,
        animated: true,
        arrowHeadType: ArrowHeadType.ArrowClosed,
      });
    }

    setElements([...newElements, ...newEdges]);
  };

  const [, , zoom] = useStoreState((state: any) => state.transform);
  const showContent = zoom >= 0.6;

  const getHeaderType = (level: number) => {
    const HEADER_TYPES = ["Chapter", "Section", "Subsection", "Subsubsection"];
    if (level < HEADER_TYPES.length) {
      return HEADER_TYPES[level];
    }
    return `Header${level + 1}`;
  };

  const [isEditing, setIsEditing] = useState(false);

  const saveEdit = (ev: any) => {
    const updated = nodes.map((node: any) => {
      if (node.id === id) {
        node.data.headerTitle = ev.target.value;
      }
      return node;
    });
    setElements([...updated, ...edges]);
    setIsEditing(false);
  };
  return (
    <div
      className={`custom-node react-flow__node-default ${
        showContent || "zoomed-out"
      }`}
      data-title={`${getHeaderType(data.level)} ${data.index + 1}`}
      style={{ backgroundColor: data.color }}
    >
      {selected && (
        <RainbowButtons
          nodeId={id}
          onAddLevelBellow={onAddLevelBellow}
          onEdit={onEdit}
          onRemove={onRemove}
          onAddSameLevel={onAddSameLevel}
          showAddRight={data.children?.length ? false : true}
        ></RainbowButtons>
      )}
      <div>
        {isEditing ? (
          <input
            className="input-node"
            type="text"
            onBlur={saveEdit}
            autoFocus={true}
            defaultValue={data.headerTitle}
          />
        ) : (
          <>
            {showContent
              ? data.headerTitle
              : `${getHeaderType(data.level)} ${data.index + 1}`}
          </>
        )}
      </div>
      {data.index ? (
        <Handle
          type="target"
          id="a"
          position={Position.Top}
          style={{ borderRadius: 0 /* display: 'none' */ }}
        />
      ) : null}

      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={{ borderRadius: "50%" }}
      />
      {data.children?.length ? (
        <Handle
          type="source"
          position={Position.Right}
          id="c"
          style={{ borderRadius: "50%" }}
        />
      ) : null}
      {data.parent && !data.index ? (
        <Handle
          type="target"
          position={Position.Left}
          id="d"
          style={{ borderRadius: 0 }}
        />
      ) : null}
    </div>
  );
};

const HeaderButtons = (props: any) => {
  const [userInfo] = useContext(UserInfoContext);
  const [nodes, edges] = useStoreState((store: any) => [
    store.nodes,
    store.edges,
  ]);
  const [isFetching, setIsFetching] = props.fetcher;
  const [snackInfo, setSnackInfo] = useState<MessageInfo | null>(null);
  const [projectId, setProjectId] = props.projectIdent;

  const getHeaderLevel = (level: number) => {
    let headerLevel;
    switch (level) {
      case 0:
        headerLevel = HeadingLevel.HEADING_1;
        break;
      case 1:
        headerLevel = HeadingLevel.HEADING_2;
        break;
      case 2:
        headerLevel = HeadingLevel.HEADING_3;
        break;
      case 3:
        headerLevel = HeadingLevel.HEADING_4;
        break;
      case 4:
        headerLevel = HeadingLevel.HEADING_5;
        break;
      case 5:
        headerLevel = HeadingLevel.HEADING_6;
        break;
      default:
        headerLevel = HeadingLevel.TITLE;
        break;
    }
    return headerLevel;
  };

  const handleSave = async () => {
    setIsFetching(true);
    try {
      const saved: any = await DataManagerInstance.saveProject(
        projectId,
        props.projectTitle,
        [...nodes, ...edges]
      );
      setSnackInfo({ message: `Project '${saved.title}' created!` });
      setProjectId(saved._id);
    } catch (err) {
      setSnackInfo({ message: err, severity: "error" });
    } finally {
      setIsFetching(false);
    }
  };
  const handleExport = () => {
    const formatted: any = [];
    setIsFetching(true);
    const formattedDoc = (parent?: any) => {
      for (let i in nodes) {
        const node = nodes[i];
        if (node.data.parent === parent) {
          formatted.push(
            new Paragraph({
              text: node.data.headerTitle,
              heading: getHeaderLevel(node.data.level),
              spacing: {
                after: 50,
                before: 150,
              },
              alignment: AlignmentType.JUSTIFIED,
              numbering: {
                level: node.data.level,
                reference: "mapp-numbering",
              },
            })
          );
          if (node.data.text) {
            formatted.push(
              new Paragraph({ text: node.data.text, indent: {left:200}, })
            );
          }
          if (node.data.children) {
            formattedDoc(node.id);
          }
        }
      }
    };

    formattedDoc();
    console.log(formatted);
    const doc = new Document({
      creator: userInfo.userName || "Test User",
      numbering: {
        config: [
          {
            reference: "mapp-numbering",
            levels: [
              {
                level: 0,
                format: LevelFormat.DECIMAL,
                text: "%1",
                alignment: AlignmentType.START,
                style: {
                  paragraph: {
                    indent: { left: 100 },
                  },
                },
              },
              {
                level: 1,
                format: LevelFormat.DECIMAL,
                text: "%1.%2.",
                alignment: AlignmentType.START,
                style: {
                  paragraph: {
                    indent: { left: 200 },
                  },
                },
              },
              {
                level: 2,
                format: LevelFormat.DECIMAL,
                text: "%1.%2.%3.",
                alignment: AlignmentType.START,
                style: {
                  paragraph: {
                    indent: { left: 1500 },
                  },
                },
              },
              {
                level: 3,
                format: LevelFormat.DECIMAL,
                text: "%1.%2.%3.%4.",
                alignment: AlignmentType.START,
                style: {
                  paragraph: {
                    indent: { left: 2000, hanging:50 },
                  },
                },
              },
              {
                level: 4,
                format: LevelFormat.DECIMAL,
                text: "%1.%2.%3.%4.%5",
                alignment: AlignmentType.START,
                style: {
                  paragraph: {
                    indent: { left: 1900},
                  },
                },
              },
            ],
          },
        ],
      },
      sections: [
        {
          children: formatted,
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      // saveAs from FileSaver will download the file
      let a: any = document.createElement("a");
      a.style = "display: none";
      document.body.appendChild(a);
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = props.projectTitle + ".docx";
      a.click();
      window.URL.revokeObjectURL(url);
      a.parentNode?.removeChild(a);
      setIsFetching(false);
    });
  };

  const handleDismiss = () => {
    setSnackInfo(null);
  };
  return (
    <>
      <div className={`header-buttons ${isFetching ? "fetching" : ""}`}>
        <div className="button" onClick={handleSave}>
          <FontAwesomeIcon icon={faSave}></FontAwesomeIcon>
          <span>Save</span>
        </div>
        <div className="button" onClick={handleExport}>
          <FontAwesomeIcon icon={faFileWord}></FontAwesomeIcon>
          <span>Export</span>
        </div>
      </div>
      {snackInfo ? (
        <Snackbar
          handleDismiss={handleDismiss}
          messageInfo={snackInfo}
        ></Snackbar>
      ) : null}
    </>
  );
};

interface MappFlowProps {
  projectTitle: string;
  fetcher: any;
  projectIdent: any;
}

const MappFlow: React.FC<MappFlowProps> = (props) => {
  const query = useQuery();
  const [isFetching, setIsFetching] = props.fetcher;
  const [projectId, setProjectId] = props.projectIdent;

  /* Flow renderer */
  const initialElements = [
    {
      id: "1",
      type: "special",
      position: { x: 10, y: 10 },
      data: {
        headerTitle: "Introdução",
        level: 0,
        index: 0,
        children: ["11", "12", "13"],
        text: "Ora boas povo",
      },
    },
    {
      id: "2",
      type: "special",
      position: { x: 10, y: 200 },
      data: { headerTitle: "Estado da arte", level: 0, index: 1 },
    },
    {
      id: "3",
      type: "special",
      position: { x: 10, y: 400 },
      data: {
        headerTitle: "Design e implementacao",
        level: 0,
        index: 2,
      },
    },
    {
      id: "11",
      type: "special",
      position: { x: 300, y: 10 },
      data: {
        headerTitle: "Motivação",
        color: "#FC5130",
        parent: "1",
        level: 1,
        index: 0,
      },
    },
    {
      id: "12",
      type: "special",
      position: { x: 300, y: 200 },
      data: {
        headerTitle: "Organização",
        color: "#FC5130",
        parent: "1",
        level: 1,
        index: 1,
      },
    },
    {
      id: "13",
      type: "special",
      position: { x: 300, y: 400 },
      data: {
        headerTitle: "Objetivos",
        color: "#FC5130",
        parent: "1",
        level: 1,
        index: 2,
      },
    },
    {
      id: "e1-2",
      type: "smoothstep",
      source: "1",
      target: "2",
      animated: true,
      arrowHeadType: ArrowHeadType.ArrowClosed,
    },
    {
      id: "e2-3",
      type: "smoothstep",
      source: "2",
      target: "3",
      animated: true,
      arrowHeadType: ArrowHeadType.ArrowClosed,
    },
    {
      id: "e11-12",
      type: "smoothstep",
      source: "11",
      target: "12",
      animated: true,
      arrowHeadType: ArrowHeadType.ArrowClosed,
    },
    {
      id: "e12-13",
      type: "smoothstep",
      source: "12",
      target: "13",
      animated: true,
      arrowHeadType: ArrowHeadType.ArrowClosed,
    },
    {
      id: "e1-e11",
      type: "smoothstep",
      source: "1",
      target: "11",
      sourceHandle: "c",
      animated: true,
      arrowHeadType: ArrowHeadType.ArrowClosed,
    },
  ];

  initialElements.map((node) => {
    if (node.type === "special") {
      if (node.data) {
        /* node.data.onChange = 'tet' */
      }
    }
  });

  const [elements, setElements] = useState(initialElements);

  useEffect(() => {
    setProjectId(query.get("id"));
    DataManagerInstance.getProjects().then((data: any) => {
      setElements(data);
    });
  }, [projectId, elements]);

  const onLoad = (reactFlowInstance: any) => {
    reactFlowInstance.fitView();
  };

  return (
    <>
      <HeaderButtons
        projectTitle={props.projectTitle}
        fetcher={props.fetcher}
        projectIdent={[projectId, setProjectId]}
      />
      <ReactFlow
        /*      snapToGrid={true}
        snapGrid={[50, 50]} */
        elements={elements}
        nodeTypes={{ special: CustomNodeComponent }}
        selectNodesOnDrag={false}
        onLoad={onLoad}
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
          nodeColor={(n: Node<any>) => n.data.color || "#fff"}
          nodeBorderRadius={2}
        />
      </ReactFlow>
    </>
  );
};

export default MappFlow;
