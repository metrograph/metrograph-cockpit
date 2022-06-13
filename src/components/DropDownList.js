// React imports
import { useState} from "react";

// Icons imports
import { ReactComponent as ArrowDown } from "../assets/icons/arrow-down.svg";
import { BsFillCheckCircleFill } from "react-icons/bs";

export default function DropDpwnList(props){
    const listOptions=props.listOptions
    const [selectedOption, setSelectedOtion] = useState(props.listOptions[0].value);
    
    return (
        <div className="w-full">
            {props.title &&
            <div className="text-white font-IBM-Plex-Sans font-bold text-[11px] mb-[12px]">
                {props.title}
            </div>
            }
            <div
            onClick={(e) => {e.stopPropagation(); props.toogleList(!props.listOpen)}}
            className="rounded-[11px] h-[46px] bg-[#1A1A1A] flex justify-between items-center w-full px-[19px] cursor-pointer relative"
            >
            <div
                className={
                selectedOption !== "Language"
                    ? "font-Inter font-medium text-[15px] text-white"
                    : "font-Inter font-medium text-[15px] text-[#444444]"
                }
            >
                {selectedOption}
            </div>
            <ArrowDown height="8px" width="13px" fill="white" />
            {props.listOpen && (
                <div className="flex flex-col space-y-2  bg-[#1A1A1A]  w-full  rounded-lg  cursor-pointer absolute top-12 py-4 right-0">
                {listOptions.map((element) => (
                    <div
                    onClick={() => {
                        props.setValue(element.value);
                        setSelectedOtion(element.value);
                        props.toogleList(false)
                    }}
                    className={
                        element.value === selectedOption
                        ? "flex items-center justify-between text-white text-md font-Inter bg-[#7900FF]   py-2 px-4"
                        : "flex items-center justify-between text-white text-md font-Inter hover:bg-[#7900FF] py-2 px-4"
                    }
                    >
                    <div>{element.value}</div>
                    {element.value === selectedOption ? (
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
    )
}