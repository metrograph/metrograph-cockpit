import { useState, useCallback } from 'react';
import ReactFlow, { applyEdgeChanges, applyNodeChanges, Background } from 'react-flow-renderer';
import TopBar from "./TopBar";

import githubIcon from "../../assets/icons/github.svg"
function MyNode(){
  return (
    <div className='w-full bg-red-400 relative items-center flex space-x-4'>
      <div className='grid place-content-center w-24 h-24 rounded-2xl bg-white border-2 border-[#D8D8D8]'>
        <div>
            <img src={githubIcon} className="w-12 h-12"/>
        </div>
      </div>
      <div className='absolute w-max left-24 flex flex-col items-start font-IBM-Plex-Sans'>
        <div className='font-bold text-[15px]'>
          GITHUB
        </div>
        <div className='font-bold text-[12px] text-[#838383]'>
          Commit Trigger [main]
        </div>
        <div className='flex items-center space-x-2'>
            <div className='bg-[#7ECA9C] w-[13px] h-[13px] rounded-full'/>
            <div className='text-[#7ECA9C] font-IBM-Plex-Sans font-bold text-[9px]'>
              Successful Test
            </div>
        </div>
      </div>
    </div>
  )
}

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: <MyNode/> },
    position: { x: 250, y: 25 },
    style:{
      backgroundColor:"unset",
      height:"auto",
      width:"auto",
      border:"unset",
      display: "inline-grid",
      justifyItems:"center",
      alignItems:"center",
      
    }
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' }
];

function MyFlow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const reactFlowStyle = {
    ".react-flow__nodes":{backgroundColor:"red"}
  };
  
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  return <ReactFlow style={reactFlowStyle} nodes={nodes} edges={edges} onNodesChange={onNodesChange}
  onEdgesChange={onEdgesChange} fitView > <Background /></ReactFlow>;
}

export default function Flow(){
    return (
      <div>
         <TopBar/>
         <div className='flex mx-auto container w-full h-screen'>
        <div className='mt-20'><MyNode /></div>
        </div>
        <MyFlow/>
      </div>
    )
}