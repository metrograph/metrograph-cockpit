// React imports
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate } from "react-router-dom";
import useMouse from "@react-hook/mouse-position";

// Ace editor imports
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/python";

// Icons imports
import closeIcon from "../assets/icons/close.svg"
import i_icon from "../assets/icons/i.svg";
import { ReactComponent as ArrowDown } from "../assets/icons/arrow-down.svg";

// Internal components
import ActionCodeBuilder from "./ActionCodeBuilder";
import File from "./File";
import Folder from "./Folder";
import ModalFile from "./modalFile";
import {config} from "../config";

// External components
import axios from "axios"
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'
import Toast from 'react-bootstrap/Toast'
import { getIconForFile, getIconForFolder, getIconForOpenFolder } from 'vscode-icons-js';

//Buttons components
function ButtonRun (props){
	console.log(props)
	return (
        <div>
            {props.loading &&
            <div>
               <div className="text-white font-IBM-Plex-Sans text-[10px] font-bold bg-[#7900FF] w-[100px] h-[35px] rounded-[9px] flex items-center justify-center cursor-pointer hover:bg-purple-600">
				<Spinner
                    className="mr-2"
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        />
                Running
                </div>
            </div>
        }
        {!props.loading &&
            <div onClick={(e)=>props.onClick(e)} className="text-white font-IBM-Plex-Sans text-[10px] font-bold bg-[#7900FF] w-[92px] h-[35px] rounded-[9px] flex items-center justify-center cursor-pointer hover:bg-purple-600">
			Run
			</div>
        }
        </div>
    )
	
}
function ButtonBuild (props){
	return (
        <div>
            {props.loading &&
            <div>
               <div className="text-white font-IBM-Plex-Sans text-[10px] font-bold bg-[#7ECA9C] w-[100px] h-[35px] rounded-[9px] flex items-center justify-center cursor-pointer hover:bg-green-400">
				<Spinner
                    className="mr-2"
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        />
                Building
                </div>
            </div>
        }
        {!props.loading &&
            <div onClick={(e)=>props.onClick(e)} className="text-white font-IBM-Plex-Sans text-[10px] font-bold bg-[#7ECA9C] w-[92px] h-[35px] rounded-[9px] flex items-center justify-center cursor-pointer hover:bg-green-400">
			Build
			</div>
        }
        </div>
    )
	
}

function MyModal(props) {
    return (
      <Modal
        {...props}
        size="sm"
        centered
      >
        <Modal.Body
            as={ModalFile}
			setAlert={(title, type, delay)=>props.setAlert(title, type, delay)}
			file={props.file}
			actionCode={props.actionCode}
			show={props.show}
            onHide={() => props.onHide()}/>
      </Modal>
    );
}

function MyToast(props){
	return (
		<div className="flex items-center w-full absolute left-14 bottom-2">
			<div className="text-white font-IBM-Plex-Sans font-semibold text-md bg-green-600 px-2 py-1">
				{props.message}
			</div>
		</div>
	)
}

function CFileTree(props) {
	if (props.file_explorer_state.children) {
		if (props.file_explorer_state.children) {
			return props.file_explorer_state.children.map((element) => {
				if (element instanceof Folder)
				return <CFolder
							key={element.path}
							show={props.show}
                			onVisible={() => props.onVisible()}
							setModalData={(e)=>props.setModalData(e)}
							actionCode={props.actionCode}
							folder={element}
							refState={props.refState}
							/>
				else
				return <CFile
							key={element.path}
							show={props.show}
                			onVisible={() => props.onVisible()}
							setModalData={(e)=>props.setModalData(e)}
							actionCode={props.actionCode}
							file={element}
							refState={props.refState} />
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
			dispatch({type:"active_element/SELECT_FILE", payload:{path:props.file.path}})
			if(mystate.activeElement.renameView) dispatch({type:"active_element/RENAME", payload:{path:""}})
			if(mystate.activeElement.contextMenu) dispatch({type:"active_element/CONTEXT_MENU", payload:{path:""}})
			dispatch({type:"code_editor/OPEN_FILE",payload:{file:props.file}})

			axios.post(config.METROGRAPH_API+"/actioncode/"+props.actionCode.uuid+"/file/content",{path:props.file.path},{headers: { Authorization: mystate.user.token }})
				.then((res) => {
					dispatch({type:"code_editor/LOAD_FILE_CONTENT_API",payload:{file:props.file, actionCode:props.actionCode,data:res.data}})
					// dispatch -alert/SET_ALERT- was added to force the UI to rerender.
					dispatch({type:"alert/SET_ALERT",payload:{title:"", is_hide:true, type:""}})
				}).catch(error=>{
					console.log(error)	
				})
				
		}
		else if (e.type === "contextmenu") {
			setMouseRadar({ x: mouse.x, y: mouse.y });
			dispatch({type:"active_element/SELECT_FILE", payload:{path:props.file.path}})
			dispatch({type:"active_element/CONTEXT_MENU", payload:{path:props.file.path}})
			dispatch({type:"active_element/RENAME", payload:{path:""}})
		}
	}

	function handleRename(){
		dispatch({type:"active_element/RENAME", payload:{path:props.file.path}})
		dispatch({type:"active_element/SELECT_FILE", payload:{path:props.file.path}})
		dispatch({type:"active_element/CONTEXT_MENU", payload:{path:""}})
	}
	
	function handlKeyDown(e) {
		if (e.keyCode === 13) {
			axios.patch(config.METROGRAPH_API+"/actioncode/"+props.actionCode.uuid+"/file",{path:props.file.path, new_name:inputValue} ,{ headers: {Authorization: mystate.user.token} })
        	.then((res) => {
				ActionCodeBuilder.rename(mystate.file_explorer, props.file.path,inputValue);
				dispatch({type:"setFileExplorer",payload:mystate.file_explorer})
				dispatch({type:"active_element/RENAME", payload:{path:""}})
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
		props.setModalData(props.file)
		props.onVisible()
	}
	
	if (props.file.path===mystate.activeElement.renameView) {
		return (
			<div
				onClick={(e) => { e.stopPropagation(); setInputValue(props.file.name)}}
				onKeyDown={(e) => { handlKeyDown(e)}}
				className="cursor-pointer hover:bg-[#292828]">
				<div className="flex items-center space-x-[4px] h-[28px] ">
					<img src={require("../assets/vsicons/"+getIconForFile(inputValue))} className="w-[15px] h-[15px]" alt="" />
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
							<img src={require("../assets/vsicons/"+getIconForFile(props.file.name))} className="w-[15px] h-[15px]" alt="" />
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
			dispatch({type:"active_element/OPEN_FOLDER", payload:{path:props.folder.path}})
			dispatch({type:"active_element/SELECT_FILE", payload:{path:props.folder.path}})
			dispatch({type:"active_element/RENAME", payload:{path:""}})
			dispatch({type:"active_element/CONTEXT_MENU", payload:{path:""}})
		} else if (e.type === "contextmenu") {
			setMouseRadar({ x: mouse.x, y: mouse.y });
			dispatch({type:"active_element/SELECT_FILE", payload:{path:props.folder.path}})
			dispatch({type:"active_element/CONTEXT_MENU", payload:{path:props.folder.path}})
			dispatch({type:"active_element/RENAME", payload:{path:""}})
		}
	}	
				
	function handleRename(){
		dispatch({type:"active_element/RENAME", payload:{path:props.folder.path}})
		dispatch({type:"active_element/SELECT_FILE", payload:{path:props.folder.path}})
		dispatch({type:"active_element/CONTEXT_MENU", payload:{path:""}})
	}
				
	function handlKeyDown(e) {
		if (e.keyCode === 13) {
			axios.patch(config.METROGRAPH_API+"/actioncode/"+props.actionCode.uuid+"/folder",{path:props.folder.path, new_name:inputValue} ,{ headers: {Authorization: mystate.user.token} })
        	.then((res) => {
				ActionCodeBuilder.rename(mystate.file_explorer, props.folder.path,inputValue);
				dispatch({type:"setFileExplorer",payload:mystate.file_explorer})
				dispatch({type:"active_element/RENAME", payload:{path:""}})
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
		props.setModalData(props.folder)
		props.onVisible()
	}
				
	function handleCreateFile() {
		let node=new File(props.folder.path+"/new_file","new_file")
		axios.post(config.METROGRAPH_API+"/actioncode/"+props.actionCode.uuid+"/file", {path:node.path}, { headers: {Authorization: mystate.user.token} })
        .then((res) => {
			ActionCodeBuilder.add(mystate.file_explorer,node,props.folder.path);
			dispatch({type:"setFileExplorer",payload:mystate.file_explorer})
			if(!mystate.activeElement.opendFolders.includes(props.folder.path)) dispatch({type:"active_element/OPEN_FOLDER", payload:{path:props.folder.path}})
			dispatch({type:"active_element/SELECT_FILE", payload:{path:node.path}}) 
			dispatch({type:"active_element/CONTEXT_MENU", payload:{path:""}})
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
		axios.post(config.METROGRAPH_API+"/actioncode/"+props.actionCode.uuid+"/folder", {path:node.path}, { headers: {Authorization: mystate.user.token} })
        .then((res) => {
			ActionCodeBuilder.add(mystate.file_explorer,node,props.folder.path);
			if(!mystate.activeElement.opendFolders.includes(props.folder.path)) dispatch({type:"active_element/OPEN_FOLDER", payload:{path:props.folder.path}})
			dispatch({type:"active_element/SELECT_FILE", payload:{path:node.path}}) 
			dispatch({type:"active_element/CONTEXT_MENU", payload:{path:""}})
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
							src={mystate.activeElement.opendFolders.includes(props.folder.path)?require("../assets/vsicons/"+getIconForOpenFolder(inputValue)):require("../assets/vsicons/"+getIconForFolder(inputValue))}
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
			{props.folder.path!==mystate.activeElement.renameView && (
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
							src={mystate.activeElement.opendFolders.includes(props.folder.path)?require("../assets/vsicons/"+getIconForOpenFolder(props.folder.name)):require("../assets/vsicons/"+getIconForFolder(props.folder.name))}
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
				props.folder.children.map((element) => {
					if (element instanceof Folder) {
						return (
							<div className="ml-6" key={element.path}>
							<CFolder
								key={element.path}
								show={props.show}
                				onVisible={() => props.onVisible()}
								setModalData={(e)=>props.setModalData(e)}
								actionCode={props.actionCode}
								folder={element}
								children={element.children}
								refState={props.refState}/>
							</div>
							);
						}
					else if (element instanceof File) {
						return (
							<div className="ml-6" key={element.path}>
							<CFile
								key={element.path}
								show={props.show}
                				onVisible={() => props.onVisible()}
								setModalData={(e)=>props.setModalData(e)}
								actionCode={props.actionCode}
								file={element}
								is_input={false}
								refState={props.refState}/>
							</div>
							);
						}
					else return (<div></div>)
			})}
		</div>
	)
}

function CodeEditorTabs(props){
	const dispatch = useDispatch(); 
	const mystate = useSelector((state) => state);
	function handleCloseTab(){
		dispatch({type:"code_editor/CLOSE_FILE",payload:{path:props.file.path}})
		dispatch({type:"code_editor/LOAD_LAST_FILE_CONTENT",payload:{file:props.file}})
	}
	function handleClickTab(){
		dispatch({type:"active_element/SELECT_FILE", payload:{path:props.file.path}})
		dispatch({type:"code_editor/LOAD_FILE_CONTENT",payload:{file:props.file, actionCode:props.actionCode}})
	}
	
	if(mystate.codeEditor.selectedFile.path===props.file.path)
		return (
			<div onClick={()=>handleClickTab()} className="px-2 grid place-content-center bg-[#171717] min-w-[100px] h-[53px] cursor-pointer relative">
				<div className="flex items-center min-w-[100px] justify-between">
					<div className="flex items-center space-x-[1px]">
						<img src={require("../assets/vsicons/"+getIconForFile(props.file.name))} className="w-[14px] h-[14px]" alt="file-icon" />
						<div className="text-white align-middle font-IBM-Plex-Sans text-[14px] font-medium">
						{props.file.name}
						</div>
					</div>
					<div onClick={(e)=>{e.stopPropagation(); handleCloseTab()}} className=" cursor-pointer hover:bg-[#292828] h-4 w-4 grid place-content-center rounded-full">
						{props.isUnsavedFile(props.file.path) ? <div className="h-2 w-2 bg-white rounded-full" /> : <img src={closeIcon} className="h-2 w-2" alt="close-icon"/>}
					</div>
				</div>
				<div className="border-b-4 border-[#7900FF] w-full left-0 absolute bottom-0"/>
			</div>
			)
		else return (
			<div onClick={()=>handleClickTab()} className="px-2 bg-[#202020] min-w-[120px] h-[53px] flex items-center justify-between space-x-[4px] cursor-pointer">
				<div className="flex items-center space-x-1">
					<img src={require("../assets/vsicons/"+getIconForFile(props.file.name))} className="w-[14px] h-[14px]" alt="file-icon" />
					<div  className=" text-white font-IBM-Plex-Sans text-[14px] font-medium">
					{props.file.name}
					</div>
				</div>
				<div onClick={(e)=>{e.stopPropagation(); handleCloseTab()}} className=" cursor-pointer hover:bg-[#292828] h-4 w-4 grid place-content-center rounded-full">
					{props.isUnsavedFile(props.file.path) ? <div className="h-2 w-2 bg-white rounded-full" /> : <img src={closeIcon} className="h-2 w-2" alt="close-icon"/>}
				</div>
			</div>
			)
}
		
function CodeEditorTabList(props){
	if (props.openedFiles) {
		return props.openedFiles.map(element=>{
			return (
				<div key={element.path}>
					<CodeEditorTabs file={element} isUnsavedFile={(path)=>props.isUnsavedFile(path)}/>
				</div>
				)
			})
		}
	else return <div className=" bg-[#141414] w-full h-[53px]"/>
		
}
			
export default function CodeEditor(props) {
	// Global state
	const dispatch = useDispatch();
	const mystate = useSelector((state) => state);
	const navigate = useNavigate()
	
	// Modal local state
	const [modalVisible, setModalVisible]= useState(false)
	const [modaldData, setModalData]= useState()

	// Toast local state
	const [showToast, setshowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState();

	// Code editor local state
	const [eventIDE, setEventIDE] = useState(JSON.stringify({event: "null"}, null, "\t"));
	const [outputIDE, setOutputIDE] = useState("");
	const [responseIDE, setResponseIDE] = useState("");

	const [unsavedFiles, setUnsavedFiles]=useState([])
	const [timer,setTimer]=useState(null)
	const [mouseRadar, setMouseRadar] = useState({ x: "0", y: "0" });
	const ref = React.useRef(null);
	const [loading, setLoading]=useState(true)

	// Loading Spinner state
	const [LoadingRun, setLoadingRun]= useState(false)
	const [LoadingBuild, setLoadingBuild]= useState(false)

	function setToast(message,delay){
		setToastMessage(message)
		setshowToast(true)
		setTimeout(() => {
			setshowToast(false)
			}, delay);
	}

	function AddToUnsavedFiles(path){
		if(!unsavedFiles.includes(path)) setUnsavedFiles([...unsavedFiles, path])
	}

	function isUnsavedFile(path){
		if(unsavedFiles.includes(path))return true
		else return false
	}

	function removeFromUnsavedFiles(path){
		setUnsavedFiles(unsavedFiles.filter(e=>e!=path))
	}
	
	const mouse = useMouse(ref, {
		enterDelay: 100,
		leaveDelay: 100,
	});
	
	function handleChange(content,path){
		clearTimeout(timer);
		dispatch({type:"code_editor/UPDATE_FILE_CONTENT",payload:{content:content, path:path}})
		AddToUnsavedFiles(path)
		let mytime = setTimeout(() => {
			dispatch({type:"code_editor/UPDATE_OPENED_FILE_CONTENT",payload:{content:content, path:path}})
			axios.put(config.METROGRAPH_API+"/actioncode/"+props.actionCode.uuid+"/file",{path:path, content:content},{headers: { Authorization: mystate.user.token }})
				.then((res) => {
					removeFromUnsavedFiles(path)
					console.log(unsavedFiles)
					setToast(res.data.message,3000)
				}).catch(error=>{
					setToast(error.data.message,3000)
				})
			}, 3000);
		setTimer(mytime)	
	}
		
	function handleClick(e) {
		if (e.type === "click") {
			dispatch({type:"active_element/SELECT_FILE", payload:{path:"-1"}})
			dispatch({type:"active_element/CONTEXT_MENU", payload:{path:""}})
			dispatch({type:"active_element/RENAME", payload:{path:""}})
		}
		else if (e.type === "contextmenu") {
			setMouseRadar({ x: mouse.x, y: mouse.y });
			dispatch({type:"active_element/SELECT_FILE", payload:{path:"-1"}})
			dispatch({type:"active_element/CONTEXT_MENU", payload:{path:"-1"}})
			dispatch({type:"active_element/RENAME", payload:{path:""}})
		}
	}
	
	function handleCreateFile() {
		let node=new File(mystate.file_explorer.path+"new_file","new_file")
		axios.post(config.METROGRAPH_API+"/actioncode/"+props.actionCode.uuid+"/file", {path:node.path}, { headers: {Authorization: mystate.user.token} })
        .then((res) => {
			if (mystate.activeElement.codeAction==="-1") ActionCodeBuilder.addToRoot(mystate.file_explorer,node);
			else ActionCodeBuilder.add(mystate.file_explorer,node,mystate.activeElement.codeAction)
			//dispatch({type:"active_element/RENAME", payload:{path:node.path}})
			dispatch({type:"active_element/SELECT_FILE", payload:{path:node.path}}) 
			dispatch({type:"active_element/CONTEXT_MENU", payload:{path:""}})
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
		let node=new Folder(mystate.file_explorer.path+"new_folder","new_folder")
		axios.post(config.METROGRAPH_API+"/actioncode/"+props.actionCode.uuid+"/folder", {path:node.path}, { headers: {Authorization: mystate.user.token} })
        .then((res) => {
			ActionCodeBuilder.addToRoot(mystate.file_explorer,node);
			//dispatch({type:"active_element/RENAME", payload:{path:node.path}})
			dispatch({type:"active_element/SELECT_FILE", payload:{path:node.path}}) 
			dispatch({type:"active_element/CONTEXT_MENU", payload:{path:""}})
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            return console.log("error");
          } else {
            console.log("Sorry, we encountered a network error.")
          }
        });
		
	}

	function handleRun(){
		setLoadingRun(true)
		axios.post(config.METROGRAPH_API+"/action/"+props.actionCode.uuid+"/run", {}, {headers: { Authorization: mystate.user.token }})
			.then((res) => {
				setLoadingRun(false)
				props.setAlert(res.data.message, "success", 3000)
			})
			.catch(error=>{
				setLoadingRun(false)
				props.setAlert(error.data.message, "error", 3000)
			})
	}

	function handleBuild(){
		setLoadingBuild(true)
		axios.post(config.METROGRAPH_API+"/action/"+props.actionCode.uuid+"/image/build", {}, {headers: { Authorization: mystate.user.token }})
			.then((res) => {
				setLoadingBuild(false)
				props.setAlert(res.data.message, "success", 3000)
			})
			.catch(error=>{
				setLoadingBuild(false)
				props.setAlert(error.data.message, "error", 3000)
			})
	}
	
	useEffect(() => {
	window.scrollTo(0, 0);
    function loadLocalStorage() {
      const localstorage = localStorage.getItem("METROGRAPH_STORAGE");
      const data = JSON.parse(localstorage);
      if (JSON.parse(localstorage)) {
        	dispatch({ type: "user/SET", payload: data });
        	if(data.user.token)
        	{
				axios.get(config.METROGRAPH_API+"/actioncode/"+props.actionCode.uuid, {headers: { Authorization: data.user.token}})
				.then(response=>{
					setLoading(false)
					dispatch({type: "setFileExplorer",	payload: ActionCodeBuilder.build(response.data.payload.ActionCode)});
				}).catch(()=>setLoading(false))
			}
      }
      else return navigate("/login")
    }
  	loadLocalStorage();
	},[loading, dispatch, navigate, props.actionCode.uuid]);
	
	return (
		<div className="flex flex-col bg-black relative">
			<MyModal
				file={modaldData}
				actionCode={props.actionCode}
				show={modalVisible}
                onHide={() => setModalVisible(false)}
				setAlert={(title, type, delay)=>props.setAlert(title, type, delay)}
			/>
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
						<CFileTree
							actionCode={props.actionCode}
							refState={ref}
							file_explorer_state={mystate.file_explorer}
							show={modalVisible}
							setModalData={(e)=>setModalData(e)}
                			onVisible={() => setModalVisible(true)}
						/>
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
						<CodeEditorTabList openedFiles={mystate.codeEditor.openedFiles} isUnsavedFile={(path)=>isUnsavedFile(path)}/>
					</div>
					<div onClick={e=>e.stopPropagation()} className="relative">
							{mystate.codeEditor.selectedFile.content!==null &&
							<div>
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
							<Toast style={{width:"auto"}} show={showToast} animation={true}>
								<Toast.Body as={MyToast} message={toastMessage}/>
							</Toast>
							</div>
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
					<div className="mt-[15px] flex place-content-end space-x-2">
						<ButtonRun loading={LoadingRun} onClick={(e)=>{e.stopPropagation(); handleRun()}}/>
						<ButtonBuild loading={LoadingBuild} onClick={(e)=>{e.stopPropagation(); handleBuild()}}/>
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
