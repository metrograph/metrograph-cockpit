import { useDispatch, useSelector } from "react-redux"
import { ReactComponent as ArrowDown } from "../../assets/icons/arrow-down.svg";
import { BsFillCheckCircleFill } from "react-icons/bs";
import closeIcon from "../../assets/icons/close.svg"
import axios from "axios"
import { config } from "../../config"
import { useState } from "react";

export default function ModelSchedule(props){
    const mystate = useSelector((state)=>state)
    const dispatch = useDispatch()
    const daysList = [
        { key: 1, value: "Day" },
        { key: 2, value: "Monday" },
        { key: 3, value: "Tuesday" },
        { key: 4, value: "Wednesday" },
        { key: 5, value: "Thursday" },
        { key: 6, value: "Friday" },
        { key: 7, value: "Saturday" },
        { key: 8, value: "Sunday" }]
    const [selectedDay, setSelectedDay] = useState("Day");
    
    function handleCancel(){
        dispatch({type:"modal_schedule/SET",payload:{is_hide: true, action:{}}})
    }

    function handleDropListRuntime(){
        if(mystate.activeElement.opendDropDown==="day") dispatch({type:"active_element/DROP_DOWN", payload:{key:"0"}})
        else dispatch({type:"active_element/DROP_DOWN", payload:{key:"day"}})
        dispatch({type:"alert/SET_ALERT", payload:{is_hide:true, type:""}})
      }

    return (
        <div className="bg-black/60 min-h-screen grid place-content-center">
            <div className="bg-[#121212] flex flex-col border-2 border-[hsl(0,0%,14%)] h-[454px] w-[686px] rounded-[22px] px-12 py-[47px] relative">
                <div onClick={()=>handleCancel()} className="absolute top-[28px] right-[30px] cursor-pointer bg-[#262626] hover:bg-gray-400 h-[28px] w-[28px] grid place-content-center rounded-full">
                    <img src={closeIcon} className="h-[10px] w-[10px]"/>
                </div>
                <div className="text-white text-[20px] font-medium font-IBM-Plex-Sans">
                Schedule Configuration
                </div>
                <div className="flex flex-col mt-[35px] grow">
                    <div className="font-IBM-Plex-Sans font-regular text-white text-[16px]">Execute this Action every:</div>
                    <div className="flex items-center mt-[23px] space-x-2">
                        <div className="w-[155px]">
                            <div onClick={(e) => {e.stopPropagation(); handleDropListRuntime()}}
                                className="w-full   rounded-[11px] h-[46px] bg-[#1A1A1A] flex justify-between items-center px-[19px] cursor-pointer relative">
                                <div
                                className={
                                    selectedDay !== "Language"
                                    ? "font-Inter font-medium text-[15px] text-white"
                                    : "font-Inter font-medium text-[15px] text-[#444444]"
                                }
                                >
                                {selectedDay}
                                </div>
                                <ArrowDown height="8px" width="13px" fill="white" />
                                {mystate.activeElement.opendDropDown==="day" && (
                                <div className="flex flex-col space-y-2  bg-[#1A1A1A]  w-full  rounded-lg  cursor-pointer absolute top-12 py-4 right-0">
                                    {daysList.map((element) => (
                                    <div key={element.key}
                                        onClick={() => {
                                        setSelectedDay(element.value);
                                        
                                        }}
                                        className={
                                        element.value === selectedDay
                                            ? "flex items-center justify-between text-white text-md font-Inter bg-[#7900FF]   py-2 px-4"
                                            : "flex items-center justify-between text-white text-md font-Inter hover:bg-[#7900FF] py-2 px-4"
                                        }
                                    >
                                        <div>{element.value}</div>
                                        {element.value === selectedDay ? (
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
                        <div className=" font-IBM-Plex-Sans text-[16px] font-regular px-4 text-white">at</div>
                        <input className="h-[49px] w-[62px] bg-[#202020] rounded-[11px] text-white font-Inter font-medium text-[11px] text-center" />
                        <div className=" font-IBM-Plex-Sans text-[16px] font-regular text-white">:</div>
                        <input className="h-[49px] w-[62px] bg-[#202020] rounded-[11px] text-white font-Inter font-medium text-[11px] text-center" />
                    </div>
                </div>
                <div className="flex flex-col mt-[35px] grow">
                    <div className="font-IBM-Plex-Sans font-regular text-white text-[16px]">Run this schedule:</div>
                    <div className="flex items-center mt-[23px] space-x-4">
                        <input className="h-[49px] w-[62px] bg-[#202020] rounded-[11px] text-white font-Inter font-medium text-[11px] text-center" />
                        <div className=" font-IBM-Plex-Sans text-[16px] font-regular text-white">Times</div>
                    </div>
                </div>
                <div className="flex justify-end space-x-4">
                    <div className="">
                        <div onClick={()=>handleCancel()} className="text-white font-IBM-Plex-Sans text-[10px] font-bold bg-[#202020] w-[80px] h-[35px] rounded-[9px] flex items-center justify-center cursor-pointer hover:bg-gray-600">
                            CANCEL
                        </div>
                    </div>
                    <div className="">
                        <div  className="text-white font-IBM-Plex-Sans text-[10px] font-bold bg-[#7900FF] w-[80px] h-[35px] rounded-[9px] flex items-center justify-center cursor-pointer hover:bg-purple-600">
                            RUN
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
}