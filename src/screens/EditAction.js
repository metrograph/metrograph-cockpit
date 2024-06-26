// React imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useParams, useNavigate, useLocation } from "react-router-dom";

// Ace editor imports
import CodeEditor from "../components/CodeEditor";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/python";

// Icons imports
import i_icon from "../assets/icons/i.svg";

// External components
import Modal from 'react-bootstrap/Modal'
import Placeholder from 'react-bootstrap/Placeholder'
import axios from "axios";
import FadeAnimation from "../components/Animations/FadeAnimation";

// Internal components
import DropDpwnList from "../components/DropDownList";
import MyInput from "../components/MyInput";
import ModelSchedule from "../components/ModalSchedule";
import Alert from "../components/Alert";
import TopBar from "../components/TopBar"
import {config} from "../config"
import AuthCheck from "../components/AuthCheck";
import { useRef } from "react";


function Title(props){
	if(props.loading)return(
		<Placeholder  animation="glow">
			<Placeholder xs={6} style={{width:"400px", height:"40px", borderRadius:"10px"}} />
		</Placeholder>
	)
	else if(!props.loading) return (
		<div className="font-light font-IBM-Plex-Sans text-[36px] text-white">
			{props.title}
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
        as={ModelSchedule}
        actionCode={props.actionCode}
		getSchedulesFromApi={()=>props.getSchedulesFromApi()}
		setAlert={(title, type, delay)=>props.setAlert(title, type, delay)}
        show={props.show}
        onHide={() => props.onHide()}
        />
    </Modal>
  );
}

function Schedule(props){
	if(props.schedule.weeks) return (
	<div className="px-4 h-[42px] border-2 border-[#3F3F3F] rounded-[15px] flex space-x-2 items-center">
		<div className="text-[12px] font-IBM-Plex-Sans font-bold text-white">
			EVERY
		</div>
		<div className="px-2 h-[22px] bg-[#7ECA9C] grid place-content-center rounded-[11px]">
			<div className="text-[11px] font-IBM-Plex-Sans font-bold text-white">
			{props.schedule.weeks} WEEKS
			</div>
		</div>
		<div className="text-[12px] font-IBM-Plex-Sans font-bold text-white">
			AT
		</div>
		<div className="px-2 h-[22px] bg-[#7ECA9C] grid place-content-center rounded-[11px]">
			<div className="text-[11px] font-IBM-Plex-Sans font-bold text-white">
			{props.schedule.at}
			</div>
		</div>
	</div>
	)
	else if(props.schedule.days) return (
		<div className="px-4 h-[42px] border-2 border-[#3F3F3F] rounded-[15px] flex space-x-2 items-center">
			<div className="text-[12px] font-IBM-Plex-Sans font-bold text-white">
				EVERY
			</div>
			<div className="px-2 h-[22px] bg-[#7ECA9C] grid place-content-center rounded-[11px]">
				<div className="text-[11px] font-IBM-Plex-Sans font-bold text-white">
				{props.schedule.days} Days
				</div>
			</div>
			<div className="text-[12px] font-IBM-Plex-Sans font-bold text-white">
				AT
			</div>
			<div className="px-2 h-[22px] bg-[#7ECA9C] grid place-content-center rounded-[11px]">
				<div className="text-[11px] font-IBM-Plex-Sans font-bold text-white">
				{props.schedule.at}
				</div>
			</div>
		</div>
		)
	else if(props.schedule.hours) return (
		<div className="px-4 h-[42px] border-2 border-[#3F3F3F] rounded-[15px] flex space-x-2 items-center">
			<div className="text-[12px] font-IBM-Plex-Sans font-bold text-white">
				EVERY
			</div>
			<div className="px-2 h-[22px] bg-[#7ECA9C] grid place-content-center rounded-[11px]">
				<div className="text-[11px] font-IBM-Plex-Sans font-bold text-white">
				{props.schedule.hours} Hours
				</div>
			</div>
			<div className="text-[12px] font-IBM-Plex-Sans font-bold text-white">
				AT
			</div>
			<div className="px-2 h-[22px] bg-[#7ECA9C] grid place-content-center rounded-[11px]">
				<div className="text-[11px] font-IBM-Plex-Sans font-bold text-white">
				{props.schedule.at}
				</div>
			</div>
		</div>
	)
	else if(props.schedule.minutes) return (
		<div className="px-4 h-[42px] border-2 border-[#3F3F3F] rounded-[15px] flex space-x-2 items-center">
			<div className="text-[12px] font-IBM-Plex-Sans font-bold text-white">
				EVERY
			</div>
			<div className="px-2 h-[22px] bg-[#7ECA9C] grid place-content-center rounded-[11px]">
				<div className="text-[11px] font-IBM-Plex-Sans font-bold text-white">
				{props.schedule.minutes} Minutes
				</div>
			</div>
			<div className="text-[12px] font-IBM-Plex-Sans font-bold text-white">
				AT
			</div>
			<div className="px-2 h-[22px] bg-[#7ECA9C] grid place-content-center rounded-[11px]">
				<div className="text-[11px] font-IBM-Plex-Sans font-bold text-white">
				{props.schedule.at}
				</div>
			</div>
		</div>
	)
	else if(props.schedule.seconds) return (
		<div className="px-4 h-[42px] border-2 border-[#3F3F3F] rounded-[15px] flex space-x-2 items-center">
			<div className="text-[12px] font-IBM-Plex-Sans font-bold text-white">
				EVERY
			</div>
			<div className="px-2 h-[22px] bg-[#7ECA9C] grid place-content-center rounded-[11px]">
				<div className="text-[11px] font-IBM-Plex-Sans font-bold text-white">
				{props.schedule.seconds} Seconds
				</div>
			</div>
		</div>
	)
	else return <div></div>
}

function ScheduleList(props){
	return (
		<div className="flex space-x-4">
			{props.scheduleList.map((element)=> {
			return <Schedule
						key={element.uuid}
						schedule={element}
					/>
			})}
		</div>
		)
}

export default function EditAction() {
	// Global state
	const dispatch = useDispatch();
	const mystate = useSelector((state) => state);
	const navigate=useNavigate()
	
	// Inputs local state
	const [actionCode, setActionCode]=useState({uuid:useParams().uuid})
	const [title, setTitle]=useState()
	const [description, setDescription]=useState()
	const runtimeList=[{ key: 1, value: "python"}]
	const runtimeVersionList=[{ key: 1, value: "3.9.10" }]
	const [runtime, setRuntime] = useState("python");
	const [runtimeVersion, setRuntimeVersion] = useState("3.9.10");
	const [scheduleList, setScheduleList]=useState([])

	// Alert local state
	const [alertVisible, setAlertVisible]= useState(false)
	const [alertData, setAlertData]=useState()

	// Inputs UI local state
	const [runtimeListOpen, setRuntimeListOpen] = useState(false);
	const [runtimeVersionListOpen, setRuntimeVersionListOpen] = useState(false);
	const [urlCheckBox, setUrlCheckBox] = useState(true);
	const [modalVisible, setModalVisible] = useState(false);
	const [loading, setLoading]=useState(true)
	const [topbarListOpen, setTopbarListOpen]=useState(false)

	// Alert trigger function
	function setAlert(title, type, delay){
		setAlertData({title:title,type:type})
		setAlertVisible(true)
		setTimeout(() => {
			setAlertVisible(false)
			}, delay);
	}

	// Request API to update Action
	function handleSave(){
		axios.patch(config.METROGRAPH_API+"/action/"+actionCode.uuid,{name: title, description: description, runtime: runtime, runtime_version: runtimeVersion} ,{ headers: {Authorization: mystate.user.token} })
		.then((res) => {
			setActionCode(res.data.payload.action)
			setAlert(res.data.message,"success",3000)
			
		})
		.catch((error) => {
			if(error.response?.status===401){
				localStorage.removeItem("METROGRAPH_STORAGE")
				return navigate("/login")
			}
			else setAlert("400, Bad request", "error", 3000)});
	}
	
	function handleCloseList(){
		setTopbarListOpen(false)
		setRuntimeListOpen(false)
		setRuntimeVersionListOpen(false)
	}

	function handleAddSchedule(){
		setModalVisible(true)
	}
	
	function filterScheduleAction(list){
		let tempList=[]
		list.forEach(element => {
			if (element.action_uuid===actionCode.uuid) 
				tempList.push(element)
		});
		setScheduleList(tempList)
	}

	function getActionCodeFromApi(token){
		axios.get(config.METROGRAPH_API+"/action/"+actionCode.uuid, {headers: { Authorization: token },})
				.then(response=>{
					setActionCode(response.data.payload.ActionCode)
				}).catch((error) => {
					setLoading(false)
					if(error.response?.status===401){
						localStorage.removeItem("METROGRAPH_STORAGE")
						return navigate("/login")
					}
					else setAlert("400, Bad request", "error", 3000)});
	}
	
	function getSchedulesFromApi(token){
		axios.get(config.METROGRAPH_API+"/schedule", {headers: { Authorization: token },})
			.then(response=>{
				filterScheduleAction(response.data.payload.schedules)
				setLoading(false)
			}).catch((error) => {
				setLoading(false)
				if(error.response?.status===401){
					localStorage.removeItem("METROGRAPH_STORAGE")
					return navigate("/login")
				}
				else setAlert("400, Bad request", "error", 3000)});
	}

	useEffect(() => {
		function loadData() {
			getActionCodeFromApi(mystate.user.token)
			getSchedulesFromApi(mystate.user.token)
		}
		if(mystate.user.token) loadData();
		if(actionCode.name!==""){
			setTitle(actionCode.name)
			setDescription(actionCode.description)
			setRuntime(actionCode.runtime)
			setRuntimeVersion(actionCode.runtime_version)
		}
	}, [actionCode, dispatch, navigate, loading, mystate.user.token]);

	return (
		<AuthCheck>
			<div onClick={()=>handleCloseList()} className="bg-black min-h-screen noselect flex justify-center pb-24 px-12">
				<div className="mx-20 w-full relative">
					<TopBar listOpen={topbarListOpen} setListOpen={(e)=>setTopbarListOpen(e)}/>
					<MyModal
						show={modalVisible}
						onHide={() => setModalVisible(false)}
						actionCode={actionCode}
						setAlert={(title, type, delay)=>setAlert(title, type, delay)}
						getSchedulesFromApi={()=>getSchedulesFromApi(mystate.user.token)}
					/>
					{alertVisible &&
						<div className="flex justify-center w-full absolute top-24">
							<Alert
								alertData={alertData}
								onHide={() => setAlertVisible(false)}
							/>
						</div>
					}
					{/* Header */}
					<FadeAnimation>
					<div className="pt-[104px]">
						<div className="flex justify-between">
							<Title title={title} loading={loading} />
							<div className="justify-end flex space-x-[6px] pt-[30px]">
								<div onClick={()=>navigate("/action")} className="text-white font-IBM-Plex-Sans text-[10px] font-bold bg-[#545454] w-[92px] h-[35px] rounded-[9px] flex items-center justify-center cursor-pointer hover:bg-gray-400">
								CANCEL
								</div>
								{(!title || !description) &&<div className="opacity-50 text-white font-IBM-Plex-Sans text-[10px] font-bold bg-[#7900FF] w-[92px] h-[35px] rounded-[9px] flex items-center justify-center cursor-not-allowed">
								SAVE
								</div>}
								{(title && description) &&<div onClick={()=>handleSave()} className="text-white font-IBM-Plex-Sans text-[10px] font-bold bg-[#7900FF] w-[92px] h-[35px] rounded-[9px] flex items-center justify-center cursor-pointer hover:bg-purple-600">
								SAVE
								</div>}
							</div>
						</div>
						<div className="border-b-2 mt-[18px] mb-[39px] border-[#2B2B2B] w-full" />
					</div>
					
					{/* Action configuration */}
					<div>
						<div className="flex space-x-8">
							<MyInput key="title" title="TITLE" placeholder="Action name.." value={title} setValue={(e)=>setTitle(e)}/>
							<MyInput key="description" title="DESCRIPTION" placeholder="Description.." value={description} setValue={(e)=>setDescription(e)}/>
							<DropDpwnList
								key="runtime"
								listOptions={runtimeList}
								title="RUNTIME"
								setValue={(e)=>setRuntime(e)}
								listOpen={runtimeListOpen}
								toogleList={(e)=>setRuntimeListOpen(e)}
							/>
							<DropDpwnList
								key="version"
								listOptions={runtimeVersionList}
								title="VERSION"
								setValue={(e)=>setRuntimeVersion(e)}
								listOpen={runtimeVersionListOpen}
								toogleList={(e)=>setRuntimeVersionListOpen(e)}
							/>
						</div>
						<div className="flex space-x-[40px]  mt-[40px] items-center">
							<div className="flex space-x-2 w-[165px] justify-between items-center">
								<div
								onClick={() => setUrlCheckBox(!urlCheckBox)}
								className={
									urlCheckBox
									? "w-[16px] h-[16px] rounded-[5px] bg-[#7900FF] border-2 border-[#272727] cursor-pointer"
									: "w-[16px] h-[16px] rounded-[5px] border-2 border-[#272727] cursor-pointer"
								}
								>
								</div>
								<div className="text-white font-IBM-Plex-Sans font-bold text-[12px]">
								ENABLE ACTION URL
								</div>
								<img src={i_icon} height="11px" width="11px" alt="icon"/>
							</div>
							<div className="flex items-center space-x-[10px]">
								<div className="bg-[#7ECA9C] h-[17px] w-[39px] grid place-content-center">
								<div className=" text-[10px] font-IBM-Plex-Sans font-bold text-white">
									LIVE
								</div>
								</div>
								<div className="text-[#AC62FF] font-IBM-Plex-Sans font-medium text-[14px] cursor-pointer">
								{"http://metrpgraph.io/action/"+actionCode.uuid}
								</div>
							</div>
						</div>

						{/* Schedule section */}
						<div className="mt-[44px]">
							<div className="text-white font-bold font-IBM-Plex-Sans text-[11px]">
								SCHEDULE TASK
							</div>
							<div className="flex mt-[10px]">
								<div onClick={(e)=>{handleAddSchedule()}} className="w-[146px] h-[42px] bg-[#2B2B2B] grid place-content-center rounded-[9px] hover:bg-gray-400 cursor-pointer mr-4">
									<div className="text-white font-IBM-Plex-Sans font-bold text-[12px]">
										ADD SCHEDULE
									</div>
								</div>
								<ScheduleList scheduleList={scheduleList}/>
							</div>
						</div>
					</div>
					
					{/* Action code editor*/}
					<div className="mt-12">
						<div className="font-IBM-Plex-Sans font-bold text-[11px] mb-[10px] text-white">
						ACTION CODE
						</div>
						<CodeEditor
							actionCode={actionCode}
							setAlert={(title, type, delay)=>setAlert(title, type, delay)}
						/>
					</div>
					</FadeAnimation>
				</div>
			</div>
		</AuthCheck>
	);
}
