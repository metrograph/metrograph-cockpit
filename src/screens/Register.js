// React imports
import axios from "axios";
import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

// Internal components
import Alert from "../components/Alert"
import MyInput from "../components/MyInput";
import MyPasswordInput from "../components/MyPasswordInput";
import logo from "../assets/logo-light-gray.png"
import { config } from "../config";
import FadeAnimation from "../components/Animations/FadeAnimation";


function CreateButton({login,handleEnterKey, username, password, loading}){
    if (loading) {
        return(
            <div className="justify-end flex mt-[27px]  mx-[87px]">
                <div  className="text-white font-Inter text-[13px] opacity-50 font-bold bg-[#7900FF] w-[118px] h-[46px] rounded-[9px] flex items-center justify-center cursor-pointer">
                    <div className="dot-falling" />
                </div>
            </div>
        )
    }
    else return(
        <div className="justify-end flex mt-[27px]  mx-[87px]">
            {username && password && <div onClick={()=>login()} onKeyPress={() => handleEnterKey()}  className="text-white font-Inter text-[13px] font-bold bg-[#7900FF] w-[118px] h-[46px] rounded-[9px] flex items-center justify-center cursor-pointer hover:bg-purple-600">
            LOGIN
            </div>}
            {(!username || !password) && <div  className="text-white font-Inter text-[13px] opacity-50 font-bold bg-[#7900FF] w-[118px] h-[46px] rounded-[9px] flex items-center justify-center cursor-not-allowed">
            LOGIN
            </div>}
            
        </div>
    )
}

export default function Register(){
    const navigate = useNavigate();
    
    // Inputs local state
    const [username, setUsername]=useState("")
    const [password, setPassword]=useState("")
    const [confirmPassword, setConfirmPassword]=useState("")

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
    
    // Request API to login
    function login() {
        axios.post(config.METROGRAPH_API+"/auth/register", {username: username, password: password})
        .then(function (response) {
            setAlert(response.data.message,"success",3000)
            return navigate("/login",{state:{response:response.data.message}});
        })
        .catch((error) =>{
            if (error.response) setAlert("Invalid credentials", "error", 3000)
            else setAlert(error.message,"error",3000)
        });
    }
    
    // Handle Enter on Login button
    function handleEnterKey(event) {
        if(event.key === 'Enter') login()
    }

    useEffect(() => {
        function loadLocalStorage() {
          const localstorage = localStorage.getItem("METROGRAPH_STORAGE");
          if (JSON.parse(localstorage)) return navigate("/");
        }
        loadLocalStorage();
      },[navigate]);

    return (
        <div className="flex ">
            <div className="bg-black h-screen w-[507px] relative">
                <div className="flex flex-col justify-center items-center mt-20 mx-[87px] relative">
                    <div className="flex justify-center items-center space-x-[32px] w-full">
                        <img src={logo} className="w-[136px] h-[29px]" alt="Metrograph-logo"/>
                        <div className="border-b border-[#535353] border-[1px] w-full"/>
                    </div>
                    {alertVisible && <div className="flex justify-center w-full absolute top-12">
                        <Alert
                            alertData={alertData}
                            onHide={() => setAlertVisible(false)}
                        />
                    </div>}
                </div>
                <FadeAnimation>
                <div className="bottom-[140px] absolute">
                    <div className="ml-[87px]">
                        <div className="text-[48px] text-white font-IBM-Plex-Sans mb-[14px]">Setup</div>
                        <div className="text-[13px] text-white font-IBM-Plex-Sans">Please fill your account crededntials</div>
                    </div>
                    <div className="mx-[87px] mt-[58px] space-y-4">
                    <MyInput key="username" placeholder="username" value={username} setValue={(e)=>setUsername(e)}/>
                    <MyPasswordInput key="password" placeholder="****" value={password} setValue={(e)=>setPassword(e)} />
                    <MyPasswordInput key="confirmPassword" placeholder="****" value={confirmPassword} setValue={(e)=>setConfirmPassword(e)} />
                    </div>
                    <div className="justify-end flex mt-[27px]  mx-[87px]">
                        {username && password && (password===confirmPassword) && <div onClick={()=>login()} onKeyPress={() => handleEnterKey()}  className="text-white font-Inter text-[13px] font-bold bg-[#7900FF] w-[118px] h-[46px] rounded-[9px] flex items-center justify-center cursor-pointer hover:bg-purple-600">
                        CREATE
                        </div>}
                        {(!username || !password || (password!=confirmPassword)) && <div  className="text-white font-Inter text-[13px] opacity-50 font-bold bg-[#7900FF] w-[118px] h-[46px] rounded-[9px] flex items-center justify-center cursor-not-allowed">
                        CREATE
                        </div>}
                    </div>
                    <div className="justify-end flex space-x-2  mt-[27px]  mx-[87px]">
                        <div onClick={()=>navigate("/login")}  className="text-white text-[13px] font-IBM-Plex-Sans font-medium cursor-pointer">
                        You have account? 
                        </div>
                        <div  className="text-white text-[13px] font-IBM-Plex-Sans font-medium">
                        |
                        </div>
                        <div  className="text-white text-[13px] font-IBM-Plex-Sans font-medium cursor-pointer">
                        Forgot Password?
                        </div>
                    </div>
                </div>
                </FadeAnimation>
            </div>
            <div className="bg-[#7900FF] h-screen grow relative overflow-hidden">
                <div className="mx-16 my-20 flex  h-screen relative">
                    <div className="pattern absolute"/>
                </div>
                <div className=" text-white font-bold text-right text-[16px] font-IBM-Plex-Mono absolute  top-20 right-6 bg-[#7900FF] px-10">
                    2022    |    Metrogtaph.io    |    v1.29.3
                    </div>
                <div className="absolute bottom-[124px] right-6  px-10 bg-[#7900FF]">
                    <div className="text-right font-light font-Inter text-[64px] text-white">The Open Source Cloud
                    </div>
                    <div className="text-right font-light font-Inter text-[64px] text-white ">Native Platform
                    </div>
                </div>
            </div>
        </div>
    )
}