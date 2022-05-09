import { useState } from "react";
import { ReactComponent as ActionIcon } from "../../assets/topbar/action.svg";
import { ReactComponent as DashboardIcon } from "../../assets/topbar/dashboard.svg";
import { ReactComponent as ApiIcon } from "../../assets/topbar/api.svg";
import { ReactComponent as ApplicationIcon } from "../../assets/topbar/apps.svg";
import { ReactComponent as WorkflowsIcon } from "../../assets/topbar/workflows.svg";
import { ReactComponent as ArrowDown } from "../../assets/icons/arrow-down.svg";
import { BsFillCheckCircleFill } from "react-icons/bs";

import logo from "../../assets/logo.svg";
import arrowdown from "../../assets/icons/arrow-down.svg";
import avatar from "../../assets/avatar/avatar-2.png";

export default function CreateAction() {
  const [is_listSetOpen, setIs_listSetOpen] = useState(false);

  const [optionListSet, setOptionListSet] = useState([
    { key: 1, value: "Deploy Docker Workflow" },
    { key: 1, value: "Deploy Docker Workflow A" },
    { key: 1, value: "Deploy Docker Workflow B" },
    { key: 1, value: "Deploy Docker Workflow C" },
  ]);
  const [selectedOptionSet, setSelectedOtionSet] = useState(optionListSet[0]);

  //Top bar end

  const [is_listbOpen, setIs_listbOpenb] = useState(false);

  const [optionListb, setOptionListb] = useState([
    { key: 2, value: "Python" },
    { key: 3, value: "Nodejs" },
    { key: 4, value: "PHP" },
  ]);
  const [selectedOptionb, setSelectedOtionb] = useState("Language");

  //Runtime end

  const [is_listversionOpen, setIs_listversionOpen] = useState(false);

  const [optionlistversion, setOptionlistversion] = useState([
    { key: 2, value: "10.01" },
    { key: 3, value: "11.20" },
    { key: 4, value: "13.03" },
  ]);
  const [selectedoptionlistversion, setSelectedoptionlistversion] =
    useState("Version");

  //Version end

  return (
    <div className="bg-black h-screen noselect">
      <div className="container mx-auto">
        <div className="flex justify-between items-center pt-[43px]">
          <div className="text-white">
            <img src={logo} className="h-[34px] w-[147px]" alt="" />
          </div>
          <div className="flex grow lg:justify-end lg:pr-[187px] text-white space-x-[82px]">
            <div className="flex flex-col cursor-pointer">
              <div className="flex space-x-2">
                <DashboardIcon fill="white" height="11x" width="9px" />
                <div className="text-[11px] font-bold font-IBM-Plex-Sans">
                  DASHBOARD
                </div>
              </div>
              <div className="border-b-2 border-white mt-[7px] opacity-0" />
            </div>
            <div className="flex flex-col cursor-pointer">
              <div className="flex space-x-2">
                <ActionIcon fill="white" height="11x" width="5px" />
                <div className="text-[11px] font-bold font-IBM-Plex-Sans">
                  ACTIONS
                </div>
              </div>
              <div className="border-b-2 border-white mt-[7px]" />
            </div>

            <div className="flex flex-col cursor-pointer">
              <div className="flex space-x-2">
                <ApiIcon fill="white" height="11x" width="11px" />
                <div className="text-[11px] font-bold font-IBM-Plex-Sans">
                  APIS
                </div>
              </div>
              <div className="border-b-2 border-white mt-[7px] opacity-0" />
            </div>
            <div className="flex flex-col cursor-pointer">
              <div className="flex space-x-2">
                <ApplicationIcon fill="white" height="9x" width="9px" />
                <div className="text-[11px] font-bold font-IBM-Plex-Sans">
                  APPLICATIONS
                </div>
              </div>
              <div className="border-b-2 border-white mt-[7px] opacity-0" />
            </div>

            <div className="flex flex-col cursor-pointer">
              <div className="flex space-x-2">
                <WorkflowsIcon fill="white" height="10x" width="10px" />
                <div className="text-[11px] font-bold font-IBM-Plex-Sans">
                  WORKFLOWS
                </div>
              </div>
              <div className="border-b-2 border-white mt-[7px] opacity-0" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-4 relative">
              <img
                src={avatar}
                className="h-[38px] w-[38px] rounded-full"
                alt=""
              />
              <div
                onClick={() => setIs_listSetOpen(!is_listSetOpen)}
                className="flex space-x-2 cursor-pointer"
              >
                <div className="text-white font-IBM-Plex-Sans font-semibold text-[16px]">
                  Hamza
                </div>
                <img src={arrowdown} alt="" />
              </div>

              {is_listSetOpen && (
                <div className="absolute z-20 w-[180px] top-16 right-0 py-4 flex flex-col space-y-2 bg-[#1A1A1A] rounded-lg cursor-pointer">
                  <div className="text-white text-md font-Inter hover:bg-cock-dark-400 p-2 px-4">
                    Hello
                  </div>
                  <div className="text-white text-md font-Inter hover:bg-cock-dark-400 p-2 px-4">
                    Hello
                  </div>
                  <div className="text-white text-md font-Inter hover:bg-cock-dark-400 p-2 px-4">
                    Hello
                  </div>
                  <div className="text-white text-md font-Inter hover:bg-cock-dark-400 p-2 px-4">
                    Hello
                  </div>
                  <div className="text-white text-md font-Inter hover:bg-cock-dark-400 p-2 px-4">
                    Hello
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex mt-[185px] justify-center">
        <div className="lg:w-[993px] h-20">
          <div className="font-light font-IBM-Plex-Sans text-[36px] text-white">
            Create an Action
          </div>
          <div className="border-b-2 mt-[18px] mb-[39px] border-[#2B2B2B] w-full" />
          <div className="flex flex-col space-y-[30px] pr-[46px]">
            <div className="flex justify-between">
              <div className="space-y-[10px]">
                <div className="text-white font-IBM-Plex-Sans font-bold text-[11px]">
                  TITLE
                </div>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    className="w-[460px] h-[46px] bg-[#1A1A1A] rounded-[14px] text-[15px] font-Inter font-medium pl-[20px] pr-[40px] text-white"
                    placeholder="Action name.."
                  />
                  <div className="bg-[#323232] w-[12px] h-[12px] rounded-full absolute  right-[16px]" />
                </div>
              </div>

              <div className="flex justify-between">
                <div className="space-y-[10px]">
                  <div className="text-white font-IBM-Plex-Sans font-bold text-[11px]">
                    description
                  </div>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      className="w-[460px] h-[46px] bg-[#1A1A1A] rounded-[14px] text-[15px] font-Inter font-medium px-[20px] text-white"
                      placeholder="Description.."
                    />
                    <div className="bg-[#323232] w-[12px] h-[12px] rounded-full absolute  right-[16px]" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="space-y-[10px]">
                <div className="text-white font-IBM-Plex-Sans font-bold text-[11px]">
                  RUNTIME
                </div>

                <div
                  onClick={() => setIs_listbOpenb(!is_listbOpen)}
                  className="mt-[28px]  rounded-[11px] h-[46px] bg-[#1A1A1A] flex justify-between items-center w-[460px] px-[19px] cursor-pointer relative"
                >
                  <div
                    className={
                      selectedOptionb !== "Language"
                        ? "font-Inter font-medium text-[15px] text-white"
                        : "font-Inter font-medium text-[15px] text-[#444444]"
                    }
                  >
                    {selectedOptionb}
                  </div>
                  <ArrowDown height="8px" width="13px" fill="white" />
                  {is_listbOpen && (
                    <div className="flex flex-col space-y-2  bg-[#1A1A1A]  w-[460px]  rounded-lg  cursor-pointer absolute top-12 py-4 right-0">
                      {optionListb.map((element) => (
                        <div
                          onClick={() => {
                            setSelectedOtionb(element.value);
                            setIs_listbOpenb(!is_listbOpen);
                          }}
                          className={
                            element.value === selectedOptionb
                              ? "flex items-center justify-between text-white text-md font-Inter bg-[#7900FF]   py-2 px-4"
                              : "flex items-center justify-between text-white text-md font-Inter hover:bg-[#7900FF] py-2 px-4"
                          }
                        >
                          <div>{element.value}</div>
                          {element.value === selectedOptionb ? (
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
              <div className="space-y-[10px]">
                <div className="text-white font-IBM-Plex-Sans font-bold text-[11px]">
                  VERSION
                </div>

                <div
                  onClick={() => setIs_listversionOpen(!is_listversionOpen)}
                  className="mt-[28px]  rounded-[11px] h-[46px] bg-[#1A1A1A] flex justify-between items-center w-[460px] px-[19px] cursor-pointer relative"
                >
                  <div
                    className={
                      selectedoptionlistversion !== "Version"
                        ? "font-Inter font-medium text-[15px] text-white"
                        : "font-Inter font-medium text-[15px] text-[#444444]"
                    }
                  >
                    {selectedoptionlistversion}
                  </div>
                  <ArrowDown height="8px" width="13px" fill="white" />
                  {is_listversionOpen && (
                    <div className="flex flex-col space-y-2 bg-[#1A1A1A] w-[460px]  rounded-lg  cursor-pointer absolute top-12 py-4 right-0">
                      {optionlistversion.map((element) => (
                        <div
                          onClick={() => {
                            setSelectedoptionlistversion(element.value);
                            setIs_listversionOpen(!is_listversionOpen);
                          }}
                          className={
                            element.value === selectedoptionlistversion
                              ? "flex items-center justify-between text-white text-md font-Inter bg-[#7900FF]    py-2 px-4"
                              : "flex items-center justify-between text-white text-md font-Inter hover:bg-[#7900FF]  py-2 px-4"
                          }
                        >
                          <div>{element.value}</div>
                          {element.value === selectedoptionlistversion ? (
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
            </div>
            <div className="justify-end flex space-x-[6px] pt-[30px]">
              <div className="text-white font-IBM-Plex-Sans text-[10px] font-bold bg-[#545454] w-[92px] h-[35px] rounded-[9px] flex items-center justify-center cursor-pointer hover:bg-gray-400">
                CANCEL
              </div>
              <div className="text-white font-IBM-Plex-Sans text-[10px] font-bold bg-[#7900FF] w-[92px] h-[35px] rounded-[9px] flex items-center justify-center cursor-pointer hover:bg-purple-600">
                CREATE
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
