import React, { useEffect, useState } from "react";
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { getIconForFile, getIconForFolder, getIconForOpenFolder } from 'vscode-icons-js';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/python";
import closeIcon from "../../assets/icons/close.svg"
import pythonIcon from "../../assets/python.svg";
import folderIcon from "../../assets/icons/folder.svg";
import useMouse from "@react-hook/mouse-position";
import File from "./File";
import Folder from "./Folder";
import ActionCodeBuilder from "./ActionCodeBuilder";
import i_icon from "../../assets/icons/i.svg";
import { ReactComponent as ArrowDown } from "../../assets/icons/arrow-down.svg";

let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiZWhhbXphIn0sInRpbWUiOiIxNjUzNjY0MjY3LjA1ODAzMSJ9.0cXDjsGeWZ4PEIeiqagcF8B1VsmdMdat3-GZPKId5To"
let hostname="http://195.201.146.87:80/v1"

function CFileTree(props) {
	if (props.file_explorer_state.children) {
		if (props.file_explorer_state.children) {
			return props.file_explorer_state.children.map((element) => {
				if (element instanceof Folder) return <CFolder key={element.path} folder={element} children={element.children} showChildreen={false} refState={props.refState} is_input={false}/>
				else return <CFile key={element.path} file={element} is_input={false} refState={props.refState} />
			});
		} else return <div></div>
	} else return <div></div>;
}

function CFile(props) {
	const dispatch = useDispatch();
	const mystate = useSelector((state) => state);
	const [inputValue, setInputValue] = useState(props.file.name);
	const [mouseRadar, setMouseRadar] = useState({ x: "0", y: "0" });
	
	const mouse = useMouse(props.refState, {
		enterDelay: 100,
		leaveDelay: 100,
	});
	
	function handleClick(e) {
		if (e.type === "click") {
			dispatch({type:"activeElementSelected", payload:{path:props.file.path}})
			if(mystate.activeElement.renameView) dispatch({type:"activeElementRename", payload:{path:""}})
			if(mystate.activeElement.contextMenu) dispatch({type:"activeElementContextMenu", payload:{path:""}})
			dispatch({type:"code_editor/OPEN_FILE",payload:{file:props.file}})
			dispatch({type:"code_editor/LOAD_FILE_CONTENT",payload:{file:props.file}})
		}
		else if (e.type === "contextmenu") {
			setMouseRadar({ x: mouse.x, y: mouse.y });
			dispatch({type:"activeElementSelected", payload:{path:props.file.path}})
			dispatch({type:"activeElementContextMenu", payload:{path:props.file.path}})
			dispatch({type:"activeElementRename", payload:{path:""}})
		}
	}
	
	function handleRename(){
		dispatch({type:"activeElementRename", payload:{path:props.file.path}})
		dispatch({type:"activeElementSelected", payload:{path:props.file.path}})
		dispatch({type:"activeElementContextMenu", payload:{path:""}})
	}
	
	function handlKeyDown(e) {
		if (e.keyCode === 13) {
			axios.patch(hostname+"/actioncode/"+mystate.actionCode.uuid+"/file",{path:props.file.path, new_name:inputValue} ,{ headers: {Authorization: token} })
        	.then((res) => {
				ActionCodeBuilder.rename(mystate.file_explorer, props.file.path,inputValue);
				dispatch({type:"setFileExplorer",payload:mystate.file_explorer})
				dispatch({type:"activeElementRename", payload:{path:""}})
        	})
			.catch((error) => {
				if (error.response && error.response.status === 401) {
					return console.log("error");
				}else {
					console.log("Sorry, we encountered a network error.")
				}
			});
		}
		else if (e.keyCode === 27) {
			setInputValue(props.file.name);
		}  
	}
	
	function handleDelete(){

		axios.delete(hostname+"/actioncode/"+mystate.actionCode.uuid+"/file", { headers: {Authorization: token},data:{path:props.file.path} })
        .then((res) => {
			ActionCodeBuilder.delete(mystate.file_explorer, props.file.path);
			dispatch({type:"setFileExplorer",payload:mystate.file_explorer})
			dispatch({type:"activeElementContextMenu", payload:{path:""}})
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            return console.log("error");
          } else {
            console.log("Sorry, we encountered a network error.")
          }
        });

		
	}
	
	if (props.file.path===mystate.activeElement.renameView) {
		return (
			<div
				onClick={(e) => { e.stopPropagation(); setInputValue(props.file.name)}}
				onKeyDown={(e) => { handlKeyDown(e)}}
				className="cursor-pointer hover:bg-[#292828]">
				<div className="flex items-center space-x-[4px] h-[28px] ">
					<img src={require('../../assets/vsicons/'+getIconForFile(inputValue))} className="w-[15px] h-[15px]" alt="" />
					<input onClick={(e) => { e.stopPropagation()}} className="text-white font-IBM-Plex-Sans w-full text-[12px] h-full font-medium border-2 px-2 rounded-md bg-[#292828] border-[#7900FF] outline-none"
						autoFocus={true}
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}/>
				</div>
			</div>
			);
		}
		else {
			return (
				<div className="">
					<div onContextMenu={(e) => {e.stopPropagation(); e.preventDefault(); handleClick(e)}}
						onClick={(e) => {e.stopPropagation(); handleClick(e)}}
						className={props.file.path===mystate.activeElement.codeAction?"cursor-pointer hover:bg-[#171717] bg-[#0f0e0e] px-2 rounded-md":"cursor-pointer hover:bg-[#292828] px-2 rounded-md"}>
						<div className="flex items-center space-x-[4px] h-[28px] ">
						<img src={require('../../assets/vsicons/'+getIconForFile(props.file.name))} className="w-[15px] h-[15px]" alt="" />
						<div className="text-white font-IBM-Plex-Sans text-[12px] font-medium">
							{inputValue}
						</div>
						</div>
					</div>
					{props.file.path===mystate.activeElement.contextMenu && (
							<div className="bg-[#191919] w-[187px] py-1 rounded-[9px] flex flex-col justify-center  border-1 border-[#292929]"
								style={{
									position: "absolute",
									top: mouseRadar.y,
									left: mouseRadar.x,
									zIndex: 6,
								}}>
									<div onClick={(e) => {e.stopPropagation(); handleRename()}}
									className="text-white font-IBM-Plex-Sans py-1 font-bold text-[9px] hover:bg-[#292929] pl-[13px] cursor-pointer"
									>
									RENAME
									</div>
									<div onClick={()=>handleDelete()}
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
	const [mouseRadar, setMouseRadar] = useState({ x: "0", y: "0" });
	const mouse = useMouse(props.refState, {
					enterDelay: 100,
					leaveDelay: 100,
				});
	
	function handleClick(e) {
		if (e.type === "click") {
			dispatch({type:"activeElementOpendFolders", payload:{path:props.folder.path}})
			dispatch({type:"activeElementSelected", payload:{path:props.folder.path}})
			dispatch({type:"activeElementRename", payload:{path:""}})
			dispatch({type:"activeElementContextMenu", payload:{path:""}})
		} else if (e.type === "contextmenu") {
			setMouseRadar({ x: mouse.x, y: mouse.y });
			dispatch({type:"activeElementSelected", payload:{path:props.folder.path}})
			dispatch({type:"activeElementContextMenu", payload:{path:props.folder.path}})
			dispatch({type:"activeElementRename", payload:{path:""}})
		}
	}	
				
	function handleRename(){
		dispatch({type:"activeElementRename", payload:{path:props.folder.path}})
		dispatch({type:"activeElementSelected", payload:{path:props.folder.path}})
		dispatch({type:"activeElementContextMenu", payload:{path:""}})
	}
				
	function handlKeyDown(e) {
		if (e.keyCode === 13) {
			axios.patch(hostname+"/actioncode/"+mystate.actionCode.uuid+"/folder",{path:props.folder.path, new_name:inputValue} ,{ headers: {Authorization: token} })
        	.then((res) => {
				ActionCodeBuilder.rename(mystate.file_explorer, props.folder.path,inputValue);
				dispatch({type:"setFileExplorer",payload:mystate.file_explorer})
				dispatch({type:"activeElementRename", payload:{path:""}})
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            return console.log("error");
          } else {
            console.log("Sorry, we encountered a network error.")
          }
        });
			
		}
		else if (e.keyCode === 27) {
			setInputValue(props.folder.name);
		}  
	}
				
	function handleDelete(){
		axios.delete(hostname+"/actioncode/"+mystate.actionCode.uuid+"/folder", { headers: {Authorization: token},data:{path:props.folder.path} })
        .then((res) => {
			ActionCodeBuilder.delete(mystate.file_explorer, props.folder.path);
			dispatch({type:"setFileExplorer",payload:mystate.file_explorer})
			dispatch({type:"activeElementContextMenu", payload:{path:""}})
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            return console.log("error");
          } else {
            console.log("Sorry, we encountered a network error.")
          }
        });
	}
				
	function handleCreateFile() {
		let node=new File(props.folder.path+"/new_file","new_file")
		axios.post(hostname+"/actioncode/"+mystate.actionCode.uuid+"/file", {path:node.path}, { headers: {Authorization: token} })
        .then((res) => {
			ActionCodeBuilder.add(mystate.file_explorer,node,props.folder.path);
			dispatch({type:"setFileExplorer",payload:mystate.file_explorer})
			if(!mystate.activeElement.opendFolders.includes(props.folder.path)) dispatch({type:"activeElementOpendFolders", payload:{path:props.folder.path}})
			dispatch({type:"activeElementSelected", payload:{path:node.path}}) 
			dispatch({type:"activeElementContextMenu", payload:{path:""}})
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            return console.log("error");
          } else {
            console.log("Sorry, we encountered a network error.")
          }
        });
		
	}
				
	function handleCreateFolder() {
		let node=new Folder(props.folder.path+"/new_folder","new_folder")
		axios.post(hostname+"/actioncode/"+mystate.actionCode.uuid+"/folder", {path:node.path}, { headers: {Authorization: token} })
        .then((res) => {
			ActionCodeBuilder.add(mystate.file_explorer,node,props.folder.path);
			if(!mystate.activeElement.opendFolders.includes(props.folder.path)) dispatch({type:"activeElementOpendFolders", payload:{path:props.folder.path}})
			dispatch({type:"activeElementSelected", payload:{path:node.path}}) 
			dispatch({type:"activeElementContextMenu", payload:{path:""}})
			dispatch({type:"setFileExplorer",payload:mystate.file_explorer})
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            return console.log("error");
          } else {
            console.log("Sorry, we encountered a network error.")
          }
        });

		
	}

				
	return (
		<div className="">
			{props.folder.path===mystate.activeElement.renameView && (
				<div onClick={(e) => { e.stopPropagation(); setInputValue(props.folder.name)}}
					onKeyDown={(e) => {handlKeyDown(e)}}
					className="cursor-pointer hover:bg-[#292828]">
					<div className="flex items-center space-x-[4px] h-[28px] ">
						<img
							src={mystate.activeElement.opendFolders.includes(props.folder.path)?require("../../assets/vsicons/"+getIconForOpenFolder(inputValue)):require("../../assets/vsicons/"+getIconForFolder(inputValue))}
							className="w-[15px] h-[15px] z-10"
							alt=""
						/>
						<input
							onClick={(e) => {
							e.stopPropagation();
							}}
							className="text-white font-IBM-Plex-Sans w-full text-[12px] h-full font-medium border-2 px-2 rounded-md bg-[#292828] border-[#7900FF] outline-none"
							autoFocus={true}
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
						/>
					</div>
				</div>
			)}
			{props.folder.path!=mystate.activeElement.renameView && (
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
						className={props.folder.path===mystate.activeElement.codeAction?"flex items-center space-x-[4px] h-[28px] cursor-pointer hover:bg-[#171717] bg-[#0f0e0e] px-2 rounded-md":"px-2 rounded-md flex items-center space-x-[4px] h-[28px] cursor-pointer hover:bg-[#292828]"}
						>
						<img
							src={mystate.activeElement.opendFolders.includes(props.folder.path)?require("../../assets/vsicons/"+getIconForOpenFolder(props.folder.name)):require("../../assets/vsicons/"+getIconForFolder(props.folder.name))}
							className="w-[15px] h-[15px] z-10"
							alt=""
						/>
						<div className="text-white font-IBM-Plex-Sans text-[12px] font-medium z-10">
							{props.folder.name}
						</div>
					</div>
					{props.folder.path===mystate.activeElement.contextMenu && (
						<div
							className="bg-[#191919] w-[187px] py-1 rounded-[9px] flex flex-col justify-center  border-1 border-[#292929]"
							style={{
							position: "absolute",
							top: mouseRadar.y,
							left: mouseRadar.x,
							zIndex: 6,
							}}>
							<div
								onClick={(e)=>{e.stopPropagation(); handleCreateFolder()}}
								className="text-white font-IBM-Plex-Sans  py-1 font-bold text-[9px] hover:bg-[#292929] pl-[13px] cursor-pointer">
								CREATE FOLDER
							</div>
							<div
								onClick={(e)=>{e.stopPropagation(); handleCreateFile()}}
								className="text-white font-IBM-Plex-Sans  py-1 font-bold text-[9px] hover:bg-[#292929] pl-[13px] cursor-pointer">
								CREATE FILE
							</div>
							<div
								onClick={(e) => {
								e.stopPropagation();
								handleRename();
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
			{mystate.activeElement.opendFolders.includes(props.folder.path) &&
				props.children.map((element) => {
					if (element instanceof Folder) {
						return (
							<div className="ml-6" key={element.path}>
							<CFolder key={element.path} folder={element} children={element.children} refState={props.refState}/>
							</div>
							);
						}
					else if (element instanceof File) {
						return (
							<div className="ml-6" key={element.path}>
							<CFile key={element.path} file={element} is_input={false} refState={props.refState}/>
							</div>
							);
						}
			})}
		</div>
	)
}
							
function CodeEditorTabs(props){
	const dispatch = useDispatch(); 
	const mystate = useSelector((state) => state);
	function handleCloseTab(){
		dispatch({type:"code_editor/CLOSE_FILE",payload:{path:props.selectedFile.path}})
		dispatch({type:"code_editor/LOAD_LAST_FILE_CONTENT",payload:{file:props.selectedFile}})
	}
	function handleClickTab(){
		dispatch({type:"code_editor/LOAD_FILE_CONTENT",payload:{file:props.selectedFile}})
	}
	
	if(mystate.codeEditor.selectedFile.path===props.selectedFile.path)
		return (
			<div onClick={()=>handleClickTab()} className="px-4 bg-[#171717] w-[171px] h-[53px] flex items-center justify-between space-x-[4px] border-b-4 border-[#7900FF] cursor-pointer">
				<div></div>
				<div className="flex items-center space-x-1">
					<img src={require('../../assets/vsicons/'+getIconForFile(props.selectedFile.name))} className="w-[14px] h-[14px]" alt="" />
					<div className="text-white font-IBM-Plex-Sans text-[14px] font-medium">
					{props.selectedFile.name}
					</div>
				</div>
				<div onClick={(e)=>{e.stopPropagation(); handleCloseTab()}} className=" cursor-pointer hover:bg-[#292828] h-4 w-4 grid place-content-center rounded-full">
				<img src={closeIcon} className="h-2 w-2"/>
				</div>
			</div>
			)
		else return (
			<div onClick={()=>handleClickTab()} className="px-2 bg-[#202020] w-[171px] h-[53px] flex items-center justify-between space-x-[4px] cursor-pointer">
				<div></div>
				<div className="flex items-center space-x-1">
					<img src={require('../../assets/vsicons/'+getIconForFile(props.selectedFile.name))} className="w-[14px] h-[14px]" alt="" />
					<div  className=" text-white font-IBM-Plex-Sans text-[14px] font-medium">
					{props.selectedFile.name}
					</div>
				</div>
				<div onClick={(e)=>{e.stopPropagation(); handleCloseTab()}} className=" cursor-pointer hover:bg-[#292828] h-4 w-4 grid place-content-center rounded-full">
				<img src={closeIcon} className="h-2 w-2"/>
				</div>
			</div>
			)
}
		
function CodeEditorTabList(props){
	const dispatch = useDispatch(); 
	if (props.openedFiles) {
		return props.openedFiles.map(element=>{
			return (
				<div key={element.path}>
					<CodeEditorTabs selectedFile={element}/>
				</div>
				)
			})
		}
	else return <div className=" bg-[#141414] w-full h-[53px]"/>
		
}
			
export default function CodeEditor() {
	const dispatch = useDispatch();
	const mystate = useSelector((state) => state);
	let dt = { username: "ehamza", password: "123" };
	const [eventIDE, setEventIDE] = useState(JSON.stringify(dt, null, "\t"));
	const [outputIDE, setOutputIDE] = useState("");
	const [responseIDE, setResponseIDE] = useState("");
	const [mouseRadar, setMouseRadar] = useState({ x: "0", y: "0" });
	const ref = React.useRef(null);
	const [timer,setTimer]=useState(null)
	
	const mouse = useMouse(ref, {
		enterDelay: 100,
		leaveDelay: 100,
	});
	


	function handleChange(content,path){
		clearTimeout(timer);
		dispatch({type:"code_editor/UPDATE_FILE_CONTENT",payload:{content:content, path:path}})
		let mytime = setTimeout(() => {
    	dispatch({type:"code_editor/UPDATE_OPENED_FILE_CONTENT",payload:{content:content, path:path}})
		}, 500);
		setTimer(mytime)	
	}
		
	

	function handleClick(e) {
		if (e.type === "click") {
			dispatch({type:"activeElementSelected", payload:{path:"-1"}})
			dispatch({type:"activeElementContextMenu", payload:{path:""}})
			dispatch({type:"activeElementRename", payload:{path:""}})
		}
		else if (e.type === "contextmenu") {
			setMouseRadar({ x: mouse.x, y: mouse.y });
			dispatch({type:"activeElementSelected", payload:{path:"-1"}})
			dispatch({type:"activeElementContextMenu", payload:{path:"-1"}})
			dispatch({type:"activeElementRename", payload:{path:""}})
		}
	}
	
	function handleCreateFile() {
		let node=new File(mystate.file_explorer.path+"/new_file","new_file")
		axios.post(hostname+"/actioncode/"+mystate.actionCode.uuid+"/file", {path:node.path}, { headers: {Authorization: token} })
        .then((res) => {
			if (mystate.activeElement.codeAction==="-1") ActionCodeBuilder.addToRoot(mystate.file_explorer,node);
			else ActionCodeBuilder.add(mystate.file_explorer,node,mystate.activeElement.codeAction)
			//dispatch({type:"activeElementRename", payload:{path:node.path}})
			dispatch({type:"activeElementSelected", payload:{path:node.path}}) 
			dispatch({type:"activeElementContextMenu", payload:{path:""}})
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            return console.log("error");
          } else {
            console.log("Sorry, we encountered a network error.")
          }
        });
	}

	function handleCreateFolder() {
		let node=new Folder(mystate.file_explorer.path+"/new_folder","new_folder")
		axios.post(hostname+"/actioncode/"+mystate.actionCode.uuid+"/folder", {path:node.path}, { headers: {Authorization: token} })
        .then((res) => {
			ActionCodeBuilder.addToRoot(mystate.file_explorer,node);
			//dispatch({type:"activeElementRename", payload:{path:node.path}})
			dispatch({type:"activeElementSelected", payload:{path:node.path}}) 
			dispatch({type:"activeElementContextMenu", payload:{path:""}})
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            return console.log("error");
          } else {
            console.log("Sorry, we encountered a network error.")
          }
        });
		
	}

	useEffect(() => {
		let data = {
			path: "0",
			type: "folder",
			name: "root",
			icon: null,
			path: "",
			children: [
				{
					path: "1",
					type: "folder",
					name: "cockpit",
					icon: folderIcon,
					path: "/cockpit",
					children: [
						{
							path: "2",
							type: "folder",
							name: "src",
							icon: folderIcon,
							path: "/cockpit/src",
							children: [
								{
									path: "3",
									type: "folder",
									icon: folderIcon,
									name: "screens",
									path: "/cockpit/src/screens",
									children: [
										{
											path: "4",
											type: "file",
											icon: pythonIcon,
											name: "App.js",
											path: "/cockpit/src/screens/App.js",
										},
										{
											path: "5",
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
							path: "6",
							type: "file",
							icon: pythonIcon,
							name: "index.css",
							path: "/cockpit/index.css",
						},
					],
				},
				{
					path: "7",
					type: "file",
					icon: pythonIcon,
					name: ".gitignore",
					path: "/.gitignore",
				},
			],
		};
			
		let mydata = ActionCodeBuilder.build(data);
	
		if (!mystate.file_explorer.children) {
			axios.get(hostname+"/actioncode/"+mystate.actionCode.uuid, {headers: { Authorization: token },})
			.then(response=>{
				let data = response.data.payload.ActionCode;
				dispatch({type: "setFileExplorer",	payload: ActionCodeBuilder.build(data)});
			}).catch(error=>console.log(error))
			
			
		}
	}, [mystate.file_explorer.children]);
	
	return (
		<div className="flex flex-col bg-black">
			<div className="flex h-[427px] bg-[#202020]">
				{/*Lef panel section*/}
				<div onContextMenu={(e) => e.preventDefault()} className="bg-[#202020] w-1/5 relative" ref={ref}>
					<div onClick={handleClick} onContextMenu={handleClick} className="h-full flex flex-col">
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
								<div onClick={(e) => {e.stopPropagation(); handleCreateFile()}} title="Create New File" className="bg-[#7ECA9C] hover:bg-black h-[18px] w-[26px] rounded-[6px] grid place-content-center cursor-pointer">
									<div className="text-[14px] font-bold font-IBM-Plex-Sans text-white">+</div>
								</div>
							</div>
						</div>
						<div className="ml-[48px] mt-[15px] mr-2 grow overflow-hidden overflow-y-auto pb-2">
						<CFileTree refState={ref} file_explorer_state={mystate.file_explorer} onClick={onclick} handleClick={() => handleClick}/>
						</div>
					</div>
					{mystate.activeElement.contextMenu==="-1" && (
						<div
						className="bg-[#191919] w-[187px] h-[89px] rounded-[9px] flex flex-col justify-center  border-1 border-[#292929] space-y-[1px]"
						style={{
							position: "absolute",
							top: mouseRadar.y,
							left: mouseRadar.x,
							zIndex: 6,
						}}
						>
						<div onClick={(e)=>{e.stopPropagation(); handleCreateFolder()}} className="text-white font-IBM-Plex-Sans font-bold text-[9px] hover:bg-[#292929] pl-[13px] cursor-pointer">
						CREATE FOLDER
						</div>
						<div onClick={(e)=>{e.stopPropagation(); handleCreateFile()}} className="text-white font-IBM-Plex-Sans font-bold text-[9px] hover:bg-[#292929] pl-[13px] cursor-pointer">
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
				{/*Left panel section end*/}
				{/* File content section */}
				<div className="w-4/5">
					<div className="flex overflow-hidden overflow-x-auto">
						<CodeEditorTabList openedFiles={mystate.codeEditor.openedFiles}/>
					</div>
					<div onClick={e=>e.stopPropagation()}>
						{mystate.codeEditor.selectedFile.content!=null &&
						<AceEditor
							key={mystate.codeEditor.selectedFile.path}
							showPrintMargin={false}
							height="374px"
							fontSize="17px"
							width="100%"
							mode="python"
							theme="tomorrow_night"
							onChange={(value)=>handleChange(value,mystate.codeEditor.selectedFile.path)}
							value={mystate.codeEditor.selectedFile.content}
							name="code_editor"
							editorProps={{ $blockScrolling: true }}
							setOptions={{
								enableBasicAutocompletion: true,
								enableLiveAutocompletion: true,
								enableSnippets: true,
								showLineNumbers: true,
							}}/>
						}
						{mystate.codeEditor.selectedFile.name===null &&  <div className="bg-[#141414] w-full h-[427px]"></div>}
					</div>
				</div>
				{/* File content section end*/}
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
