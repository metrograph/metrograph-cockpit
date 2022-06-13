// React imports
import axios from "axios";
import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

// Internal components
import Alert from "../components/Alert"
import logo from "../assets/logo-light-gray.png"
import { config } from "../config";


export default function Login(){
    const navigate = useNavigate();
    
    // Inputs local state
    const [username, setUsername]=useState("")
    const [password, setPassword]=useState("")

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
        axios.post(config.METROGRAPH_API+"/auth", {username: username, password: password})
        .then(function (response) {
            localStorage.setItem("METROGRAPH_STORAGE", JSON.stringify(response.data.payload));
            return navigate("/");
        })
        .catch((error) =>{if (error.response && error.response.status) setAlert("Invalid credentials", "error", 3000)});
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
                <div className="bottom-[140px] absolute">
                    <div className="ml-[87px]">
                        <div className="text-[48px] text-white font-IBM-Plex-Sans mb-[14px]">Sign In</div>
                        <div className="text-[13px] text-white font-IBM-Plex-Sans">Please fill your crededntials to login</div>
                    </div>
                    <div className="mx-[87px] mt-[58px]">
                        <input
                        type="text"
                        className="h-[46px] bg-[#1A1A1A] w-full rounded-[14px] text-[15px] font-Inter font-medium pl-[20px] pr-[40px] text-white"
                        placeholder="Username"
                        onChange={(e)=>setUsername(e.target.value)}
                        onKeyPress={(e) => handleEnterKey(e)}
                        value={username}
                        />

                        <input
                        type="password"
                        className="mt-[14px] h-[46px] bg-[#1A1A1A] w-full rounded-[14px] text-[15px] font-Inter font-medium pl-[20px] pr-[40px] text-white"
                        placeholder="****"
                        onChange={(e)=>setPassword(e.target.value)}
                        onKeyPress={(e) => handleEnterKey(e)}
                        value={password}
                        />
                    </div>
                    <div className="justify-end flex mt-[27px]  mx-[87px]">
                        {username && password && <div onClick={()=>login()} onKeyPress={() => handleEnterKey()}  className="text-white font-Inter text-[13px] font-bold bg-[#7900FF] w-[118px] h-[46px] rounded-[9px] flex items-center justify-center cursor-pointer hover:bg-purple-600">
                        LOGIN
                        </div>}
                        {(!username || !password) && <div  className="text-white font-Inter text-[13px] opacity-50 font-bold bg-[#7900FF] w-[118px] h-[46px] rounded-[9px] flex items-center justify-center cursor-not-allowed">
                        LOGIN
                        </div>}
                    </div>
                    <div className="justify-end flex space-x-2  mt-[27px]  mx-[87px]">
                        <div  className="text-white text-[13px] font-IBM-Plex-Sans font-medium cursor-pointer">
                        Setup not done yet? 
                        </div>
                        <div  className="text-white text-[13px] font-IBM-Plex-Sans font-medium">
                        |
                        </div>
                        <div  className="text-white text-[13px] font-IBM-Plex-Sans font-medium cursor-pointer">
                        Forgot Password?
                        </div>
                    </div>
                </div>
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