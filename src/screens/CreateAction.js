// React imports
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Icons imports
import { ReactComponent as ArrowDown } from "../assets/icons/arrow-down.svg";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { ReactComponent as CloseIcon } from "../assets/icons/close.svg";

// External components
import axios from "axios";

// Internal components
import TopBar from "../components/TopBar";
import {config} from "../config"

function Alert(props){
  const dispatch = useDispatch();
  const mystate = useSelector((state) => state);
  function handleCloseAlert(){
    dispatch({type:"alert/SET_ALERT",payload:{title:"", is_hide:true, type:""}})
  }
  return (
    <div className="h-[64px] lg:w-[993px] bg-[#ADEED6] w-full rounded-[10px] flex justify-between items-center px-[20px]">
      <div className="text-black font-[12px]">{props.title}</div>
      <CloseIcon onClick={()=>handleCloseAlert()} className="h-2 w-2 cursor-pointer" fill="black"/>
    </div>)
}

export default function CreateAction() {
  const dispatch = useDispatch();
	const mystate = useSelector((state) => state);
  const navigate = useNavigate();
  let loading=true
  const [is_listSetOpen, setIs_listSetOpen] = useState(false);

  
  //Top bar end

  const [is_listbOpen, setIs_listbOpenb] = useState(false);

  const [optionListb, setOptionListb] = useState([{ key: 2, value: "python" }]);
  const [selectedOptionb, setSelectedOtionb] = useState("python");

  //Runtime end

  const [is_listversionOpen, setIs_listversionOpen] = useState(false);

  const [optionlistversion, setOptionlistversion] = useState([
    { key: 2, value: "3.9.10" }
  ]);
  const [selectedoptionlistversion, setSelectedoptionlistversion] =
    useState("3.9.10");

  //Version end
  
  const [name, setName]=useState()
  const [description, setDescription]=useState()

  function handleSubmit(){
    //let payload={name:name, description:description, runtime:selectedOptionb, runtime_version:selectedoptionlistversion}
    let payload={name:name, description:description, runtime:"python", runtime_version:"3.9.10"}
    
    axios.post(config.METROGRAPH_API+"/action", payload, { headers: {Authorization: mystate.user.token} })
        .then((res) => {
          let action=res.data.payload.action
          dispatch({type:"alert/SET_ALERT",payload:{title:"Action created successfully", is_hide:false, type:"success"}})
					setTimeout(() => {
						dispatch({type:"alert/SET_ALERT",payload:{title:"", is_hide:true, type:""}})
						}, 3000);
          dispatch({type:"action/ADD",payload:action})
          dispatch({type:"action_code/SET",payload:action})
          navigate("/edit-action/"+action.uuid)
			  })
        .catch((error) => {
          dispatch({type:"alert/SET_ALERT",payload:{title:error.data.message, is_hide:false, type:"error"}})
					setTimeout(() => {
						dispatch({type:"alert/SET_ALERT",payload:{title:"", is_hide:true, type:""}})
						}, 3000);
        });

    console.log(payload)
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

  useEffect(()=>{
    window.scrollTo(0, 0);
    
    function loadLocalStorage() {
        const localstorage = localStorage.getItem("METROGRAPH_STORAGE");
        const data = JSON.parse(localstorage);
        if (JSON.parse(localstorage)) {
            dispatch({ type: "user/SET", payload: data });
            
            if(data.user.token)
            {
                axios.get(config.METROGRAPH_API+"/action", {headers: { Authorization: data.user.token }})
                .then(response=>{
                    loading=false
                    dispatch({type:"action/SET",payload:response.data.payload.actions})
            }).catch(error=>{
              if(error.response.status===401){
                localStorage.removeItem("METROGRAPH_STORAGE")
                return navigate("/login")
            }
              loading=false})
            }
        }
        else return navigate("/login")
      }
    loadLocalStorage();
   
},[loading])

  return (
    <div onClick={()=>handleCloseDropDown()} className="bg-black min-h-screen noselect">
      <div className="container mx-auto relative">
        <TopBar/>
       {!mystate.alert.is_hide &&
        <div className="flex justify-center w-full absolute top-28">
          <Alert title="Action created created successfully!"/>
        </div>}
      

    {/* page title */}
    <div className="max-w-[1662px] w-full pt-[104px] pr-4">
      <div className="w-full">
          <div className="flex justify-between">
              <div className="font-light font-IBM-Plex-Sans text-[36px] text-white">
                  Create an Action
              </div>
          </div>
      
      </div>
    </div>
    <div className="border-b-2 mt-[18px] border-[#2B2B2B] w-full" />
    {/* page title end */}

      <div className="flex mt-20 justify-center">
        <div className="lg:w-[993px] h-20">
          
          <div className="flex flex-col space-y-[30px] pr-[46px]">
            <div className="flex justify-between">
              <div className="space-y-[10px]">
                <div className="text-white font-IBM-Plex-Sans font-bold text-[11px]">
                  TITLE
                </div>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    className="w-[460px] h-[46px] bg-[#1A1A1A] rounded-[14px] text-[15px] font-Inter font-medium pl-[20px] pr-[40px] text-white"
                    placeholder="Action name.."
                    onChange={(e)=>setName(e.target.value)}
                    value={name}
                  />
                  <div className="bg-[#323232] w-[12px] h-[12px] rounded-full absolute  right-[16px]" />
                </div>
              </div>

              <div className="flex justify-between">
                <div className="space-y-[10px]">
                  <div className="text-white font-IBM-Plex-Sans font-bold text-[11px]">
                    DESCRCIPTION
                  </div>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      className="w-[460px] h-[46px] bg-[#1A1A1A] rounded-[14px] text-[15px] font-Inter font-medium px-[20px] pr-8 text-white"
                      placeholder="Description.."
                      onChange={(e)=>setDescription(e.target.value)}
                      value={description}
                    />
                    <div className="bg-[#323232] w-[12px] h-[12px] rounded-full absolute  right-[16px]" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="space-y-[10px]">
                <div className="text-white font-IBM-Plex-Sans font-bold text-[11px]">
                  RUNTIME
                </div>

                <div
                  onClick={(e) => {e.stopPropagation(); handleDropListRuntime()}}
                  className="mt-[28px]  rounded-[11px] h-[46px] bg-[#1A1A1A] flex justify-between items-center w-[460px] px-[19px] cursor-pointer relative"
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
                    <div className="flex flex-col space-y-2  bg-[#1A1A1A]  w-[460px]  rounded-lg  cursor-pointer absolute top-12 py-4 right-0">
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
              <div className="space-y-[10px]">
                <div className="text-white font-IBM-Plex-Sans font-bold text-[11px]">
                  VERSION
                </div>

                <div
                  onClick={(e) => {e.stopPropagation(); handleDropListVerion()}}
                  className="mt-[28px]  rounded-[11px] h-[46px] bg-[#1A1A1A] flex justify-between items-center w-[460px] px-[19px] cursor-pointer relative"
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
                    <div className="flex flex-col space-y-2 bg-[#1A1A1A] w-[460px]  rounded-lg  cursor-pointer absolute top-12 py-4 right-0">
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
            <div className="justify-end flex space-x-[6px] pt-[30px]">
              <div onClick={()=>navigate("/action")} className="text-white font-IBM-Plex-Sans text-[10px] font-bold bg-[#545454] w-[92px] h-[35px] rounded-[9px] flex items-center justify-center cursor-pointer hover:bg-gray-400">
                CANCEL
              </div>
              {(!name || !description) &&<div className="text-white font-IBM-Plex-Sans text-[10px] font-bold bg-[#7900FF] w-[92px] h-[35px] rounded-[9px] flex items-center justify-center cursor-not-allowed opacity-50">
                CREATE
              </div>}
              {(name && description) &&<div onClick={()=>handleSubmit()} className="text-white font-IBM-Plex-Sans text-[10px] font-bold bg-[#7900FF] w-[92px] h-[35px] rounded-[9px] flex items-center justify-center cursor-pointer hover:bg-purple-600">
                CREATE
              </div>}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
