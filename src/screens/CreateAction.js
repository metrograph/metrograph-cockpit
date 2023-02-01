// React imports
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// External components
import axios from "axios";

// Internal components
import DropDpwnList from "../components/DropDownList";
import MyInput from "../components/MyInput";
import Alert from "../components/Alert";
import TopBar from "../components/TopBar";
import {config} from "../config"
import FadeAnimation from "../components/Animations/FadeAnimation";
import AuthCheck from "../components/AuthCheck";

export default function CreateAction() {
	// Global state
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const mystate = useSelector((state) => state);
	
	// Alert local state
	const [alertVisible, setAlertVisible]= useState(false)
	const [alertData, setAlertData]=useState()
	
	// Inputs local state
	const [name, setName]=useState()
	const [description, setDescription]=useState()
	const runtimeList=[{ key: 1, value: "python"}]
	const runtimeVersionList=[{ key: 1, value: "3.9.10" }]
	const [runtime, setRuntime] = useState("python");
	const [runtimeVersion, setRuntimeVersion] = useState("3.9.10");
	const [loading, setLoading]= useState(true)

	const [runtimeListOpen, setRuntimeListOpen] = useState(false);
	const [runtimeVersionListOpen, setRuntimeVersionListOpen] = useState(false);
	
	// Alert trigger function
	function setAlert(title, type, delay){
		setAlertData({title:title,type:type})
		setAlertVisible(true)
		setTimeout(() => {
			setAlertVisible(false)
			}, delay);
	}

	function handleCloseList(){
		setRuntimeListOpen(false)
		setRuntimeVersionListOpen(false)
	}
	function handleCloseDropDown(){
        dispatch({type:"active_element/DROP_DOWN", payload:{key:"0"}})
        dispatch({type:"alert/SET_ALERT", payload:{is_hide:true, type:""}})
    }
	// Request API to create Action
	function handleSubmit(){
		let payload={name:name, description:description, runtime:runtime, runtime_version:runtimeVersion}
		axios.post(config.METROGRAPH_API+"/action", payload, { headers: {Authorization: mystate.user.token} })
			.then((res) => {
			let action=res.data.payload.action
			dispatch({type:"action/ADD",payload:action})
			navigate("/edit-action/"+action.uuid, {action: action})
				})
			.catch(() => {setAlert("400, Bad request", "error", 3000)});
	}
	
	return (
		<AuthCheck>
			<div onClick={()=>{handleCloseList();handleCloseDropDown()}} className="bg-black min-h-screen noselect">
				<div className="mx-20 relative">
					{alertVisible &&
						<div className="flex justify-center w-full absolute top-12">
							<Alert
								alertData={alertData}
								onHide={() => setAlertVisible(false)}
							/>
						</div>
					}
					<TopBar/>
					<div className="max-w-[1662px] w-full pt-[104px] pr-4">
						<div className="w-full">
							<div className="flex justify-between">
								<div className="font-light font-IBM-Plex-Sans text-[36px] text-white">
									Create an Action
								</div>
							</div>
						
						</div>
					</div>
					<div className="border-b-2 mt-[18px] border-[#2B2B2B] w-full"/>
					<FadeAnimation>
						<div className="flex mt-20 justify-center">
							<div className="lg:w-[993px] h-20">
								<div className="flex flex-col items-center space-y-[30px] pr-[46px]">
									<div className="flex w-full justify-between">
										<div className="w-[400px]">
											<MyInput key="title" title="TITLE" placeholder="Action name.." value={name} setValue={(e)=>setName(e)}/>
										</div>
										<div className="w-[400px]">
											<MyInput key="description" title="DESCRIPTION" placeholder="Description.." value={description} setValue={(e)=>setDescription(e)}/>
										</div>
									</div>
									<div className="flex w-full justify-between">
										<div className="w-[400px]">
											<DropDpwnList
											key="runtime"
											listOptions={runtimeList}
											title="RUNTIME"
											setValue={(e)=>setRuntime(e)}
											listOpen={runtimeListOpen}
											toogleList={(e)=>setRuntimeListOpen(e)}
											/>
										</div>
										<div className="w-[400px] z-10">
											<DropDpwnList
											key="version"
											listOptions={runtimeVersionList}
											title="VERSION"
											setValue={(e)=>setRuntimeVersion(e)}
											listOpen={runtimeVersionListOpen}
											toogleList={(e)=>setRuntimeVersionListOpen(e)}
											/>
										</div>
									</div>
									<div className="w-full justify-end  items-end flex space-x-[6px] pt-[30px]">
										<div onClick={()=>navigate("/action")} className="text-white font-IBM-Plex-Sans text-[10px] font-bold bg-[#545454] w-[92px] h-[35px] rounded-[9px] flex items-center justify-center cursor-pointer hover:bg-gray-400">
											CANCEL
										</div>
										{(!name || !description) &&
										<div className="text-white font-IBM-Plex-Sans text-[10px] font-bold bg-[#7900FF] w-[92px] h-[35px] rounded-[9px] flex items-center justify-center cursor-not-allowed opacity-50">
											CREATE
										</div>
										}
										{(name && description) &&
										<div onClick={()=>handleSubmit()} className="text-white font-IBM-Plex-Sans text-[10px] font-bold bg-[#7900FF] w-[92px] h-[35px] rounded-[9px] flex items-center justify-center cursor-pointer hover:bg-purple-600">
											CREATE
										</div>
										}
									</div>
								</div>
							</div>
						</div>
					</FadeAnimation>
				</div>
			</div>
		</AuthCheck>
	);
}
