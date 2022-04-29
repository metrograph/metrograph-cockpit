import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/python";
import { ReactComponent as ActionIcon } from "../../assets/topbar/action.svg";
import { ReactComponent as DashboardIcon } from "../../assets/topbar/dashboard.svg";
import { ReactComponent as ApiIcon } from "../../assets/topbar/api.svg";
import { ReactComponent as ApplicationIcon } from "../../assets/topbar/apps.svg";
import { ReactComponent as WorkflowsIcon } from "../../assets/topbar/workflows.svg";
import { ReactComponent as ArrowDown } from "../../assets/icons/arrow-down.svg";
import { BsFillCheckCircleFill } from "react-icons/bs";
import pythonIcon from "../../assets/python.svg";
import useMouse from "@react-hook/mouse-position";

import i_icon from "../../assets/icons/i.svg";

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
  const [selectedOptionb, setSelectedOtionb] = useState("Python");

  //Runtime end

  const [is_listversionOpen, setIs_listversionOpen] = useState(false);

  const [optionlistversion, setOptionlistversion] = useState([
    { key: 2, value: "10.01" },
    { key: 3, value: "11.20" },
    { key: 4, value: "13.03" },
  ]);
  const [selectedoptionlistversion, setSelectedoptionlistversion] =
    useState("3.9.10");

  //Version end

  const [title, setTitle] = useState("Send Joke to Discord");
  const [description, setDescription] = useState(
    "A task to send a random joke to Discord"
  );

  const [urlCheckBox, setUrlCheckBox] = useState(true);
  let dt = { username: "ehamza", password: "123" };
  const [eventIDE, setEventIDE] = useState(JSON.stringify(dt, null, "\t"));
  const [outputIDE, setOutputIDE] = useState("");
  const [responseIDE, setResponseIDE] = useState("");
  const [panelMenu, setPanelMenu] = useState(false);
  const [mouseRadar, setMouseRadar] = useState({ x: "0", y: "0" });
  function handleClick(e) {
    if (e.type === "click") {
      setPanelMenu(false);
    } else if (e.type === "contextmenu") {
      console.log(e.clientX, e.clientY);
      setMouseRadar({ x: mouse.x, y: mouse.x });

      setPanelMenu(!panelMenu);
    }
  }
  const ref = React.useRef(null);
  const mouse = useMouse(ref, {
    enterDelay: 100,
    leaveDelay: 100,
  });
  useEffect(() => {}, []);

  return (
    <div className="bg-black min-h-screen noselect flex justify-center pb-24 px-12">
      <div className="max-w-[1662px] w-full">
        {/* Top bar start */}
        <div className="">
          <div className="flex justify-between items-center pt-[43px]">
            <div className="text-white w-[147px]">
              <img src={logo} className="h-[34px] w-[147px]" alt="" />
            </div>
            <div className="flex lg:grow lg:justify-end lg:pr-[187px] text-white space-x-[82px]">
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
        {/* Top bar end */}

        {/* Action section start */}
        <div className="max-w-[1614px] container flex  mt-[185px]">
          <div className="w-full">
            <div className="flex justify-between">
              <div className="font-light font-IBM-Plex-Sans text-[36px] text-white">
                Send Joke to Discord v2
              </div>
              <div className="justify-end flex space-x-[6px] pt-[30px]">
                <div className="text-white font-IBM-Plex-Sans text-[10px] font-bold bg-[#545454] w-[92px] h-[35px] rounded-[9px] flex items-center justify-center cursor-pointer hover:bg-gray-400">
                  CANCEL
                </div>
                <div className="text-white font-IBM-Plex-Sans text-[10px] font-bold bg-[#7900FF] w-[92px] h-[35px] rounded-[9px] flex items-center justify-center cursor-pointer hover:bg-purple-600">
                  SAVE
                </div>
              </div>
            </div>
            <div className="border-b-2 mt-[18px] mb-[39px] border-[#2B2B2B] w-full" />
            <div className="flex flex-col  space-y-[30px]">
              <div className="flex space-x-[33px]">
                <div className="space-y-[10px] w-1/4">
                  <div className="text-white font-IBM-Plex-Sans font-bold text-[11px]">
                    TITLE
                  </div>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      className="w-full h-[46px] bg-[#1A1A1A] rounded-[14px] text-[15px] font-Inter font-medium pl-[20px] pr-[40px] text-white"
                      placeholder="Action name.."
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                    />
                    <div className="bg-[#7ECA9C] w-[12px] h-[12px] rounded-full absolute  right-[16px]" />
                  </div>
                </div>

                <div className="space-y-[10px] w-1/4">
                  <div className="text-white font-IBM-Plex-Sans font-bold text-[11px]">
                    DESCRIPTION
                  </div>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      className="w-full h-[46px] bg-[#1A1A1A] rounded-[14px] text-[15px] font-Inter font-medium px-[20px] text-white"
                      placeholder="Description.."
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    />
                    <div className="bg-[#7ECA9C] w-[12px] h-[12px] rounded-full absolute  right-[16px]" />
                  </div>
                </div>

                <div className="space-y-[10px] w-1/4">
                  <div className="text-white font-IBM-Plex-Sans font-bold text-[11px]">
                    RUNTIME
                  </div>

                  <div
                    onClick={() => setIs_listbOpenb(!is_listbOpen)}
                    className="w-full mt-[28px]  rounded-[11px] h-[46px] bg-[#1A1A1A] flex justify-between items-center px-[19px] cursor-pointer relative"
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
                      <div className="flex flex-col space-y-2  bg-[#1A1A1A]  w-full  rounded-lg  cursor-pointer absolute top-12 py-4 right-0">
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
                <div className="space-y-[10px] w-1/4">
                  <div className="text-white font-IBM-Plex-Sans font-bold text-[11px]">
                    VERSION
                  </div>

                  <div
                    onClick={() => setIs_listversionOpen(!is_listversionOpen)}
                    className="w-full mt-[28px]  rounded-[11px] h-[46px] bg-[#1A1A1A] flex justify-between items-center  px-[19px] cursor-pointer relative"
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
                      <div className="flex flex-col space-y-2 bg-[#1A1A1A]   rounded-lg w-full  cursor-pointer absolute top-12 py-4 right-0">
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
            </div>
          </div>
        </div>
        {/*URL Section*/}
        <div className="flex space-x-[40px]  mt-[40px] items-center">
          <div className="flex space-x-2 w-[165px] justify-between items-center">
            <div
              onClick={() => setUrlCheckBox(!urlCheckBox)}
              className={
                urlCheckBox
                  ? "w-[16px] h-[16px] rounded-[5px] bg-[#7900FF] border-2 border-[#272727] cursor-pointer"
                  : "w-[16px] h-[16px] rounded-[5px] border-2 border-[#272727] cursor-pointer"
              }
            />

            <div className="text-white font-IBM-Plex-Sans font-bold text-[12px]">
              ENABLE ACTION URL
            </div>
            <img src={i_icon} alt="11px" width="11px" />
          </div>
          <div className="flex items-center space-x-[10px]">
            <div className="bg-[#7ECA9C] h-[17px] w-[39px] grid place-content-center">
              <div className=" text-[10px] font-IBM-Plex-Sans font-bold text-white">
                LIVE
              </div>
            </div>
            <div className="text-[#AC62FF] font-IBM-Plex-Sans font-medium text-[14px] cursor-pointer">
              http://metrpgraph.coolcompany.io/task/hf34j1lrhl1hflk14tkgh/run
            </div>
          </div>
        </div>

        {/*SCHEDULE TASK Section*/}
        <div className="mt-[44px]">
          <div className="text-white font-bold font-IBM-Plex-Sans text-[11px]">
            SCHEDULE TASK
          </div>
          <div className="flex mt-[10px]">
            <div className="w-[146px] h-[42px] bg-[#2B2B2B] grid place-content-center rounded-[9px] hover:bg-gray-400 cursor-pointer mr-[88px]">
              <div className="text-white font-IBM-Plex-Sans font-bold text-[12px]">
                ADD SCHEDULE
              </div>
            </div>
            <div className="w-[272px] h-[42px] border-2 border-[#3F3F3F] rounded-[15px] flex justify-evenly px-2 items-center">
              <div className="text-[12px] font-IBM-Plex-Sans font-bold text-white">
                EVERY
              </div>
              <div className="w-[67px] h-[22px] bg-[#7ECA9C] grid place-content-center rounded-[11px]">
                <div className="text-[10px] font-IBM-Plex-Sans font-bold text-white">
                  MONDAY
                </div>
              </div>
              <div className="text-[12px] font-IBM-Plex-Sans font-bold text-white">
                AT
              </div>
              <div className="w-[53px] h-[22px] bg-[#7ECA9C] grid place-content-center rounded-[11px]">
                <div className="text-[10px] font-IBM-Plex-Sans font-bold text-white">
                  08:00
                </div>
              </div>
            </div>

            <div className="ml-[41px] w-[272px] h-[42px] border-2 border-[#3F3F3F] rounded-[15px] flex justify-evenly px-2 items-center">
              <div className="text-[12px] font-IBM-Plex-Sans font-bold text-white">
                EVERY
              </div>
              <div className="w-[67px] h-[22px] bg-[#7ECA9C] grid place-content-center rounded-[11px]">
                <div className="text-[10px] font-IBM-Plex-Sans font-bold text-white">
                  HOUR
                </div>
              </div>
              <div className="text-[10px] font-IBM-Plex-Sans font-bold text-white">
                AT
              </div>
              <div className="w-[63px] h-[22px] bg-[#7ECA9C] grid place-content-center rounded-[11px]">
                <div className="text-[10px] font-IBM-Plex-Sans font-bold text-white">
                  30:00
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-12 bg-black">
          <div className=" font-IBM-Plex-Sans font-bold text-[11px] mb-[10px] text-white">
            ACTION CODE
          </div>
          <div className="flex h-[427px] bg-[#202020]">
            {/*Lef panel section*/}
            <div
              onContextMenu={(e) => e.preventDefault()}
              className="bg-[#202020] w-1/5 relative"
              ref={ref}
            >
              <div
                onClick={handleClick}
                onContextMenu={handleClick}
                className="cursor-pointer h-full"
              >
                <div className="mt-[30px] flex items-center ml-[42px] space-x-[7px] ">
                  <ArrowDown />
                  <div className="text-[11px] text-white font-IBM-Plex-Sans font-bold ">
                    FILES X{mouseRadar.x} Y{mouseRadar.y}
                  </div>
                </div>
                <div className="flex items-center space-x-[9px] ml-[49px] mt-[15px] cursor-pointer">
                  <img src={pythonIcon} className="w-[13px] h-[13px]" alt="" />
                  <div className="text-white font-IBM-Plex-Sans text-[12px] font-medium">
                    main.py
                  </div>
                </div>
              </div>
              {panelMenu && (
                <div
                  className="bg-[#191919] w-[187px] h-[89px] rounded-[9px] flex flex-col justify-center  border-1 border-[#292929] space-y-[1px]"
                  style={{ position: "absolute", top: mouse.y, left: mouse.x }}
                >
                  <div className="text-white font-IBM-Plex-Sans font-bold text-[9px] hover:bg-[#292929] pl-[13px] cursor-pointer">
                    CREATE FOLDER
                  </div>
                  <div className="text-white font-IBM-Plex-Sans font-bold text-[9px] hover:bg-[#292929] pl-[13px] cursor-pointer">
                    CREATE FILE
                  </div>
                  <div className="text-white font-IBM-Plex-Sans font-bold text-[9px] hover:bg-[#292929] pl-[13px] cursor-pointer">
                    UPLOAD FILE
                  </div>
                  <div className="text-white font-IBM-Plex-Sans font-bold text-[9px] hover:bg-[#292929] pl-[13px] cursor-pointer">
                    RENAME
                  </div>
                  <div className="text-white font-IBM-Plex-Sans font-bold text-[9px] hover:bg-[#292929] pl-[13px] cursor-pointer">
                    DELETE
                  </div>
                </div>
              )}
            </div>
            {/*Lef panel section end*/}
            <div className="w-4/5">
              <div className="bg-[#202020] w-[171px] h-[53px] flex items-center justify-center space-x-[9px] border-b-4 border-[#7900FF]">
                <img src={pythonIcon} className="w-[14px] h-[14px]" alt="" />
                <div className="text-white font-IBM-Plex-Sans text-[14px] font-medium">
                  main.py
                </div>
              </div>
              <div>
                <AceEditor
                  showPrintMargin={false}
                  height="374px"
                  fontSize="17px"
                  width="100%"
                  mode="python"
                  theme="tomorrow_night"
                  onChange={(value) => console.log(value)}
                  name="ace_firts"
                  editorProps={{ $blockScrolling: true }}
                  setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                  }}
                />
              </div>
            </div>
          </div>
          <div className="border-b-[3px] border-[#343434] w-full" />
          <div className="bg-[#202020] h-[246px] flex w-full">
            <div className="w-1/5 border-r-[3px] border-[#343434] px-[19px]">
              <div className="mt-[19px]  flex space-x-[11px]">
                <div className=" font-IBM-Plex-Sans font-bold text-white text-[11px]">
                  EVENT
                </div>
                <img src={i_icon} alt="" />
              </div>
              <div className="bg-[#1A1A1A] h-[128px] w-full rounded-[13px] mt-[12px] text-white text-[10px] relative">
                <AceEditor
                  style={{ borderRadius: "13px" }}
                  showPrintMargin={false}
                  height="100%"
                  fontSize="14px"
                  width="100%"
                  mode="json"
                  theme="twilight"
                  onChange={(value) => setEventIDE(value)}
                  value={eventIDE}
                  name="ace_firts"
                  showGutter={false}
                  editorProps={{ $blockScrolling: true }}
                  setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: false,
                  }}
                />
              </div>
              <div className="mt-[15px] grid place-content-end">
                <div className="bg-[#7900FF] w-[92px] h-[35px] grid place-content-center rounded-[9px]">
                  <div className="text-white font-IBM-Plex-Sans font-bold text-[10px]">
                    Run
                  </div>
                </div>
              </div>
            </div>
            <div className="w-2/5 border-r-[3px] border-[#343434] px-[19px]">
              <div className="mt-[19px]  flex space-x-[11px]">
                <div className=" font-IBM-Plex-Sans font-bold text-white text-[11px]">
                  OUTPUT
                </div>
                <img src={i_icon} alt="" />
              </div>
              <div className="bg-[#1A1A1A] h-[178px] w-full rounded-[13px] mt-[12px] text-white text-[10px] relative">
                <AceEditor
                  style={{ borderRadius: "13px" }}
                  showPrintMargin={false}
                  height="100%"
                  fontSize="14px"
                  width="100%"
                  mode="json"
                  theme="twilight"
                  onChange={(value) => setOutputIDE(value)}
                  value={outputIDE}
                  name="ace_firts"
                  showGutter={false}
                  editorProps={{ $blockScrolling: true }}
                  setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: false,
                  }}
                />
              </div>
            </div>

            <div className="w-2/5 px-[19px]">
              <div className="mt-[19px]  flex space-x-[11px]">
                <div className=" font-IBM-Plex-Sans font-bold text-white text-[11px]">
                  RESPONSE
                </div>
                <img src={i_icon} alt="" />
              </div>
              <div className="bg-[#1A1A1A] h-[178px] w-full rounded-[13px] mt-[12px] text-white text-[10px] relative">
                <AceEditor
                  style={{ borderRadius: "13px" }}
                  showPrintMargin={false}
                  height="100%"
                  fontSize="14px"
                  width="100%"
                  mode="json"
                  theme="twilight"
                  onChange={(value) => setResponseIDE(value)}
                  value={responseIDE}
                  name="ace_firts"
                  showGutter={false}
                  editorProps={{ $blockScrolling: true }}
                  setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: false,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
