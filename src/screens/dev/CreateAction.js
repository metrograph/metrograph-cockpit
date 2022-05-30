import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ActionIcon } from "../../assets/topbar/action.svg";
import { ReactComponent as DashboardIcon } from "../../assets/topbar/dashboard.svg";
import { ReactComponent as ApiIcon } from "../../assets/topbar/api.svg";
import { ReactComponent as ApplicationIcon } from "../../assets/topbar/apps.svg";
import { ReactComponent as WorkflowsIcon } from "../../assets/topbar/workflows.svg";
import { ReactComponent as ArrowDown } from "../../assets/icons/arrow-down.svg";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import TopBar from "../../components/dev/TopBar"

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

export default function CreateAction() {
  const dispatch = useDispatch();
	const mystate = useSelector((state) => state);
  const navigate = useNavigate();
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
    
    axios.post(hostname+"/action", payload, { headers: {Authorization: token} })
        .then((res) => {
			    let response=res.data.payload.action
          dispatch({type:"alert/SET_ALERT",payload:{title:"Action created successfully", is_hide:false, type:""}})
					setTimeout(() => {
						dispatch({type:"alert/SET_ALERT",payload:{title:"", is_hide:true, type:""}})
						}, 3000);
          dispatch({type:"action_code/SET",payload:response})
          navigate("/edit-action/"+response.uuid)
			  })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            return console.log("error");
          } else {
            console.log("Sorry, we encountered a network error.")
          }
        });

    console.log(payload)
  }

  

  return (
    <div className="bg-black min-h-screen noselect">
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
                  onClick={() => setIs_listbOpenb(!is_listbOpen)}
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
                  {is_listbOpen && (
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
                  onClick={() => setIs_listversionOpen(!is_listversionOpen)}
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
                  {is_listversionOpen && (
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
              <div onClick={()=>handleSubmit()} className="text-white font-IBM-Plex-Sans text-[10px] font-bold bg-[#7900FF] w-[92px] h-[35px] rounded-[9px] flex items-center justify-center cursor-pointer hover:bg-purple-600">
                CREATE
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
