// React imports
import React from "react";

// Internal components
import { ReactComponent as CloseIcon } from "../assets/icons/close.svg";

export default function Alert(props){
    function handleCloseAlert(){
      props.onHide()
    }
    
    if(props.alertData.type==="success")
      {
        return (
        <div className="h-[64px]  bg-[#ADEED6] w-full rounded-[10px] flex justify-between items-center px-[20px]">
          <div className="text-black font-[12px]">{props.alertData.title}</div>
          <CloseIcon onClick={()=>handleCloseAlert()} className="h-2 w-2 cursor-pointer" fill="black"/>
        </div>)
      }
    else if(props.alertData.type==="error")
    {
      return (
        <div className="h-[64px]  bg-red-400 w-full rounded-[10px] flex justify-between items-center px-[20px]">
          <div className="text-black font-[12px]">{props.alertData.title}</div>
          <CloseIcon onClick={()=>handleCloseAlert()} className="h-2 w-2 cursor-pointer" fill="black"/>
        </div>)
    }
}