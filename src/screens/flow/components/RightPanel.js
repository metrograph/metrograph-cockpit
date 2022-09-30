import React, {useState,useEffect} from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { ReactComponent as ArrowDown } from "../../../assets/icons/arrow-down.svg";
import "../../../assets/css/App.css";


export default function RightPanel(props){
  const [is_listOpen, setIs_listOpen] = useState(false);

  const [optionList, setOptionList] = useState([
    { key: 2, value: "Discrod Server A" },
    { key: 3, value: "Discrod Server B" },
    { key: 4, value: "Discrod Server C" },
  ]);
  const [selectedOption, setSelectedOtion] = useState("Choose Discrod Server");

  const [is_listbOpen, setIs_listbOpenb] = useState(false);

  const [optionListb, setOptionListb] = useState([
    { key: 2, value: "Channel Server A" },
    { key: 3, value: "Channel Server B" },
    { key: 4, value: "Channel Server C" },
  ]);
  const [selectedOptionb, setSelectedOtionb] = useState("Choose Channel");
  useEffect(() => {
    console.log("Node state changed")
  },[props.nodeState])

    return (
        <div>
            
        <div className="w-[384px] flex flex-col">
          <div>
            <div
              onClick={() => setIs_listOpen(!is_listOpen)}
              className="mt-[28px]  rounded-[11px] h-[46px] bg-[#F5F5F5] flex justify-between items-center mx-[28px] px-[19px] cursor-pointer relative"
            >
              <div className="font-Inter font-medium text-[15px]">
                {selectedOption}
              </div>
              <ArrowDown height="8px" width="13px" fill="black" />
              {is_listOpen && (
                <div className="flex flex-col space-y-2 bg-cock-dark w-[327px]  rounded-lg  cursor-pointer absolute z-10 top-12 py-4 right-0">
                  {optionList.map((element) => (
                    <div
                      onClick={() => {
                        setSelectedOtion(element.value);
                        setIs_listOpen(!is_listOpen);
                      }}
                      className={
                        element.value == selectedOption
                          ? "flex items-center justify-between text-white text-md font-Inter bg-cock-dark-400  py-2 px-4"
                          : "flex items-center justify-between text-white text-md font-Inter hover:bg-cock-dark-400 py-2 px-4"
                      }
                    >
                      <div>{element.value}</div>
                      {element.value == selectedOption ? (
                        <BsFillCheckCircleFill fill="#156FF8" />
                      ) : (
                        <div></div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-[32px] border-b-[3px] border-[#F5F5F5] w-full"></div>
          </div>

          <div
            className="flex flex-col grow justify-between overflow-y-auto height-panel"
            style={{ scrollbarWidth: "thin" }}
          >
            <div className="">
              <div className="mt-[31px] mx-[28px]">
                <div className="flex justify-between">
                  <div className="font-Inter font-semibold text-[12px]">
                    SERVER CHANNEL
                  </div>
                  <div className="h-4 w-4 rounded-full bg-[#F5F5F5] border-[1px] border-[#EDEDED] cursor-pointer flex items-center justify-center">
                    <div className="font-Inter font-bold text-[#979797] text-[8px]">
                      i
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => setIs_listbOpenb(!is_listbOpen)}
                  className="mt-[28px]  rounded-[11px] h-[46px] bg-[#F5F5F5] flex justify-between items-center  px-[19px] cursor-pointer relative"
                >
                  <div className="font-Inter font-medium text-[15px]">
                    {selectedOptionb}
                  </div>
                  <ArrowDown height="8px" width="13px" fill="black" />
                  {is_listbOpen && (
                    <div className="flex flex-col space-y-2 bg-cock-dark w-[327px]  rounded-lg  cursor-pointer absolute top-12 py-4 right-0">
                      {optionListb.map((element) => (
                        <div
                          onClick={() => {
                            setSelectedOtionb(element.value);
                            setIs_listbOpenb(!is_listbOpen);
                          }}
                          className={
                            element.value == selectedOptionb
                              ? "flex items-center justify-between text-white text-md font-Inter bg-cock-dark-400  py-2 px-4"
                              : "flex items-center justify-between text-white text-md font-Inter hover:bg-cock-dark-400 py-2 px-4"
                          }
                        >
                          <div>{element.value}</div>
                          {element.value == selectedOptionb ? (
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

              <div className="mt-[32px] mx-[28px]">
                <div className="flex justify-between">
                  <div className="font-Inter font-semibold text-[12px]">
                    Bot Name
                  </div>
                  <div className="h-4 w-4 rounded-full bg-[#F5F5F5] border-[1px] border-[#EDEDED] cursor-pointer flex items-center justify-center">
                    <div className="font-Inter font-bold text-[#979797] text-[8px]">
                      i
                    </div>
                  </div>
                </div>
                <input
                  className="mt-[16px] font-Inter font-medium text-[15px] rounded-[11px] h-[46px] bg-[#F5F5F5] flex items-center px-[19px] w-full"
                  placeholder="Bot name"
                  value={props.nodeState}
                />
              </div>

              <div className="mt-[32px] mx-[28px]">
                <div className="flex justify-between">
                  <div className="font-Inter font-semibold text-[12px]">
                    Message
                  </div>
                  <div className="h-4 w-4 rounded-full bg-[#F5F5F5] border-[1px] border-[#EDEDED] cursor-pointer flex items-center justify-center">
                    <div className="font-Inter font-bold text-[#979797] text-[8px]">
                      i
                    </div>
                  </div>
                </div>
                <textarea
                  id="textareaResizeNone"
                  className="mt-[16px] pt-[15px] font-Inter font-medium text-[15px] rounded-[11px] h-[127px] bg-[#F5F5F5] flex items-center px-[19px] w-full"
                  placeholder="Message.."
                />
              </div>
            </div>
            <div className="flex space-x-[7px]  mx-8">
              <div className="hover:bg-purple-600 bg-cock-purple h-[46px] w-[160px] font-Inter font-bold text-[13px] text-white rounded-[11px] flex justify-center items-center cursor-pointer">
                TEST
              </div>
              <div className="hover:bg-green-400 bg-[#7ECA9C] h-[46px] w-[160px] font-Inter font-bold text-[13px] text-white rounded-[11px] flex justify-center items-center cursor-pointer">
                SAVE
              </div>
            </div>
          </div>
        </div>
       
        </div>
    )
}