// React imports
import React, {useEffect, useRef, useState} from "react"
import {useSelector, useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom";

// Icons imports
import Alert from "../components/Alert"

// External components
import axios from "axios";
import Modal from 'react-bootstrap/Modal'
import Placeholder from 'react-bootstrap/Placeholder'
import {motion} from "framer-motion"
import ScaleAnimation from "../components/Animations/ScaleAnimation";
import AuthCheck from "../components/AuthCheck";

// Internal components
import ModalAction from "../components/ModalAction";
import TopBar from "../components/TopBar"
import {config} from "../config"

function MyModal(props) {
    return (
      <Modal
        {...props}
        size="sm"
        centered
      >
        <Modal.Body
            as={ModalAction}
            setAlert={(title, type, delay)=>props.setAlert(title, type, delay)}
            action={props.action}
            show={props.show}
            onHide={() => props.onHide()}/>
      </Modal>
    );
}

function ActionRowPlaceholder(){
    return(
        <div>
            <div className="flex justify-between items-center w-full h-[114px] bg-[#070707] px-4">
                <div className="flex flex-col w-3/5">
                    <Placeholder  animation="glow">
                        <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder  animation="glow">
                        <Placeholder xs={3} /> <Placeholder xs={4} />
                    </Placeholder>
                </div>
                <div className="flex justify-between w-2/5">
                    <div className="w-2/5">
                        <Placeholder  animation="glow">
                            <Placeholder xs={10} style={{height:"40px"}}/>
                        </Placeholder> 
                    </div>
                    <div className="w-1/5 flex justify-center items-center">
                        <Placeholder  animation="glow">
                            <Placeholder  style={{height:"20px", width:"20px", borderRadius:"100%"}}/>
                        </Placeholder> 
                    </div>
                    <div className="flex justify-end w-1/2">
                        <div className="w-[100px]">
                            <Placeholder  animation="glow">
                                <Placeholder xs={10} style={{height:"40px"}}/>
                            </Placeholder> 
                        </div>
                        <div className="w-[100px]">
                            <Placeholder  animation="glow">
                                <Placeholder xs={10} style={{height:"40px"}}/>
                            </Placeholder> 
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="border-b-[1px] border-[#202020] w-full" />
        </div>
    )
}

function ActionList(props){
    if(props.loading) return <ActionRowPlaceholder/>    
    else if(props.actionList.length)
        return(
            <div className="">
                {props.actionList.map((element)=> {
                    return <ActionRow
                                key={element.uuid}
                                element={element}
                                show={props.show}
                                onVisible={() => props.onVisible()}
                                setActionCode={(e) => props.setActionCode(element)}
                                navigate={(e)=>props.navigate(e)}
                            />
                    })}
                <div className="border-b-2 mt-2 border-[#2B2B2B] w-full" />
            </div>
        )
    else return<div onClick={()=>props.navigate("/create-action")} className="mt-12 mx-4 font-IBM-Plex-Sans text-lg text-white cursor-pointer">Create new Action to manage</div>
}

function ActionRow(props){
    function handleManage(){
        props.navigate("/edit-action/"+props.element.uuid)
    }

    function handleConfirmDelete(){
        props.setActionCode()
        props.onVisible()
    }

    return (
        <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration:1.2}}
        >
            <div className="flex justify-between items-center w-full h-[114px] bg-[#070707] px-4">
            <div onClick={()=>handleManage()} className="flex flex-col grow cursor-pointer">
                <div className="text-white font-regular text-[20px] font-IBM-Plex-Sans">{props.element.name}</div>
                <div className="text-[#7A7A7A] font-regular text-[14px] font-IBM-Plex-Sans">{props.element.description}</div>
            </div>
            <div className="flex space-x-40">
                <div className=" bg-[#202020] px-6 flex items-center text-center">
                    <div className="text-white font-bold text-[12px]">{props.element.runtime} {props.element.runtime_version} </div>
                </div>
               {false && <div className="flex space-x-2 items-center">
                    <div className="bg-[#7ECA9C]  rounded-full h-[9px] w-[9px]"></div>
                    <div className="text-white font-medium font-IBM-Plex-Sans text-[10px]">Next Run in 4h39min</div>
                </div>}
                {true && <div className="flex space-x-2 items-center">
                    <div className="bg-[#2B2B2B]  rounded-full h-[9px] w-[9px]"></div>
                    <div className="text-white font-medium font-IBM-Plex-Sans text-[10px]">N/A</div>
                </div>}
                <div className="flex space-x-4">
                <div className="">
                    <div onClick={()=>handleConfirmDelete()} className="text-white font-IBM-Plex-Sans text-[10px] font-bold bg-red-400 w-[80px] h-[35px] rounded-[9px] flex items-center justify-center cursor-pointer hover:bg-red-600">
                         DELETE
                    </div>
                </div>
                <div className="">
                    <div onClick={()=>handleManage()} className="text-white font-IBM-Plex-Sans text-[10px] font-bold bg-[#7900FF] w-[80px] h-[35px] rounded-[9px] flex items-center justify-center cursor-pointer hover:bg-purple-600">
                         MANAGE
                    </div>
                </div>
                </div>
            </div>
            
        </div>
        <div className="border-b-[1px] border-[#202020] w-full" />
        </motion.div>
    )
}

export default function Action(){
    // Global state
    const mystate =useSelector((state)=>state)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    // Alert local state
    const [alertVisible, setAlertVisible]= useState(false)
    const [alertData, setAlertData]=useState()
    
    // Modal local state
    const [modalVisible, setModalVisible]= useState(false)
    const [ActionCode, setActionCode]=useState()
    
    const [loading, setloading]=useState(true)
    const [topbarListOpen, setTopbarListOpen]=useState(false)
    
    // Alert trigger function
	function setAlert(title, type, delay){
		setAlertData({title:title,type:type})
		setAlertVisible(true)
		setTimeout(() => {
			setAlertVisible(false)
			}, delay);
	}

    function handleCloseDropDown(){
        setTopbarListOpen(false)
    }

    function getActions() {
        axios.get(config.METROGRAPH_API+"/action", {headers: { Authorization: mystate.user.token }})
        .then(response=>{
            dispatch({type:"action/SET",payload:response.data.payload.actions})
            setloading(false)
        }).catch((error) => {
        if(error.response.status===401){
            localStorage.removeItem("METROGRAPH_STORAGE")
            return navigate("/login")
        }
      });
        
      }
    useEffect(()=>{
        if(mystate.user.token) getActions();
    },[loading, dispatch, navigate,mystate.user.token])

    return (
        <AuthCheck>
            <div onClick={()=>handleCloseDropDown()} className="bg-black min-h-screen relative noselect">
                <MyModal
                    setAlert={(title, type, delay)=>setAlert(title, type, delay)}
                    action={ActionCode}
                    show={modalVisible}
                    onHide={() => setModalVisible(false)}
                />
                <div className="mx-20 pb-20 relative">
                    <TopBar listOpen={topbarListOpen} setListOpen={(e)=>setTopbarListOpen(e)}/>
                    {alertVisible && <div className="flex justify-center w-full absolute top-28">
                            <Alert
                                alertData={alertData}
                                onHide={() => setAlertVisible(false)}
                            />
                        </div>}
                    {/* page title */}
                    <div className="w-full pt-[104px] pr-4">
                        <div className="w-full">
                            <div className="flex justify-between">
                                <div className="font-light font-IBM-Plex-Sans text-[36px] text-white">
                                    Actions
                                </div>
                                <ScaleAnimation>
                                <div onClick={()=>navigate("/create-action")} className="justify-end flex space-x-[6px] pt-[30px]">
                                    <div className="text-white font-IBM-Plex-Sans text-[10px] font-bold bg-[#7ECA9C] w-[109px] h-[35px] rounded-[9px] flex items-center justify-center cursor-pointer">
                                    CREATE ACTION
                                    </div>
                                </div>
                                </ScaleAnimation>
                            </div>
                        
                        </div>
                    </div>
                    <div className="border-b-2 mt-[18px] border-[#2B2B2B] w-full" />
                    {/* page end */}
                    
                    {/* Actions list start */}
                    <ActionList
                        actionList={mystate.actions}
                        show={modalVisible}
                        onVisible={() => setModalVisible(true)}
                        setActionCode={(e) => setActionCode(e)}
                        navigate={(e)=>navigate(e)}
                        loading={loading}    
                    />
                    {/* Actions list end */}
                </div>
            </div>
        </AuthCheck>
    )
}