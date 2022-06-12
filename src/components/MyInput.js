// React imports
import { useState } from "react";

export default function MyInput(props){
    const [value, setValue]= useState()
      return (
        <div className="space-y-[10px]">
          <div className="text-white font-IBM-Plex-Sans font-bold text-[11px]">
            {props.title}
          </div>
          <div className="relative flex items-center">
            <input
              type="text"
              className="w-[460px] h-[46px] bg-[#1A1A1A] rounded-[14px] text-[15px] font-Inter font-medium pl-[20px] pr-[40px] text-white"
              placeholder={props.placeholder}
              onChange={(e)=>{setValue(e.target.value); props.setValue(e.target.value)}}
              value={value}
            />
            <div className="bg-[#323232] w-[12px] h-[12px] rounded-full absolute  right-[16px]" />
          </div>
        </div>
      )
  }