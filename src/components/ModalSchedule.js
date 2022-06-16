// React imports
import { useState } from "react";

// Icons import
import closeIcon from "../assets/icons/close.svg"

// Local imports
import DropDpwnList from "./DropDownList";

export default function ModelSchedule(props){
    
    const [weeks, setWeeks]=useState(true)
    const [days, setDat]=useState(false)
    const dateList = [
        { key: 1, value: "Weeks" },
        { key: 2, value: "Days" },
        { key: 3, value: "Hours" },
        { key: 4, value: "Minutes" },
        { key: 5, value: "Secondes" }
        ]
    const [selectedDate, setSelectedDate] = useState("Weeks");
    const [listOpen, setListOpen] = useState(false);

    const dayList = [
        { key: 1, value: "Monday" },
        { key: 2, value: "Tuesday" },
        { key: 3, value: "Wednesday" },
        { key: 4, value: "Thursday" },
        { key: 5, value: "Friday" },
        { key: 6, value: "Saturday" },
        { key: 7, value: "Sunday" }
        ]
    const [selectedDay, setSelectedDay] = useState("Days");
    const [listDayOpen, setListDayOpen] = useState(false);
    const [hours, setHours]=useState()
    const [minutes, setMinutes]=useState()
    const [secondes, setSecondes]=useState()
    

    
    function handleCancel(){
        props.onHide()
    }

    return (
        <div onClick={()=>setListOpen(false)} className="bg-black/60 grid place-content-center">
            <div className="bg-[#121212] flex flex-col border-2 border-[hsl(0,0%,14%)] h-[454px] w-[750px] rounded-[22px] px-12 py-[47px] relative">
                <div onClick={()=>handleCancel()} className="absolute top-[28px] right-[30px] cursor-pointer bg-[#262626] hover:bg-gray-400 h-[28px] w-[28px] grid place-content-center rounded-full">
                    <img src={closeIcon} className="h-[10px] w-[10px]" alt="close_icon"/>
                </div>
                <div className="text-white text-[20px] font-medium font-IBM-Plex-Sans">
                Schedule Configuration
                </div>
                <div className="flex flex-col mt-[35px] grow">
                    <div className="font-IBM-Plex-Sans font-regular text-white text-[16px]">Execute this Action every:</div>
                    <div className="flex items-center mt-[23px] space-x-2">
                        <input title="every" className="h-[49px] w-[62px] bg-[#202020] rounded-[13px] text-white font-Inter font-medium text-[14px] text-center" />
                        <div className="w-[150px]">
                            <DropDpwnList
                                    listOptions={dateList}
                                    setValue={(e)=>setSelectedDate(e)}
                                    value={selectedDate}
                                    listOpen={listOpen}
                                    toogleList={(e)=>setListOpen(e)}
                            />
                        </div>
                        <div className="font-IBM-Plex-Sans text-[16px] font-regular px-2 text-white">at</div>
                        {selectedDate==="Weeks" &&
                            <div className="w-[150px]">
                                <DropDpwnList
                                listOptions={dayList}
                                setValue={(e)=>setSelectedDay(e)}
                                value={selectedDay}
                                listOpen={listDayOpen}
                                toogleList={(e)=>setListDayOpen(e)}
                                />
                            </div>
                        }
                        {(selectedDate=="Weeks" || selectedDate=="Days" || selectedDate=="Hours") &&
                            <div className="flex items-center justify-center space-x-2">
                            <input title="Hours" value={hours} onChange={(e)=> setHours(e.target.value)} className="h-[49px] w-[62px] bg-[#202020] rounded-[13px] text-white font-Inter font-medium text-[14px] text-center" />
                            <div className="font-IBM-Plex-Sans text-[16px] font-regular text-white">:</div>    
                            </div>}
                        {selectedDate!="Secondes" &&
                            <div className="flex items-center justify-center space-x-2">
                                <input title="Minutes" value={minutes} onChange={(e)=> setMinutes(e.target.value)} className="h-[49px] w-[62px] bg-[#202020] rounded-[13px] text-white font-Inter font-medium text-[14px] text-center" />
                                <div className="font-IBM-Plex-Sans text-[16px] font-regular text-white">:</div>
                            </div>
                        }
                        <input title="Seconds" value={secondes} onChange={(e)=> setSecondes(e.target.value)} className="h-[49px] w-[62px] bg-[#202020] rounded-[13px] text-white font-Inter font-medium text-[14px] text-center" />
                    </div>
                </div>
                <div className="flex flex-col mt-[35px] grow">
                    <div className="font-IBM-Plex-Sans font-regular text-white text-[16px]">Run this schedule:</div>
                    <div className="flex items-center mt-[23px] space-x-4">
                        <input title="times" className="h-[49px] w-[62px] bg-[#202020] rounded-[11px] text-white font-Inter font-medium text-[14px] text-center" />
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