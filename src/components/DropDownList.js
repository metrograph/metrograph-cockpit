// React imports
import { useState} from "react";

// Icons imports
import { ReactComponent as ArrowDown } from "../assets/icons/arrow-down.svg";
import { BsFillCheckCircleFill } from "react-icons/bs";

export default function DropDpwnList(props){
    const listOptions=props.listOptions
    const [selectedOption, setSelectedOtion] = useState(props.listOptions[0].value);
    const [listOpen, setListOpen] = useState(false);
  
    return (
        <div className="space-y-[10px]">
            <div className="text-white font-IBM-Plex-Sans font-bold text-[11px]">
            {props.title}
            </div>
            <div
            onClick={(e) => {e.stopPropagation(); setListOpen(!listOpen)}}
            className="mt-[28px]  rounded-[11px] h-[46px] bg-[#1A1A1A] flex justify-between items-center w-[460px] px-[19px] cursor-pointer relative"
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
            {listOpen && (
                <div className="flex flex-col space-y-2  bg-[#1A1A1A]  w-[460px]  rounded-lg  cursor-pointer absolute top-12 py-4 right-0">
                {listOptions.map((element) => (
                    <div
                    onClick={() => {
                        props.setValue(element.value);
                        setSelectedOtion(element.value);
                        setListOpen(!listOpen);
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