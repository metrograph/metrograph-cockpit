// React imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useParams, useNavigate } from "react-router-dom";
import useMouse from "@react-hook/mouse-position";

// Ace editor imports
import CodeEditor from "../components/CodeEditor";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/python";

// Icons imports
import { ReactComponent as ArrowDown } from "../assets/icons/arrow-down.svg";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { ReactComponent as CloseIcon } from "../assets/icons/close.svg";
import i_icon from "../assets/icons/i.svg";

// External components
import Modal from 'react-bootstrap/Modal'
import axios from "axios";

// Internal components
import ModelSchedule from "../components/ModalSchedule";
import TopBar from "../components/TopBar"
import {config} from "../config"
import { useRef } from "react";



function Alert(props){
  const dispatch = useDispatch();
  function handleCloseAlert(){
    dispatch({type:"alert/SET_ALERT",payload:{title:"", is_hide:true, type:""}})
  }
  if(props.type==="success")
    {
      return (
      <div className="h-[64px]  bg-[#ADEED6] w-full rounded-[10px] flex justify-between items-center px-[20px]">
        <div className="text-black font-[12px]">{props.title}</div>
        <CloseIcon onClick={()=>handleCloseAlert()} className="h-2 w-2 cursor-pointer" fill="black"/>
      </div>)
    }
  else if(props.type==="error")
  {
    return (
      <div className="h-[64px]  bg-red-400 w-full rounded-[10px] flex justify-between items-center px-[20px]">
        <div className="text-black font-[12px]">{props.title}</div>
        <CloseIcon onClick={()=>handleCloseAlert()} className="h-2 w-2 cursor-pointer" fill="black"/>
      </div>)
  }
}

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="sm"
      centered
    >
      <Modal.Body as={ModelSchedule}/>
    </Modal>
  );
}

export default function EditAction() {
  const dispatch = useDispatch();
	const mystate = useSelector((state) => state);
  const navigate=useNavigate()
  const [actionCode, setActionCode]=useState({uuid:useParams().uuid})
  const loading=useRef(true)
  
  //Top bar end

  const [is_listbOpen, setIs_listbOpenb] = useState(false);

  const [optionListb, setOptionListb] = useState([
    { key: 2, value: "python" },
  ]);
  const [selectedOptionb, setSelectedOtionb] = useState("python");

  //Runtime end

  const [is_listversionOpen, setIs_listversionOpen] = useState(false);

  const [optionlistversion, setOptionlistversion] = useState([
    { key: 2, value: "3.9.10" }
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

  // Schedule Modal

  const [modalVisible, setModalVisible] = useState(false);

  function handleSave(){
    axios.patch(config.METROGRAPH_API+"/action/"+actionCode.uuid,{name: title, description: description, runtime: selectedOptionb, runtime_version: selectedoptionlistversion} ,{ headers: {Authorization: mystate.user.token} })
    .then((res) => {
      setActionCode(res.data.payload.action)
      dispatch({type:"alert/SET_ALERT",payload:{title:res.data.message, is_hide:false, type:"success"}})
    })
    .catch((error) => {
      if(error.response.status===401){
        localStorage.removeItem("METROGRAPH_STORAGE")
        return navigate("/login")
    }
      dispatch({type:"alert/SET_ALERT",payload:{title:error.data.message, is_hide:false, type:"error"}})
      setTimeout(() => {
        dispatch({type:"alert/SET_ALERT",payload:{title:"", is_hide:true, type:""}})
        }, 3000);
    });
}

  function handleCloseDropDown(){
    dispatch({type:"active_element/DROP_DOWN", payload:{key:"0"}})
    dispatch({type:"alert/SET_ALERT", payload:{is_hide:true, type:""}})
  }

  function handleDropListRuntime(){
    if(mystate.activeElement.opendDropDown==="runtime") dispatch({type:"active_element/DROP_DOWN", payload:{key:"0"}})
    else dispatch({type:"active_element/DROP_DOWN", payload:{key:"runtime"}})
    dispatch({type:"alert/SET_ALERT", payload:{is_hide:true, type:""}})
  }

  function handleDropListVerion(){
    if(mystate.activeElement.opendDropDown==="version") dispatch({type:"active_element/DROP_DOWN", payload:{key:"0"}})
    else dispatch({type:"active_element/DROP_DOWN", payload:{key:"version"}})
    dispatch({type:"alert/SET_ALERT", payload:{is_hide:true, type:""}})
  }

  function handleAddSchedule(){
    setModalVisible(true)
  }  

  useEffect(() => {
		window.scrollTo(0, 0);
    function loadLocalStorage() {
      const localstorage = localStorage.getItem("METROGRAPH_STORAGE");
      const data = JSON.parse(localstorage);
      if (JSON.parse(localstorage)) {
          dispatch({ type: "user/SET", payload: data });
          if(data.user.token)
          {
            axios.get(config.METROGRAPH_API+"/action/"+actionCode.uuid, {headers: { Authorization: data.user.token },})
            .then(response=>{
              setActionCode(response.data.payload.ActionCode)
              loading.current = false
          }).catch(error=>loading.current=false)
          }
      }
      else return navigate("/login")
    }
  loadLocalStorage();

  if(actionCode.name!=""){
      setTitle(actionCode.name)
      setDescription(actionCode.description)
      setSelectedOtionb(actionCode.runtime)
      setSelectedoptionlistversion(actionCode.runtime_version)
  }

		
	}, [actionCode.name,loading]);

 

  return (

    

    <div onClick={()=>handleCloseDropDown()} className="bg-black min-h-screen noselect flex justify-center pb-24 px-12">
      
      <MyVerticallyCenteredModal
        show={modalVisible}
        onHide={() => setModalVisible(false)}
      />
      
      <div className="max-w-[1662px] w-full relative">
        {/* Top bar start */}
        <TopBar/>
       {!mystate.alert.is_hide &&
        <div className="flex justify-center w-full absolute top-28">
          <Alert title={mystate.alert.title} type={mystate.alert.type}/>
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
                {(!title || !description) &&<div className="opacity-50 text-white font-IBM-Plex-Sans text-[10px] font-bold bg-[#7900FF] w-[92px] h-[35px] rounded-[9px] flex items-center justify-center cursor-not-allowed">
                  SAVE
                </div>}
                {(title && description) &&<div onClick={()=>handleSave()} className="text-white font-IBM-Plex-Sans text-[10px] font-bold bg-[#7900FF] w-[92px] h-[35px] rounded-[9px] flex items-center justify-center cursor-pointer hover:bg-purple-600">
                  SAVE
                </div>}
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
                    onClick={(e) => {e.stopPropagation(); handleDropListRuntime()}}
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
                    {mystate.activeElement.opendDropDown==="runtime" && (
                      <div className="flex flex-col space-y-2  bg-[#1A1A1A]  w-full  rounded-lg  cursor-pointer absolute top-12 py-4 right-0">
                        {optionListb.map((element) => (
                          <div key={element.key}
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
                     onClick={(e) => {e.stopPropagation(); handleDropListVerion()}}
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
                    {mystate.activeElement.opendDropDown==="version" && (
                      <div className="flex flex-col space-y-2 bg-[#1A1A1A]   rounded-lg w-full  cursor-pointer absolute top-12 py-4 right-0">
                        {optionlistversion.map((element) => (
                          <div key={element.key}
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
              {"http://metrpgraph.io/action/"+actionCode.uuid}
            </div>
          </div>
        </div>

        {/*SCHEDULE TASK Section*/}
        <div className="mt-[44px]">
          <div className="text-white font-bold font-IBM-Plex-Sans text-[11px]">
            SCHEDULE TASK
          </div>
          <div className="flex mt-[10px]">
            <div onClick={(e)=>{handleAddSchedule()}} className="w-[146px] h-[42px] bg-[#2B2B2B] grid place-content-center rounded-[9px] hover:bg-gray-400 cursor-pointer mr-[88px]">
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
		{/* SCHEDULE Modal */}
		{!mystate.model_schedule.is_hide && <div className="absolute inset-0 z-50 w-full">
			<ModelSchedule file={mystate.modal_file.file}/>
		</div>}

        <div className=" mt-12 font-IBM-Plex-Sans font-bold text-[11px] mb-[10px] text-white">
          ACTION CODE
        </div>
       {actionCode.uuid!="" &&  <CodeEditor actionCode={actionCode}/>}
      </div>
    </div>
  );
}
