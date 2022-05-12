import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/python";
import pythonIcon from "../../assets/python.svg";
import folderIcon from "../../assets/icons/folder.svg";
import useMouse from "@react-hook/mouse-position";
import File from "./File";
import Folder from "./Folder";
import ActionCodeBuilder from "./ActionCodeBuilder";

import i_icon from "../../assets/icons/i.svg";
import { ReactComponent as ArrowDown } from "../../assets/icons/arrow-down.svg";

function CFileTree(props) {
  if (props.file_explorer_state.children) {
    let children = props.file_explorer_state.children;
    if (children.length) {
      return children.map((element) => {
        if (element instanceof Folder) {
          return (
            <div
              className=""
              onClick={(e) => {
                e.stopPropagation();
                console.log("CFileTree");
              }}
            >
              <CFolder
                folder={element}
                children={element.children}
                showChildreen={false}
                refState={props.refState}
                is_input={false}
              />
            </div>
          );
        } else if (element instanceof File) {
          return (
            <CFile file={element} is_input={false} refState={props.refState} />
          );
        }
      });
    }
  } else return <div></div>;
}
function CFile(props) {
  const dispatch = useDispatch();
  const mystate = useSelector((state) => state);
  const [inputValue, setInputValue] = useState(props.file.name);
  const [is_input, setIs_input] = useState(props.is_input);
  const [panelMenu, setPanelMenu] = useState(false);
  const [mouseRadar, setMouseRadar] = useState({ x: "0", y: "0" });

  const mouse = useMouse(props.refState, {
    enterDelay: 100,
    leaveDelay: 100,
  });
  function handleClick(e) {
    if (e.type === "click") {
    setPanelMenu(false);
    } else if (e.type === "contextmenu") {
      console.log("Left Click @ file");

      setMouseRadar({ x: mouse.x, y: mouse.y });

      setPanelMenu(true);
    }
  }
  function handlKeyDown(e) {
    if (e.keyCode === 13) {
      setIs_input(false);
      ActionCodeBuilder.rename(mystate.file_explorer, props.file.uid,inputValue);
      dispatch({type:"setFileExplorer",payload:mystate.file_explorer})
    } else if (e.keyCode === 27) {
      setInputValue(props.file.name);
      setIs_input(false);
    }
  }
  function handleDelete(){
    ActionCodeBuilder.delete(mystate.file_explorer, props.file.uid);
    dispatch({type:"setFileExplorer",payload:mystate.file_explorer})
    setPanelMenu(false)
    
  }
  if (is_input) {
    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          setInputValue(props.file.name);
          setIs_input(false);
        }}
        onKeyDown={(e) => {
          handlKeyDown(e);
        }}
        className="cursor-pointer hover:bg-[#292828]"
      >
        <div className="flex items-center space-x-[9px] h-[28px] ">
          <img src={props.file.icon} className="w-[13px] h-[13px]" alt="" />
          <input
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="text-white font-IBM-Plex-Sans w-full text-[12px] h-full font-medium border-2 bg-[#292828] border-[#7900FF] outline-none"
            autoFocus={true}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
      </div>
    );
  } else if (!is_input) {
    return (
      <div className="">
        <div
          onContextMenu={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleClick(e);
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleClick(e);
          }}
          className="cursor-pointer hover:bg-[#292828]"
        >
          <div className="flex items-center space-x-[9px] h-[28px] ">
            <img src={props.file.icon} className="w-[13px] h-[13px]" alt="" />
            <div className="text-white font-IBM-Plex-Sans text-[12px] font-medium">
              {inputValue}
            </div>
          </div>
        </div>
        {panelMenu && (
          <div
            className="bg-[#191919] w-[187px] py-1 rounded-[9px] flex flex-col justify-center  border-1 border-[#292929]"
            style={{
              position: "absolute",
              top: mouseRadar.y,
              left: mouseRadar.x,
              zIndex: 6,
            }}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
                setIs_input(true);
                setPanelMenu(false);
              }}
              className="text-white font-IBM-Plex-Sans py-1 font-bold text-[9px] hover:bg-[#292929] pl-[13px] cursor-pointer"
            >
              RENAME
            </div>
            <div 
            onClick={()=>handleDelete()}
            className="text-white font-IBM-Plex-Sans  py-1 font-bold text-[9px] hover:bg-[#292929] pl-[13px] cursor-pointer">
              DELETE
            </div>
          </div>
        )}
      </div>
    );
  }
}
function CFolder(props) {
  const dispatch = useDispatch();
  const mystate = useSelector((state) => state);
  const [inputValue, setInputValue] = useState(props.folder.name);
  const [showChildreen, setShowChildreen] = useState(false);
  const [is_input, setIs_input] = useState(props.is_input);
  const [panelMenu, setPanelMenu] = useState(false);
  const [mouseRadar, setMouseRadar] = useState({ x: "0", y: "0" });

  const mouse = useMouse(props.refState, {
    enterDelay: 100,
    leaveDelay: 100,
  });
  function handleClick(e) {
    if (e.type === "click") {
      console.log("Right Click @ file");
      setPanelMenu(false);
    } else if (e.type === "contextmenu") {
      console.log("Left Click @ file");

      setMouseRadar({ x: mouse.x, y: mouse.y });

      setPanelMenu(true);
    }
  }
  function handlKeyDown(e) {
    if (e.keyCode === 13) {
      setIs_input(false);
      ActionCodeBuilder.rename(mystate.file_explorer, props.folder.uid,inputValue);
      dispatch({type:"setFileExplorer",payload:mystate.file_explorer})
    } else if (e.keyCode === 27) {
      setInputValue(props.folder.name);
      setIs_input(false);
    }
  }
  function handleDelete(){
    ActionCodeBuilder.delete(mystate.file_explorer, props.folder.uid);
    dispatch({type:"setFileExplorer",payload:mystate.file_explorer})
    setPanelMenu(false)
    
  }

 
  return (
    <div className="">
      {is_input && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setInputValue(props.folder.name);
            setIs_input(false);
          }}
          onKeyDown={(e) => {
            handlKeyDown(e);
          }}
          className="cursor-pointer hover:bg-[#292828]"
        >
          <div className="flex items-center space-x-[9px] h-[28px] ">
            <img
              src={props.folder.icon}
              className="w-[13px] h-[13px] z-10"
              alt=""
            />
            <input
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="text-white font-IBM-Plex-Sans w-full text-[12px] h-full font-medium border-2 bg-[#292828] border-[#7900FF] outline-none"
              autoFocus={true}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
        </div>
      )}
      {!is_input && (
        <div>
          <div
            onContextMenu={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleClick(e);
            }}
            onClick={(e) => {
              e.stopPropagation();
              setShowChildreen(!showChildreen);
              handleClick(e);
            }}
            className="flex items-center space-x-[9px] h-[28px] cursor-pointer hover:bg-[#292828]"
          >
            <img
              src={props.folder.icon}
              className="w-[13px] h-[13px] z-10"
              alt=""
            />
            <div className="text-white font-IBM-Plex-Sans text-[12px] font-medium z-10">
              {inputValue}
            </div>
          </div>
          {panelMenu && (
            <div
              className="bg-[#191919] w-[187px] py-1 rounded-[9px] flex flex-col justify-center  border-1 border-[#292929]"
              style={{
                position: "absolute",
                top: mouseRadar.y,
                left: mouseRadar.x,
                zIndex: 6,
              }}
            >
              <div className="text-white font-IBM-Plex-Sans  py-1 font-bold text-[9px] hover:bg-[#292929] pl-[13px] cursor-pointer">
                CREATE FOLDER
              </div>
              <div className="text-white font-IBM-Plex-Sans  py-1 font-bold text-[9px] hover:bg-[#292929] pl-[13px] cursor-pointer">
                CREATE FILE
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setIs_input(true);
                  setPanelMenu(false);
                }}
                className="text-white font-IBM-Plex-Sans py-1 font-bold text-[9px] hover:bg-[#292929] pl-[13px] cursor-pointer"
              >
                RENAME
              </div>
              <div
              onClick={()=>handleDelete()}
              className="text-white font-IBM-Plex-Sans  py-1 b font-bold text-[9px] hover:bg-[#292929] pl-[13px] cursor-pointer">
                DELETE
              </div>
            </div>
          )}
        </div>
      )}
      {showChildreen &&
        props.children.map((element) => {
          if (element instanceof Folder) {
            return (
              <div className="">
                <div className="ml-6">
                  <CFolder
                    folder={element}
                    children={element.children}
                    refState={props.refState}
                  />
                </div>
              </div>
            );
          } else if (element instanceof File) {
            return (
              <div className="">
                <div className="ml-6">
                  <CFile
                    file={element}
                    is_input={false}
                    refState={props.refState}
                  />
                </div>
              </div>
            );
          }
        })}
    </div>
  );
}

export default function CodeEditor() {
  const dispatch = useDispatch();
  const mystate = useSelector((state) => state);
  const [data, setData] = useState(mystate.file_explorer);
  const [panelMenu, setPanelMenu] = useState(false);
  let dt = { username: "ehamza", password: "123" };
  const [eventIDE, setEventIDE] = useState(JSON.stringify(dt, null, "\t"));
  const [outputIDE, setOutputIDE] = useState("");
  const [responseIDE, setResponseIDE] = useState("");

  const [mouseRadar, setMouseRadar] = useState({ x: "0", y: "0" });
  const ref = React.useRef(null);

  const mouse = useMouse(ref, {
    enterDelay: 100,
    leaveDelay: 100,
  });

  function add_toExplorer() {
    console.log("File added");
    setData([
      ...data,
      {
        type: "file",
        icon: pythonIcon,
        name: "NEW",
        path: "/.gitignore",
      },
    ]);
  }
  function handleClick(e) {
    if (e.type === "click") {
      console.log("Right Click");
      setPanelMenu(false);
    } else if (e.type === "contextmenu") {
      console.log("Left Click");

      setMouseRadar({ x: mouse.x, y: mouse.y });

      setPanelMenu(!panelMenu);
    }
  }

  useEffect(() => {
    let data = {
      uid: "0",
      type: "folder",
      name: "root",
      icon: null,
      path: "",
      children: [
        {
          uid: "1",
          type: "folder",
          name: "cockpit",
          icon: folderIcon,
          path: "/cockpit",
          children: [
            {
              uid: "2",
              type: "folder",
              name: "src",
              icon: folderIcon,
              path: "/cockpit/src",
              children: [
                {
                  uid: "3",
                  type: "folder",
                  icon: folderIcon,
                  name: "screens",
                  path: "/cockpit/src/screens",
                  children: [
                    {
                      uid: "4",
                      type: "file",
                      icon: pythonIcon,
                      name: "App.js",
                      path: "/cockpit/src/screens/App.js",
                    },
                    {
                      uid: "5",
                      type: "file",
                      icon: pythonIcon,
                      name: "index.css",
                      path: "/cockpit/src/screens/index.css",
                    },
                  ],
                },
              ],
            },
            {
              uid: "6",
              type: "file",
              icon: pythonIcon,
              name: "index.css",
              path: "/cockpit/index.css",
            },
          ],
        },
        {
          uid: "7",
          type: "file",
          icon: pythonIcon,
          name: ".gitignore",
          path: "/.gitignore",
        },
      ],
    };
    let mydata = ActionCodeBuilder.build(data);

    if (!mystate.file_explorer.children) {
      dispatch({
        type: "setFileExplorer",
        payload: ActionCodeBuilder.build(data),
      });
    }
  }, [mystate.file_explorer.children]);

  return (
    <div className="flex flex-col bg-black">
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
            className="h-full"
          >
            <div className="mt-[30px] flex items-center ml-[42px] space-x-[18px] ">
              <div className="flex items-center space-x-[7px] cursor-pointer">
                <ArrowDown />
                <div className="text-[11px] text-white font-IBM-Plex-Sans font-bold ">
                  FILES
                </div>
              </div>
              <div className="flex space-x-[6px] items-center">
                <div
                  title="Upload File"
                  className="bg-[#7900FF] h-[18px] w-[26px] rounded-[6px] grid place-content-center cursor-pointer"
                >
                  <div className="text-[14px] font-bold font-IBM-Plex-Sans text-white">
                    +
                  </div>
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    add_toExplorer();
                  }}
                  title="Create New File"
                  className="bg-[#7ECA9C] hover:bg-black h-[18px] w-[26px] rounded-[6px] grid place-content-center cursor-pointer"
                >
                  <div className="text-[14px] font-bold font-IBM-Plex-Sans text-white">
                    +
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-[48px] mt-[15px] ">
              <CFileTree
                refState={ref}
                file_explorer_state={mystate.file_explorer}
                onClick={onclick}
                handleClick={() => handleClick}
              />
            </div>
          </div>
          {panelMenu && (
            <div
              className="bg-[#191919] w-[187px] h-[89px] rounded-[9px] flex flex-col justify-center  border-1 border-[#292929] space-y-[1px]"
              style={{
                position: "absolute",
                top: mouseRadar.y,
                left: mouseRadar.x,
                zIndex: 6,
              }}
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
  );
}
