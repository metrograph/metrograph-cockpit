// React imports
import React, {useEffect, useRef, useState} from "react"
import {useSelector, useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom";

// Icons imports
import Alert from "../components/Alert"

// External components
import axios from "axios";
import Modal from 'react-bootstrap/Modal'

// Internal components
import ModalAction from "../components/ModalAction";
import TopBar from "../components/TopBar"
import {config} from "../config"

function ActionRow(props){
    const dispatch = useDispatch()
    const navigate = useNavigate();
    
    function handleManage(){
        dispatch({type:"action_code/SET",payload:props.element})
        navigate("/edit-action/"+props.element.uuid)
    }

    function handleConfirmDelete(){
        props.setActionCode()
        props.onVisible()
    }

    return (
        <div>
            <div className="flex justify-between items-center w-full h-[114px] bg-[#070707] px-4">
            <div className="flex flex-col grow">
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
            as={ModalAction}
            setAlertVisible={(e)=>props.setAlertVisible(e)}
            setAlertData={(title, type)=>props.setAlertData(title, type)}
            action={props.action}
            show={props.show}
            onHide={() => props.onHide()}/>
      </Modal>
    );
  }

export default function Action(){

    const mystate =useSelector((state)=>state)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [alertVisible, setAlertVisible]= useState(false)
    const [alertData, setAlertData]=useState()
    const [modalVisible, setModalVisible]= useState(false)
    const [ActionCode, setActionCode]=useState()
    const loading=useRef(true)
    
    function handleCloseDropDown(){
        dispatch({type:"active_element/DROP_DOWN", payload:{key:"0"}})
        dispatch({type:"alert/SET_ALERT", payload:{is_hide:true, type:""}})
    }

    useEffect(()=>{
        window.scrollTo(0, 0);
        dispatch({type:"active_element/SET", payload:{}})
        dispatch({type:"code_editor/SET", payload:{selectedFile:{path :"", name :"",content :null},openedFiles:[]}})
        dispatch({type:"setFileExplorer", payload:{}})
        function loadLocalStorage() {
            const localstorage = localStorage.getItem("METROGRAPH_STORAGE");
            const data = JSON.parse(localstorage);
            if (data) {
                dispatch({ type: "user/SET", payload: data });
               if(data.user.token)
                {
                    axios.get(config.METROGRAPH_API+"/action", {headers: { Authorization: data.user.token }})
                    .then(response=>{
                        loading.current=false   
                        dispatch({type:"action/SET",payload:response.data.payload.actions})
                    }).catch((error) => {
                    if(error.response.status===401){
                        localStorage.removeItem("METROGRAPH_STORAGE")
                        return navigate("/login")
                    }
                  });
          }
            }
            else return navigate("/login")
          }
        loadLocalStorage();
       
    },[loading, dispatch, navigate])

    return (
        <div onClick={()=>handleCloseDropDown()} className="bg-black min-h-screen relative noselect">
            <MyModal
                setAlertVisible={(e)=>setAlertVisible(e)}
                setAlertData={(title, type)=>setAlertData(title, type)}
                action={ActionCode}
                show={modalVisible}
                onHide={() => setModalVisible(false)}
            />
            <div className="mx-20 pb-20 relative">
                <TopBar/>
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
                            <div onClick={()=>navigate("/create-action")} className="justify-end flex space-x-[6px] pt-[30px]">
                                <div className="text-white font-IBM-Plex-Sans text-[10px] font-bold bg-[#7ECA9C] w-[109px] h-[35px] rounded-[9px] flex items-center justify-center cursor-pointer hover:bg-green-600">
                                CREATE ACTION
                                </div>
                            </div>
                        </div>
                    
                    </div>
                </div>
                <div className="border-b-2 mt-[18px] border-[#2B2B2B] w-full" />
                 {/* page end */}
                
                {/* Actions list start */}
                <div className="">
                    {mystate.actions.map((element)=> {
                        return <ActionRow
                                    key={element.uuid}
                                    element={element}
                                    show={modalVisible}
                                    onVisible={() => setModalVisible(true)}
                                    setActionCode={() => setActionCode(element)}
                                />
                        })}
                    <div className="border-b-2 mt-2 border-[#2B2B2B] w-full" />
                
                </div>
                {/* Actions list end */}
            </div>
        </div>
    )
}