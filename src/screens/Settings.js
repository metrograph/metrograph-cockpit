// React imports
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// External components
import axios from "axios";

// Internal components
import MyPasswordInput from "../components/MyPasswordInput";
import TopBar from "../components/TopBar";
import Alert from "../components/Alert"
import {config} from "../config"

export default function Settings() {
  
  // Global state
  const mystate = useSelector((state) => state);
  const dispatch = useDispatch();
	const navigate = useNavigate();
  
  // Inputs local state
  const [password, setPassword]=useState()
  const [newPassword, setNewPassword]=useState()
  const [newPasswordCheck, setNewPasswordCheck]=useState()

  // Alert local state
  const [alertVisible, setAlertVisible]= useState(false)
  const [alertData, setAlertData]=useState()

  // Alert trigger function
  function setAlert(title, type, delay){
    setAlertData({title:title,type:type})
    setAlertVisible(true)
    setTimeout(() => {
        setAlertVisible(false)
        }, delay);
  }

  // Request API to edit password
  function handleSubmit(){
    axios.patch(config.METROGRAPH_API+"/auth/account",{username: mystate.user.username, password: password, new_password: newPassword} ,{ headers: {Authorization: mystate.user.token} })
      .then((res) => {setAlert(res.data.message, "success", 3000)})
      .catch(() => {setAlert("Request failed with status code 401", "error", 3000)});
  }
  
  useEffect(()=>{
    window.scrollTo(0, 0);
    function loadLocalStorage() {
        const localstorage = localStorage.getItem("METROGRAPH_STORAGE");
        const data = JSON.parse(localstorage);
        if (data) dispatch({ type: "user/SET", payload: data })
        else return navigate("/login")
      }
    loadLocalStorage();
  },[dispatch, navigate])

  return (
    <div className="bg-black min-h-screen noselect">
      <div className="container mx-auto relative">
        <TopBar/>
        {alertVisible &&
        <div className="flex justify-center w-full absolute top-24">
          <Alert
              alertData={alertData}
              onHide={() => setAlertVisible(false)}
          />
        </div>
        }
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
        <div className="flex mt-20 justify-center">
          <div className="lg:w-[993px] h-20">
            <div className="flex flex-col space-y-[30px] pr-[46px]">
              <div className="flex justify-between">
                <div className="w-[460px]">
                  <MyPasswordInput key="title" title="CURRENT PASSWORD" placeholder="****" value={password} setValue={(e)=>setPassword(e)} />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-[460px]">
                  <MyPasswordInput key="title" title="NEW PASSWORD" placeholder="****" value={newPassword} setValue={(e)=>setNewPassword(e)} />
                </div>
                <div className="w-[460px]">
                  <MyPasswordInput key="title" title="CONFIRM PASSWORD" placeholder="****" value={newPasswordCheck} setValue={(e)=>setNewPasswordCheck(e)} />
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
