import { useCallback, useState } from 'react';
import ReactFlow, {addEdge, applyNodeChanges, applyEdgeChanges} from 'react-flow-renderer';

const initialNodes = [
  {
    id: '1',
    data: { label: <div className='bg-red-400 '>Node 1</div> },
    position: { x: 250, y: 25 },
  },

  {
    id: '2',
    // you can also pass a React component as a label
    data: { label: <div className='bg-green-400'>Node 2</div> },
    position: { x: 100, y: 125 },
  },
];

const initialEdges = [];



function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => {setNodes((nds) => applyNodeChanges(changes, nds))},
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
  <div className='h-screen container mx-auto bg-yellow-200'>
    <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} fitView />
  </div>);
}

export default Flow;