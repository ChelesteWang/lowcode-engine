import React, { useEffect, useState } from 'react';
import ReactFlow, { Controls, MiniMap } from 'react-flow-renderer';

interface Props {
  elements: any[];
  onConnect?: Function;
  onConnectEnd?: Function;
}

const Diagram = ({ elements, onConnect }: Props) => {
  const [reactflowInstance, setReactflowInstance] = useState(null);

  useEffect(() => {
    if (reactflowInstance && elements.length > 0) {
      reactflowInstance.fitView();
    }
  }, [reactflowInstance, elements.length]);

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ReactFlow
        style={{ background: '#1A192B' }}
        elements={elements}
        defaultZoom={1}
      >
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Diagram;
