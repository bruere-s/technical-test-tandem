import React, { useEffect, useState } from "react";
import { UserFlow } from "../../../shared/types";

interface INode {
  name: string;
}

interface ILink {
  source: number;
  target: number;
  value: number;
}

function UserFlowVisualization({ data } : { data: UserFlow[] }) {
  const [nodes, setNodes] = useState<INode[]>([]);
  const [links, setLinks] = useState<ILink[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!data || data.length === 0) return;
    processUserFlows(data);
  }, [data]);

  const processUserFlows = (events: UserFlow[]) => {
    const nodeMap = new Map<string, number>();
    let nodeList: INode[] = [];
    let linkList: ILink[] = [];
    let index = 0;

    const sessions: Record<string, string[]> = {};
    events.forEach(({ session_id, path }) => {
      if (!session_id || !path) return;
      if (!sessions[session_id]) sessions[session_id] = [];
      sessions[session_id].push(path);
    });

    Object.values(sessions).forEach((session) => {
      for (let i = 0; i < session.length - 1; i++) {
        const source = session[i];
        const target = session[i + 1];
        if (!nodeMap.has(source)) {
          nodeMap.set(source, index++);
          nodeList.push({ name: source });
        }
        if (!nodeMap.has(target)) {
          nodeMap.set(target, index++);
          nodeList.push({ name: target });
        }
        const sourceIndex = nodeMap.get(source)!;
        const targetIndex = nodeMap.get(target)!;
        const existingLink = linkList.find(
          (link) => link.source === sourceIndex && link.target === targetIndex
        );
        if (existingLink) {
          existingLink.value += 1;
        } else {
          linkList.push({ source: sourceIndex, target: targetIndex, value: 1 });
        }
      }
    });

    // debug
    nodeList = nodeList.sort((a, b) => a.name > b.name ? 1 : (a.name === b.name ? 0 : -1));
    linkList = linkList.sort((a, b) => a.source - b.source);
    console.log('node', nodeList)
    console.log('linkList', linkList)

    setNodes(nodeList);
    setLinks(linkList);
    setReady(true)
  };

  return (
    <div style={{ width: "100%", height: 400 }}>
      { ready &&
          <div>
            ready
          </div>
      }
    </div>
  );
};

export default UserFlowVisualization;
