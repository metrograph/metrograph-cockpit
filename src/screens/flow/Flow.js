import React, { useCallback, useState, useEffect } from 'react';
import useMouse from "@react-hook/mouse-position";
import ReactFlow, {addEdge, applyNodeChanges, applyEdgeChanges, useKeyPress} from 'react-flow-renderer';

const initialNodes = [
  {
    id: '1',
    data: { label: <div id="1" className='bg-red-400 '>Node 1</div> },
    position: { x: 250, y: 25 },
  }
];

const initialEdges = [];



function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [timer,setTimer]=useState(null)
  const [position, setPosition]= useState({x:0, y:0})
  const [mouseRadar, setMouseRadar] = useState({ x: "0", y: "0" });
  const [contextMenu, setContextMenu]= useState(false)
  const ref = React.useRef(null);

  const cmdAndSPressed = useKeyPress(['Meta+d', 'Strg+d', 'Delete']);
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
    console.log(nodes.length)
    let node ={
      id:(nodes.length+1).toString(),
      data: { label: <div id="3" className='bg-red-400 '>{(nodes.length+1).toString()}</div> },
      position: { x: position.x-330, y: position.y-90 },
    }
   setNodes(nodes => [...nodes, node]);
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
  const mouse = useMouse(ref, {
		enterDelay: 100,
		leaveDelay: 100,
	});
  
  useEffect(() => {
    
    let mytime = setTimeout(() => { setPosition(nodes[0].position);console.log({edges, nodes})}, 800);
    return () => clearTimeout(mytime)
  },[nodes, edges])

  useEffect(() => {
    deleteNode()
    deleteEdge()
  },[cmdAndSPressed])


  return (
  <div onClick={e=>setContextMenu(false)} onContextMenu={(e) => {e.preventDefault();setMouseRadar({ x: mouse.x, y: mouse.y });; setContextMenu(!contextMenu)}}  className='h-screen bg-yellow-200 relative'>
    {contextMenu && (
					<div
					className="bg-[#191919] w-[187px] h-[89px] rounded-[9px] flex flex-col justify-center  border-1 border-[#292929] space-y-[1px]"
					style={{
						position: "absolute",
						top: mouseRadar.y,
						left: mouseRadar.x,
						zIndex: 6,
					}}
					>
					<div onClick={e=>{createNode({x:mouseRadar.x, y:mouseRadar.y}); setContextMenu(false)}}  className="text-white font-IBM-Plex-Sans font-bold text-lg hover:bg-[#292929] pl-[13px] cursor-pointer">
					CREATE NODE
					</div>
					
					</div>
						)}
    <div className=' font-Inter font-bold text-xl '>Timer :{timer}</div>
    <div className=' font-Inter font-bold text-xl '>(x: {position.x}, y: {position.y})</div>
    <div className=' font-Inter font-bold text-xl '>Mouse </div>
    <div className=' font-Inter font-bold text-xl '>(x: {mouse.x}, y: {mouse.y})</div>
    <ReactFlow className='bg-red-400' ref={ref} nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} fitView />
  </div>);
}

export default Flow;