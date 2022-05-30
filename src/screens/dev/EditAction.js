import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {useParams, useNavigate } from "react-router-dom";
import CodeEditor from "../../components/dev/CodeEditor";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/python";
import { ReactComponent as ActionIcon } from "../../assets/topbar/action.svg";
import { ReactComponent as DashboardIcon } from "../../assets/topbar/dashboard.svg";
import { ReactComponent as ApiIcon } from "../../assets/topbar/api.svg";
import { ReactComponent as ApplicationIcon } from "../../assets/topbar/apps.svg";
import { ReactComponent as WorkflowsIcon } from "../../assets/topbar/workflows.svg";
import { ReactComponent as ArrowDown } from "../../assets/icons/arrow-down.svg";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import useMouse from "@react-hook/mouse-position";
import TopBar from "../../components/dev/TopBar"

import i_icon from "../../assets/icons/i.svg";

import logo from "../../assets/logo.svg";
import arrowdown from "../../assets/icons/arrow-down.svg";
import avatar from "../../assets/avatar/avatar-2.png";

let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiZWhhbXphIn0sInRpbWUiOiIxNjUzNjY0MjY3LjA1ODAzMSJ9.0cXDjsGeWZ4PEIeiqagcF8B1VsmdMdat3-GZPKId5To"
let hostname="http://195.201.146.87:80/v1"

function Alert(props){
  const dispatch = useDispatch();
  function handleCloseAlert(){
    dispatch({type:"alert/SET_ALERT",payload:{title:"", is_hide:true, type:""}})
  }
  return (
    <div className="h-[64px] lg:w-[993px] bg-[#ADEED6] w-full rounded-[10px] flex justify-between items-center px-[20px]">
      <div className="text-black font-[12px]">{props.title}</div>
      <CloseIcon onClick={()=>handleCloseAlert()} className="h-2 w-2 cursor-pointer" fill="black"/>
    </div>)
}

export default function EditAction() {
  const dispatch = useDispatch();
	const mystate = useSelector((state) => state);
  const navigate=useNavigate()
  const [is_listSetOpen, setIs_listSetOpen] = useState(false);
  const [optionListSet, setOptionListSet] = useState([
    { key: 1, value: "Deploy Docker Workflow" },
    { key: 1, value: "Deploy Docker Workflow A" },
    { key: 1, value: "Deploy Docker Workflow B" },
    { key: 1, value: "Deploy Docker Workflow C" },
  ]);
  const [selectedOptionSet, setSelectedOtionSet] = useState(optionListSet[0]);
  const action_uuid = useParams().uuid;
  
  //Top bar end

  const [is_listbOpen, setIs_listbOpenb] = useState(false);

  const [optionListb, setOptionListb] = useState([
    { key: 2, value: "Python" },
    { key: 3, value: "Nodejs" },
    { key: 4, value: "PHP" },
  ]);
  const [selectedOptionb, setSelectedOtionb] = useState("Python");

  //Runtime end

  const [is_listversionOpen, setIs_listversionOpen] = useState(false);

  const [optionlistversion, setOptionlistversion] = useState([
    { key: 2, value: "10.01" },
    { key: 3, value: "11.20" },
    { key: 4, value: "13.03" },
  ]);
  const [selectedoptionlistversion, setSelectedoptionlistversion] =
    useState("3.9.10");

  //Version end

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  const [urlCheckBox, setUrlCheckBox] = useState(true);

  const ref = React.useRef(null);
  const mouse = useMouse(ref, {
    enterDelay: 100,
    leaveDelay: 100,
  });
  useEffect(() => {
		window.scrollTo(0, 0);
		if (mystate.actionCode.name==="") {
			axios.get(hostname+"/action/"+action_uuid, {headers: { Authorization: token },})
			.then(response=>{
				console.log(response.data.payload.ActionCode)
				let data = response.data.payload.ActionCode;
				dispatch({type:"action_code/SET",payload:data})
      }).catch(error=>console.log(error))
	
		}
    if(mystate.actionCode.name!=""){
      setTitle(mystate.actionCode.name)
        setDescription(mystate.actionCode.description)
        setSelectedOtionb(mystate.actionCode.runtime)
        setSelectedoptionlistversion(mystate.actionCode.runtime_version)
    }
	}, [mystate.actionCode.name]);

  return (
    <div className="bg-black min-h-screen noselect flex justify-center pb-24 px-12">
      <div className="max-w-[1662px] w-full">
        {/* Top bar start */}
        <TopBar/>
       {!mystate.alert.is_hide &&
        <div className="flex justify-center w-full absolute top-28">
          <Alert title={mystate.alert.title}/>
        </div>}
        {/* Top bar end */}

        {/* Action section start */}
        <div className="max-w-[1614px] container flex pt-[104px]">
          <div className="w-full">
            <div className="flex justify-between">
              <div className="font-light font-IBM-Plex-Sans text-[36px] text-white">
                {title}
              </div>
              <div className="justify-end flex space-x-[6px] pt-[30px]">
                <div onClick={()=>navigate("/action")} className="text-white font-IBM-Plex-Sans text-[10px] font-bold bg-[#545454] w-[92px] h-[35px] rounded-[9px] flex items-center justify-center cursor-pointer hover:bg-gray-400">
                  CANCEL
                </div>
                <div className="text-white font-IBM-Plex-Sans text-[10px] font-bold bg-[#7900FF] w-[92px] h-[35px] rounded-[9px] flex items-center justify-center cursor-pointer hover:bg-purple-600">
                  SAVE
                </div>
              </div>
            </div>
            <div className="border-b-2 mt-[18px] mb-[39px] border-[#2B2B2B] w-full" />
            <div className="flex flex-col  space-y-[30px]">
              <div className="flex space-x-[33px]">
                <div className="space-y-[10px] w-1/4">
                  <div className="text-white font-IBM-Plex-Sans font-bold text-[11px]">
                    TITLE
                  </div>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      className="w-full h-[46px] bg-[#1A1A1A] rounded-[14px] text-[15px] font-Inter font-medium pl-[20px] pr-[40px] text-white"
                      placeholder="Action name.."
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                    />
                    <div className="bg-[#7ECA9C] w-[12px] h-[12px] rounded-full absolute  right-[16px]" />
                  </div>
                </div>

                <div className="space-y-[10px] w-1/4">
                  <div className="text-white font-IBM-Plex-Sans font-bold text-[11px]">
                    DESCRIPTION
                  </div>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      className="w-full h-[46px] bg-[#1A1A1A] rounded-[14px] text-[15px] font-Inter font-medium px-[20px] pr-8 text-white"
                      placeholder="Description.."
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    />
                    <div className="bg-[#7ECA9C] w-[12px] h-[12px] rounded-full absolute  right-[16px]" />
                  </div>
                </div>

                <div className="space-y-[10px] w-1/4">
                  <div className="text-white font-IBM-Plex-Sans font-bold text-[11px]">
                    RUNTIME
                  </div>

                  <div
                    onClick={() => setIs_listbOpenb(!is_listbOpen)}
                    className="w-full mt-[28px]  rounded-[11px] h-[46px] bg-[#1A1A1A] flex justify-between items-center px-[19px] cursor-pointer relative"
                  >
                    <div
                      className={
                        selectedOptionb !== "Language"
                          ? "font-Inter font-medium text-[15px] text-white"
                          : "font-Inter font-medium text-[15px] text-[#444444]"
                      }
                    >
                      {selectedOptionb}
                    </div>
                    <ArrowDown height="8px" width="13px" fill="white" />
                    {is_listbOpen && (
                      <div className="flex flex-col space-y-2  bg-[#1A1A1A]  w-full  rounded-lg  cursor-pointer absolute top-12 py-4 right-0">
                        {optionListb.map((element) => (
                          <div
                            onClick={() => {
                              setSelectedOtionb(element.value);
                              setIs_listbOpenb(!is_listbOpen);
                            }}
                            className={
                              element.value === selectedOptionb
                                ? "flex items-center justify-between text-white text-md font-Inter bg-[#7900FF]   py-2 px-4"
                                : "flex items-center justify-between text-white text-md font-Inter hover:bg-[#7900FF] py-2 px-4"
                            }
                          >
                            <div>{element.value}</div>
                            {element.value === selectedOptionb ? (
                              <BsFillCheckCircleFill fill="#156FF8" />
                            ) : (
                              <div></div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-[10px] w-1/4">
                  <div className="text-white font-IBM-Plex-Sans font-bold text-[11px]">
                    VERSION
                  </div>

                  <div
                    onClick={() => setIs_listversionOpen(!is_listversionOpen)}
                    className="w-full mt-[28px]  rounded-[11px] h-[46px] bg-[#1A1A1A] flex justify-between items-center  px-[19px] cursor-pointer relative"
                  >
                    <div
                      className={
                        selectedoptionlistversion !== "Version"
                          ? "font-Inter font-medium text-[15px] text-white"
                          : "font-Inter font-medium text-[15px] text-[#444444]"
                      }
                    >
                      {selectedoptionlistversion}
                    </div>
                    <ArrowDown height="8px" width="13px" fill="white" />
                    {is_listversionOpen && (
                      <div className="flex flex-col space-y-2 bg-[#1A1A1A]   rounded-lg w-full  cursor-pointer absolute top-12 py-4 right-0">
                        {optionlistversion.map((element) => (
                          <div
                            onClick={() => {
                              setSelectedoptionlistversion(element.value);
                              setIs_listversionOpen(!is_listversionOpen);
                            }}
                            className={
                              element.value === selectedoptionlistversion
                                ? "flex items-center justify-between text-white text-md font-Inter bg-[#7900FF]    py-2 px-4"
                                : "flex items-center justify-between text-white text-md font-Inter hover:bg-[#7900FF]  py-2 px-4"
                            }
                          >
                            <div>{element.value}</div>
                            {element.value === selectedoptionlistversion ? (
                              <BsFillCheckCircleFill fill="#156FF8" />
                            ) : (
                              <div></div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*URL Section*/}
        <div className="flex space-x-[40px]  mt-[40px] items-center">
          <div className="flex space-x-2 w-[165px] justify-between items-center">
            <div
              onClick={() => setUrlCheckBox(!urlCheckBox)}
              className={
                urlCheckBox
                  ? "w-[16px] h-[16px] rounded-[5px] bg-[#7900FF] border-2 border-[#272727] cursor-pointer"
                  : "w-[16px] h-[16px] rounded-[5px] border-2 border-[#272727] cursor-pointer"
              }
            />

            <div className="text-white font-IBM-Plex-Sans font-bold text-[12px]">
              ENABLE ACTION URL
            </div>
            <img src={i_icon} alt="11px" width="11px" />
          </div>
          <div className="flex items-center space-x-[10px]">
            <div className="bg-[#7ECA9C] h-[17px] w-[39px] grid place-content-center">
              <div className=" text-[10px] font-IBM-Plex-Sans font-bold text-white">
                LIVE
              </div>
            </div>
            <div className="text-[#AC62FF] font-IBM-Plex-Sans font-medium text-[14px] cursor-pointer">
              http://metrpgraph.coolcompany.io/task/hf34j1lrhl1hflk14tkgh/run
            </div>
          </div>
        </div>

        {/*SCHEDULE TASK Section*/}
        <div className="mt-[44px]">
          <div className="text-white font-bold font-IBM-Plex-Sans text-[11px]">
            SCHEDULE TASK
          </div>
          <div className="flex mt-[10px]">
            <div className="w-[146px] h-[42px] bg-[#2B2B2B] grid place-content-center rounded-[9px] hover:bg-gray-400 cursor-pointer mr-[88px]">
              <div className="text-white font-IBM-Plex-Sans font-bold text-[12px]">
                ADD SCHEDULE
              </div>
            </div>
            <div className="w-[272px] h-[42px] border-2 border-[#3F3F3F] rounded-[15px] flex justify-evenly px-2 items-center">
              <div className="text-[12px] font-IBM-Plex-Sans font-bold text-white">
                EVERY
              </div>
              <div className="w-[67px] h-[22px] bg-[#7ECA9C] grid place-content-center rounded-[11px]">
                <div className="text-[10px] font-IBM-Plex-Sans font-bold text-white">
                  MONDAY
                </div>
              </div>
              <div className="text-[12px] font-IBM-Plex-Sans font-bold text-white">
                AT
              </div>
              <div className="w-[53px] h-[22px] bg-[#7ECA9C] grid place-content-center rounded-[11px]">
                <div className="text-[10px] font-IBM-Plex-Sans font-bold text-white">
                  08:00
                </div>
              </div>
            </div>

            <div className="ml-[41px] w-[272px] h-[42px] border-2 border-[#3F3F3F] rounded-[15px] flex justify-evenly px-2 items-center">
              <div className="text-[12px] font-IBM-Plex-Sans font-bold text-white">
                EVERY
              </div>
              <div className="w-[67px] h-[22px] bg-[#7ECA9C] grid place-content-center rounded-[11px]">
                <div className="text-[10px] font-IBM-Plex-Sans font-bold text-white">
                  HOUR
                </div>
              </div>
              <div className="text-[10px] font-IBM-Plex-Sans font-bold text-white">
                AT
              </div>
              <div className="w-[63px] h-[22px] bg-[#7ECA9C] grid place-content-center rounded-[11px]">
                <div className="text-[10px] font-IBM-Plex-Sans font-bold text-white">
                  30:00
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" mt-12 font-IBM-Plex-Sans font-bold text-[11px] mb-[10px] text-white">
          ACTION CODE
        </div>
       {mystate.actionCode.uuid!="" &&  <CodeEditor action_uuid={action_uuid}/>}
      </div>
    </div>
  );
}
