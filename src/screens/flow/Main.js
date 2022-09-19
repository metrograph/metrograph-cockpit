import React, { useEffect, useState } from "react";
import TopBar from "./TopBar";
import loopIcon from "../../assets/icons/loop.svg";
import { ReactComponent as ActionIcon } from "../../assets/icons/action.svg";
import { ReactComponent as LoopIcon } from "../../assets/icons/loopi.svg";
import { ReactComponent as DelayIcon } from "../../assets/icons/delay.svg";
import { ReactComponent as BranchIcon } from "../../assets/icons/branch.svg";
import { ReactComponent as StopIcon } from "../../assets/icons/stop.svg";
import { ReactComponent as ScriptIcon } from "../../assets/icons/script.svg";
import { ReactComponent as ToggleIcon } from "../../assets/icons/toggle.svg";
import { ReactComponent as ClipperIcon } from "../../assets/icons/cliper.svg";
import { ReactComponent as OutIcon } from "../../assets/icons/out.svg";
import { ReactComponent as ParamsIcon } from "../../assets/icons/params.svg";
import { BsFillCloudCheckFill, BsPlusSquareFill } from "react-icons/bs";
import "../../assets/css/App.css";
import MetroFlow from "./Flow";
export default function Main() {
  const [selectedPanel, setSelectedPanel] = useState("basic");
  const [addnodeMode, setAddNodeMode]=useState(false)
  const connectionTypeList=[{key:"1", name:"add"},{key:"2", name:"cloud"}]
  const [connectionType, setConnectionType]=useState(connectionTypeList[0])

  function Panel(props) {
    switch (props.panel_name) {
      case "basic":
        return (
          <div
            className="flex flex-col  overflow-y-auto height-panel text-[#545454]"
            style={{ scrollbarWidth: "thin" }}
          >
            <div className="min-h-[195px] flex justify-between  border-b-[2px] border-[#F5F5F5]">
            {addnodeMode &&
              <div onClick={()=>setAddNodeMode(false)} className="w-1/2 flex flex-col justify-center items-center cursor-pointer bg-[#322741]">
                <ActionIcon className="mb-[36px] hover:fill-white fill-white cursor-pointer"/>
                <div className="font-Inter text-[11px] text-white">Action</div>
              </div>
              }
              {!addnodeMode &&
              <div onClick={()=>setAddNodeMode(true)} className="w-1/2 flex flex-col justify-center items-center cursor-pointer roundedArea">
                <ActionIcon className="mb-[36px] hover:fill-white cursor-pointer"/>
                <div className="font-Inter text-[11px] ">Action</div>
              </div>
              }
              <div className="w-[2px] bg-[#F5F5F5]"></div>
              <div className="w-1/2 flex flex-col justify-center items-center roundedArea cursor-pointer">
                <DelayIcon className="mb-[36px] hover:fill-black cursor-pointer" />
                <div className="font-Inter  text-[11px] ">Delay</div>
              </div>
            </div>
            <div className="min-h-[195px] flex justify-between  border-b-[2px] border-[#F5F5F5]">
              <div className="w-1/2 flex flex-col justify-center items-center strokeArea cursor-pointer">
                <BranchIcon className="mb-[36px] hover:stroke-black cursor-pointer" />
                <div className="font-Inter  text-[11px] ">Branch Condition</div>
              </div>
              <div className="w-[2px] bg-[#F5F5F5]"></div>
              <div className="w-1/2 flex flex-col justify-center items-center roundedArea cursor-pointer">
                <LoopIcon className="mb-[36px] hover:fill-black cursor-pointer" />
                <div className="font-Inter  text-[11px] ">Loop</div>
              </div>
            </div>
            <div className="min-h-[195px] flex justify-between  border-b-[2px] border-[#F5F5F5]">
              <div className="w-1/2 flex flex-col justify-center items-center roundedArea cursor-pointer">
                <ScriptIcon className="mb-[36px] hover:fill-black cursor-pointer" />
                <div className="font-Inter text-[11px] ">Script</div>
              </div>
              <div className="w-[2px] bg-[#F5F5F5]"></div>
              <div className="w-1/2 flex flex-col justify-center items-center roundedArea cursor-pointer">
                <StopIcon className="mb-[36px] hover:fill-black cursor-pointer" />
                <div className="font-Inter  text-[11px] ">Stop</div>
              </div>
            </div>
            <div className="min-h-[195px] flex justify-between  border-b-[2px] border-[#F5F5F5]">
              <div className="w-1/2 flex flex-col justify-center items-center roundedArea cursor-pointer">
                <ToggleIcon className="mb-[36px] hover:fill-black cursor-pointer" />
                <div className="font-Inter  text-[11px] ">Toggle</div>
              </div>
              <div className="w-[2px] bg-[#F5F5F5]"></div>
              <div className="w-1/2 flex flex-col justify-center items-center roundedArea cursor-pointer">
                <ClipperIcon className="mb-[36px] hover:fill-black cursor-pointer" />
                <div className="font-Inter  text-[11px]">Call Endpoint</div>
              </div>
            </div>
            <div className="min-h-[195px] flex justify-between  border-b-[2px] border-[#F5F5F5]">
              <div className="w-1/2 flex flex-col justify-center items-center roundedArea cursor-pointer">
                <OutIcon className="mb-[36px] hover:fill-black cursor-pointer" />
                <div className="font-Inter  text-[11px] ">Action</div>
              </div>
              <div className="w-[2px] bg-[#F5F5F5]"></div>
              <div className="w-1/2 flex flex-col justify-center items-center roundedArea cursor-pointer">
                <ParamsIcon className="mb-[36px] hover:fill-black cursor-pointer" />
                <div className="font-Inter text-[11px]">Parameters</div>
              </div>
            </div>
          </div>
        );
      case "triggers":
        return (
          <div className="bg-red-300 h-max flex py-20 justify-center  text-xl">
            TRIGGERS
          </div>
        );
      case "connectors":
        return (
          <div
            className="flex flex-col  overflow-y-auto height-panel text-[#545454]"
            style={{ scrollbarWidth: "thin" }}
          >
            <div className="min-h-[195px] flex justify-between  border-b-[2px] border-[#F5F5F5]">
            {connectionType.key==="1" &&
              <div className="w-1/2 flex flex-col justify-center items-center cursor-pointer bg-[#322741]">
                <h2><BsPlusSquareFill className="mb-[36px] hover:fill-white fill-white cursor-pointer"/></h2>
                <div className="font-Inter text-[11px] text-white">Action</div>
              </div>
              }
              {connectionType.key!=="1" &&
              <div onClick={()=>setConnectionType(connectionTypeList[0])} className="w-1/2 flex flex-col justify-center items-center cursor-pointer roundedArea">
                <h2><BsPlusSquareFill className="mb-[36px] hover:fill-white cursor-pointer"/></h2>
                <div className="font-Inter text-[11px] ">Action</div>
              </div>
              }
              <div className="w-[2px] bg-[#F5F5F5]"></div>
              {connectionType.key!=="2" &&
              <div onClick={()=>setConnectionType(connectionTypeList[1])} className="w-1/2 flex flex-col justify-center items-center cursor-pointer roundedArea">
              <h2><BsFillCloudCheckFill className="mb-[36px] hover:fill-white cursor-pointer"/></h2>
              <div className="font-Inter text-[11px] ">Action</div>
            </div>}
            {connectionType.key==="2" &&
              <div className="w-1/2 flex flex-col justify-center items-center cursor-pointer bg-[#322741]">
                <h2><BsFillCloudCheckFill className="mb-[36px] hover:fill-white fill-white cursor-pointer"/></h2>
                <div className="font-Inter text-[11px] text-white">Action</div>
              </div>
              }
            </div>
          </div>
        );
      case "apps":
        return (
          <div className="bg-green-300 h-max flex py-20 pt-20 justify-center text-xl">
            APPS
          </div>
        );

      default:
        return <div></div>;
    }
  }

  return (
    <div className="flex flex-col h-screen noselect">
      <TopBar />
      <div className="flex grow">
        {/* Left Side */}
        <div className="w-[400px]">
          {/* Search bar */}
          <div className="relative mt-[28px] flex items-center">
            <input
              className=" bg-cock-board w-[327px] h-[46px] rounded-[11px] items-center mx-[28px] pl-14  font-Inter font-medium text-[15px]"
              placeholder="Search components... "
            />
            <img src={loopIcon} className="absolute left-12" />
          </div>
          {/* Search bar end*/}
          {/* Navigation tab*/}
          <div className=" relative mt-[35px] ">
            <div className="top-[30px] -z-10 absolute border-b-[3px] border-[#F5F5F5] w-full"></div>
            <div className="flex flex-wrap justify-between px-4">
              <div
                onClick={() => setSelectedPanel("basic")}
                className={
                  selectedPanel == "basic"
                    ? "border-b-[3px] border-black  leading-[30px]  cursor-default font-bold text-[13px] font-IBM-Plex-Sans"
                    : "border-b-[3px] border-black border-transparent text-[#C8C8C8]  leading-[30px] cursor-pointer font-semibold text-[13px] font-IBM-Plex-Sans hover:bg-cock-gray"
                }
              >
                BASIC
              </div>
              <div
                onClick={() => setSelectedPanel("triggers")}
                className={
                  selectedPanel == "triggers"
                    ? "border-b-[3px] border-black  leading-[30px]  cursor-default font-bold text-[13px] font-IBM-Plex-Sans"
                    : "border-b-[3px] border-black border-transparent text-[#C8C8C8]  leading-[30px] cursor-pointer font-semibold text-[13px] font-IBM-Plex-Sans hover:bg-cock-gray"
                }
              >
                TRIGGERS
              </div>
              <div
                onClick={() => setSelectedPanel("connectors")}
                className={
                  selectedPanel == "connectors"
                    ? "border-b-[3px] border-black  leading-[30px]  cursor-default font-bold text-[13px] font-IBM-Plex-Sans"
                    : "border-b-[3px] border-black border-transparent text-[#C8C8C8]  leading-[30px] cursor-pointer font-semibold text-[13px] font-IBM-Plex-Sans hover:bg-cock-gray"
                }
              >
                CONNECTORS
              </div>
              <div
                onClick={() => setSelectedPanel("apps")}
                className={
                  selectedPanel == "apps"
                    ? "border-b-[3px] border-black  leading-[30px]  cursor-default font-bold text-[13px] font-IBM-Plex-Sans"
                    : "border-b-[3px] border-black border-transparent text-[#C8C8C8]  leading-[30px] cursor-pointer font-semibold text-[13px] font-IBM-Plex-Sans hover:bg-cock-gray"
                }
              >
                APPS
              </div>
            </div>
          </div>
          {/* Navigation tab end*/}
          {/* Panel */}
          <Panel panel_name={selectedPanel} />
          {/* Panel End*/}
        </div>

        {/* Left Side End*/}
        <div className="grow bg-cock-board">
            <MetroFlow
              addnodeMode={addnodeMode}
              setAddNodeMode={(e)=>setAddNodeMode()}
              connectionType={connectionType}
              setConnectionType={(e)=>setConnectionType()}
            />
        </div>
      </div>
    </div>
  );
}