import { useCallback, useState, useEffect } from 'react';
import ReactFlow, {addEdge, applyNodeChanges, applyEdgeChanges, useKeyPress} from 'react-flow-renderer';

const initialNodes = [
  {
    id: '1',
    data: { label: <div id="1" className='bg-red-400 '>Node 1</div> },
    position: { x: 250, y: 25 },
  },

  {
    id: '2',
    // you can also pass a React component as a label
    data: { label: <div id="2" className='bg-green-400'>Node 2</div> },
    position: { x: 100, y: 125 },
  },
];

const initialEdges = [];



function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [timer,setTimer]=useState(null)
  const [position, setPosition]= useState({x:0, y:0})
  const cmdAndSPressed = useKeyPress(['Meta+d', 'Strg+d']);
  const onNodesChange = useCallback(
    (changes) => {setNodes((nds) => applyNodeChanges(changes, nds))},
    [setNodes]
  );

  
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  
  
  function deleteSelectedNode(node_id){
    console.log(node_id, nodes)
  }

  // Handle Enter on Login button
  function handleDeleteKey(event) {
    if(event.key === 'Enter') console.log("Delete button")
  }

  function fnEd(connection,eds){
    console.log("edge clicked")
    console.log(connection)
    return eds
  }
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, fnEd(connection, eds))),
    [setEdges]
  );
  
  useEffect(() => {
    
    let mytime = setTimeout(() => { setPosition(nodes[0].position);console.log({edges, nodes})}, 800);
    return () => clearTimeout(mytime)
  },[nodes, edges])

  useEffect(() => {
    let newNodes=nodes.filter(e=>!e.selected)
    setNodes(newNodes)
  },[cmdAndSPressed])


  return (
  <div className='h-screen container mx-auto bg-yellow-200'>
    <div className=' font-Inter font-bold text-xl '>Timer :{timer}</div>
    <div className=' font-Inter font-bold text-xl '>(x: {position.x}, y: {position.y})</div>
    <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} fitView />
  </div>);
}

export default Flow;