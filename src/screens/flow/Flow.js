import React, { useCallback, useState, useEffect } from 'react';
import useMouse from "@react-hook/mouse-position";
import ReactFlow, {useReactFlow, ReactFlowProvider, Background, addEdge, applyNodeChanges, applyEdgeChanges, useKeyPress} from 'react-flow-renderer';



function Flow() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [timer,setTimer]=useState(null)
  const [position, setPosition]= useState({x:0, y:0})
  const [addnodeMode, setAddNodeMode]=useState(false)
  const [contextMenu, setContextMenu]= useState(false)
  const reactFlowInstance = useReactFlow();
  const ref = React.useRef(null);
  const cmdAndSPressed = useKeyPress(['Meta+d','d', 'Strg+d', 'Delete']);
  
  const onNodesChange = useCallback(
    (changes) => {setNodes((nds) => applyNodeChanges(changes, nds))},
    [setNodes]
  );
  
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  function deleteNode() {
    let newNodes=nodes.filter(e=>!e.selected)
    setNodes(newNodes)
   
  }

  function deleteEdge() {
    let newEdges=edges.filter(e=>!e.selected)
    setEdges(newEdges)
   
  }

  function createNode(position){
    let node ={
      id:(nodes.length+1).toString(),
      data: { label: <div id={(nodes.length+1).toString()} className='bg-red-400 '>{(nodes.length+1).toString()}</div> },
      position: reactFlowInstance.project({x:position.x, y:position.y}),
    }
   setNodes(nodes => [...nodes, node]);
  }

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection,eds)),
    [setEdges]
  );

  const mouse = useMouse(ref, {
		enterDelay: 100,
		leaveDelay: 100,
	});

  function handleClick(){
    if (addnodeMode) {
      createNode({ x: mouse.x, y: mouse.y })
      setAddNodeMode(false)
    }
    setContextMenu(false)
  }
  
  useEffect(() => {
    let mytime = setTimeout(() => { setPosition(nodes[0].position);console.log({edges, nodes})}, 800);
    return () => clearTimeout(mytime)
  },[nodes, edges])

  useEffect(() => {
    deleteNode()
    deleteEdge()
  },[cmdAndSPressed])

  return (
  <div  className='h-screen'>
    <div className='flex space-x-16'>
    <div>
      <div onClick={()=>setAddNodeMode(!addnodeMode)} className='font-Inter font-bold text-xl cursor-default hover:text-red-400'>Create Node</div>
      </div>
    </div>
    <ReactFlow
      className={addnodeMode?"cursor-cell":"cursor-pointer"}
      onClick={()=>handleClick()}
      onContextMenu={(e) =>{e.preventDefault();setContextMenu(!contextMenu)}}
      ref={ref}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView >
      <Background />
    </ReactFlow>
  </div>);
}

export default function FlowWithProvider() {
  return (
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
  );
}