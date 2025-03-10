import React, { useEffect, useState } from "react";
import { UserFlow } from "../../../shared/types";

interface ProcessedFlow {
  source: string;
  target: string;
  count: number;
}

function UserFlowVisualization ({ data }: { data: UserFlow[] }) {
  const [flows, setFlows] = useState<ProcessedFlow[]>([]);

  useEffect(() => {
    if (!data || data.length === 0) return;
    setFlows(processUserFlows(data));
  }, [data]);

  const processUserFlows = (events: UserFlow[]): ProcessedFlow[] => {
    const sessions: { session_id: string; paths: string[] }[] = [];
    const flows: ProcessedFlow[] = [];

    events.forEach(({ session_id, path }) => {
      if (!session_id || !path) return;
      let session = sessions.find((s) => s.session_id === session_id);
      if (!session) {
        session = { session_id, paths: [] };
        sessions.push(session);
      }
      session.paths.push(path);
    });

    sessions.forEach(({ paths }) => {
      for (let i = 0; i < paths.length - 1; i++) {
        const existingFlow = flows.find((f) => f.source === paths[i] && f.target === paths[i + 1]);
        if (existingFlow) existingFlow.count += 1;
        else flows.push({ source: paths[i], target: paths[i + 1], count: 1 });
      }
    });

    return flows.sort((a, b) => b.count - a.count);
  };

  return (
    <div style={{ padding: "10px" }}>
      <h2>User Flow Overview</h2>
      {flows.length > 0 ? (
        <table border={1} cellPadding="5" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Source</th>
              <th>Target</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {flows.map((flow, index) => (
              <tr key={index}>
                <td>{flow.source}</td>
                <td>{flow.target}</td>
                <td>{flow.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No user flow data available.</p>
      )}
    </div>
  );
};

export default UserFlowVisualization;
