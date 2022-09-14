import React, { useCallback, useState, useEffect, useMemo } from 'react';
import useMouse from "@react-hook/mouse-position";
import ReactFlow, {useReactFlow, ReactFlowProvider, Background, addEdge, applyNodeChanges, applyEdgeChanges, useKeyPress, Handle, Position, Controls} from 'react-flow-renderer';
import githubIcon from "../../assets/icons/github.svg"
import MetroEdge from './components/MetroEdge';
import TopBar from './TopBar';
function MetroNode({ data }) {
 const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className='h-[99px] w-[99px] flex items-center relative'>
        <div className='bg-white h-[99px] w-[99px] grid place-items-center rounded-[25px] border-2 border-[#D8D8D8]'>
          <img src={githubIcon} className="w-[49px] h-[50px]" alt="github-logo" />
        </div>
        <div className='absolute left-28 w-[123px]'>
          <div className=' font-IBM-Plex-Sans font-bold text-[15px]'>
          Github {data.nodeData}
          </div>
          <div className=' font-IBM-Plex-Sans font-medium text-[12px] text-[#838383]'>
          Commit Trigger [main]
          </div>
          <div className='font-IBM-Plex-Sans font-bold text-[9px] text-[#7ECA9C]'>
          Successful Test
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}



const nodeTypes = { metroNode: MetroNode };
const edgeTypes = { metroEdge: MetroEdge }

function Flow() {
 const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [timer,setTimer]=useState(null)
  const [position, setPosition]= useState({x:0, y:0})
  const [addnodeMode, setAddNodeMode]=useState(false)
  const [contextMenu, setContextMenu]= useState(false)
  const [connectionType, setConnectionType]= useState("add")
  const reactFlowInstance = useReactFlow();
  const ref = React.useRef(null);
  const cmdAndSPressed = useKeyPress(['Meta+d','d', 'Strg+d', 'Delete']);
  const aPressed = useKeyPress(['a']);
  const cPressed = useKeyPress(['c']);

 
  
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
      data: { nodeData:nodes.length+1 },
      type: 'metroNode',
      position: reactFlowInstance.project({x:position.x, y:position.y}),
    }
   setNodes(nodes => [...nodes, node]);
  }

  
  
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge({ ...connection, type: 'metroEdge', data:connectionType }, eds)) ,
    [setEdges,connectionType]
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

 

  useEffect(() => {
    setConnectionType("cloud")
  },[cPressed])

  useEffect(() => {
    setConnectionType("add")
  },[aPressed])

  return (
  <div  className='h-screen'>
    <div className='flex space-x-16'>
    <div className='my-8 ml-12'>
      {!addnodeMode && <div onClick={()=>setAddNodeMode(!addnodeMode)} className='px-4 grid place-content-center text-white font-Inter font-bold text-lg cursor-pointer hover:text-red-400  h-[65px] bg-[#979797] rounded-[20px] hover:bg-black'>Create Node</div>} 
      {addnodeMode && <div onClick={()=>setAddNodeMode(!addnodeMode)} className='px-4 grid place-content-center text-white font-Inter font-bold text-lg cursor-pointer hover:text-red-400  h-[65px] bg-[#156FF8] rounded-[20px] hover:bg-blue-500'>Create Node</div>}
      <div className='mt-4 text-sm'>*Connection type (Press "a" for add, "c" for cloud)</div>
      <div className='text-lg'>Connection Type : {connectionType}</div>
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
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      fitView >
      <Controls />
      <Background />
    </ReactFlow>
  </div>);
}

export default function MetroFlow() {
  return (
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
  );
}