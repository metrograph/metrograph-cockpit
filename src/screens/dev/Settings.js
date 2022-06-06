import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ArrowDown } from "../../assets/icons/arrow-down.svg";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import TopBar from "../../components/dev/TopBar";
import {config} from "../../config"


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

export default function Settings() {
  const dispatch = useDispatch();
	const mystate = useSelector((state) => state);
  const navigate = useNavigate();
  let loading=true
  const [password, setPassword]=useState()
  const [newPassword, setNewPassword]=useState()
  const [newPasswordCheck, setNewPasswordCheck]=useState()

function handleSubmit(){
    axios.patch(config.METROGRAPH_API+"/auth/account",{username: mystate.user.username, password: password, new_password: newPassword} ,{ headers: {Authorization: mystate.user.token} })
    .then((res) => {
      dispatch({type:"alert/SET_ALERT",payload:{title:res.data.message, is_hide:false, type:"success"}})
    })
        .catch((error) => {
          dispatch({type:"alert/SET_ALERT",payload:{title:error.data.message, is_hide:false, type:"error"}})
					setTimeout(() => {
						dispatch({type:"alert/SET_ALERT",payload:{title:"", is_hide:true, type:""}})
						}, 3000);
        });
}

  useEffect(()=>{
    window.scrollTo(0, 0);
    dispatch({type:"active_element/SET", payload:{}})
    dispatch({type:"code_editor/SET", payload:{selectedFile:{path :"", name :"",content :null},openedFiles:[]}})
    dispatch({type:"setFileExplorer", payload:{}})
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
                    Settings
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
                    CURRENT PASSWORD
                </div>
                <div className="relative flex items-center">
                  <input
                    type="password"
                    className="w-[460px] h-[46px] bg-[#1A1A1A] rounded-[14px] text-[15px] font-Inter font-medium pl-[20px] pr-[40px] text-white"
                    placeholder="****"
                    onChange={(e)=>setPassword(e.target.value)}
                    value={password}
                 />
                  <div className="bg-[#323232] w-[12px] h-[12px] rounded-full absolute  right-[16px]" />
                </div>
              </div>

            </div>
            <div className="flex justify-between">
                <div className="space-y-[10px]">
                    <div className="text-white font-IBM-Plex-Sans font-bold text-[11px]">
                        NEW PASSWORD
                    </div>
                    <div className="relative flex items-center">
                    <input
                        type="password"
                        className="w-[460px] h-[46px] bg-[#1A1A1A] rounded-[14px] text-[15px] font-Inter font-medium pl-[20px] pr-[40px] text-white"
                        placeholder="****"
                        onChange={(e)=>setNewPassword(e.target.value)}
                        value={newPassword}
                    />
                    <div className="bg-[#323232] w-[12px] h-[12px] rounded-full absolute  right-[16px]" />
                    </div>
                </div>
                <div className="space-y-[10px]">
                <div className="text-white font-IBM-Plex-Sans font-bold text-[11px]">
                    CONFIRM PASSWORD
                </div>
                <div className="relative flex items-center">
                  <input
                    type="password"
                    className="w-[460px] h-[46px] bg-[#1A1A1A] rounded-[14px] text-[15px] font-Inter font-medium pl-[20px] pr-[40px] text-white"
                    placeholder="****"
                    onChange={(e)=>setNewPasswordCheck(e.target.value)}
                    value={newPasswordCheck}
                 />
                  <div className="bg-[#323232] w-[12px] h-[12px] rounded-full absolute  right-[16px]" />
                </div>
              </div>
            </div>
            <div className="justify-end flex space-x-[6px] pt-[30px]">
              <div onClick={()=>navigate("/action")} className="text-white font-IBM-Plex-Sans text-[10px] font-bold bg-[#545454] w-[92px] h-[35px] rounded-[9px] flex items-center justify-center cursor-pointer hover:bg-gray-400">
                CANCEL
              </div>
              {((!password || !newPassword || !newPasswordCheck) || (newPassword!==newPasswordCheck)) && <div className=" opacity-50  text-white font-IBM-Plex-Sans text-[10px] font-bold bg-[#7900FF] w-[92px] h-[35px] rounded-[9px] flex items-center justify-center cursor-not-allowed">
                SAVE
              </div>}
              
              {(password && newPassword && (newPassword===newPasswordCheck)) && <div onClick={()=>handleSubmit()} className=" text-white font-IBM-Plex-Sans text-[10px] font-bold bg-[#7900FF] w-[92px] h-[35px] rounded-[9px] flex items-center justify-center hover:bg-purple-600 cursor-pointer">
                SAVE
              </div>}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
