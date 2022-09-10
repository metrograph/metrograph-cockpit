import React, { useCallback, useState, useEffect, useMemo } from 'react';
import useMouse from "@react-hook/mouse-position";
import ReactFlow, {useReactFlow, ReactFlowProvider, Background, addEdge, applyNodeChanges, applyEdgeChanges, useKeyPress, Handle, Position} from 'react-flow-renderer';
import githubIcon from "../../assets/icons/github.svg"
function TextUpdaterNode({ data }) {
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
          Github
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

function CostumNode(){
  const nodeTypes = useMemo(() => ({ textUpdater: TextUpdaterNode }), []);

return <ReactFlow nodeTypes={nodeTypes} />;
}

function Flow() {
  const nodeTypes = { textUpdater: TextUpdaterNode };
  const [nodes, setNodes] = useState([ { id: 'node-1', type: 'textUpdater', position: { x: 0, y: 0 }, data: { value: 123 } }]);
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
      nodeTypes={nodeTypes}
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