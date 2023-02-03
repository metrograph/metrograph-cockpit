// React imports
import {useState} from "react";
import {useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Icons imports
import logo from "../assets/logo.svg";
import arrowdown from "../assets/icons/arrow-down.svg";
import avatar from "../assets/avatar/avatar-2.png";

export default function TopBar({listOpen, setListOpen}){
    const mystate = useSelector((state)=> state)
    const navigate = useNavigate()
    
    function logout() {
    localStorage.removeItem("METROGRAPH_STORAGE")
    return navigate("/login")
    }
  
    return (
        <div className="relative">
        <div className="flex justify-between items-center pt-[43px]">
          <div onClick={()=>navigate("/action")} className="text-white cursor-pointer">
            <img src={logo} className="h-[34px] w-[147px]" alt="" />
          </div>
          <div className="flex grow lg:justify-end lg:pr-[187px] text-white space-x-[82px]">
          </div>
          <div>
            <div className="flex items-center space-x-4 relative">
              <img
                src={avatar}
                className="h-[38px] w-[38px] rounded-full"
                alt=""
              />
              <div
                onClick={(e) =>{e.stopPropagation(); setListOpen(!listOpen)}}
                className="flex space-x-2 cursor-pointer"
              >
                <div className="text-white font-IBM-Plex-Sans font-semibold text-[16px]">
                  {mystate.user.username}
                </div>
                <img src={arrowdown} alt="" />
              </div>

              {listOpen && (
                <div key="1" className="absolute z-20 w-[180px] top-12 right-0 py-4 flex flex-col space-y-2 bg-[#1A1A1A] rounded-lg cursor-pointer">
                  <div onClick={()=>navigate("/settings")} className="text-white text-md font-Inter hover:bg-cock-dark-400 p-2 px-4">
                    Settings
                  </div>
                  <div onClick={()=>logout()} className="text-white text-md font-Inter hover:bg-cock-dark-400 p-2 px-4">
                    Logout
                  </div>
                  
                </div>
              )}
            </div>
          </div>
        </div>
       
      </div>
    )
}