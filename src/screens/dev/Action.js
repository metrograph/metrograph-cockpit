import React,{useEffect, useState} from "react"
import axios from "axios"
import { useSelector,useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import {config} from "../../config"
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import ModalAction from "../../components/dev/ModalAction";
import TopBar from "../../components/dev/TopBar"

function Alert(props){
    const dispatch = useDispatch();
    function handleCloseAlert(){
      dispatch({type:"alert/SET_ALERT",payload:{title:"", is_hide:true, type:""}})
    }
    if(props.type==="success")
      {
        return (
        <div className="h-[64px]  bg-[#ADEED6] w-full rounded-[10px] flex justify-between items-center px-[20px]">
          <div className="text-black font-[12px]">{props.title}</div>
          <CloseIcon onClick={()=>handleCloseAlert()} className="h-2 w-2 cursor-pointer" fill="black"/>
        </div>)
      }
    else if(props.type==="error")
    {
      return (
        <div className="h-[64px]  bg-red-400 w-full rounded-[10px] flex justify-between items-center px-[20px]">
          <div className="text-black font-[12px]">{props.title}</div>
          <CloseIcon onClick={()=>handleCloseAlert()} className="h-2 w-2 cursor-pointer" fill="black"/>
        </div>)
    }
}

function ActionRow(props){
    const dispatch = useDispatch()
    const navigate = useNavigate();
    
    function handleManage(){
        dispatch({type:"action_code/SET",payload:props.element})
        navigate("/edit-action/"+props.element.uuid)
    }

    function handleConfirmDelete(){
        dispatch({type:"modal_action/SET",payload:{is_hide: false, action:props.element}})
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

export default function Action(){
    const mystate =useSelector((state)=>state)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    let loading=true
    function handleCloseDropDown(){
        dispatch({type:"active_element/DROP_DOWN", payload:{key:"0"}})
        dispatch({type:"alert/SET_ALERT", payload:{is_hide:true, type:""}})
    }

    useEffect(()=>{
        window.scrollTo(0, 0);
        dispatch({type:"active_element/SET", payload:{}})
        dispatch({type:"code_editor/SET", payload:{selectedFile:{path :"", name :"",content :null},openedFiles:[]}})
        dispatch({type:"setFileExplorer", payload:{}})
        console.log("Home")
        function loadLocalStorage() {
            const localstorage = localStorage.getItem("METROGRAPH_STORAGE");
            const data = JSON.parse(localstorage);
            if (JSON.parse(localstorage)) {
                dispatch({ type: "user/SET", payload: data });
               if(data.user.token)
                {
                    axios.get(config.METROGRAPH_API+"/action", {headers: { Authorization: data.user.token }})
                    .then(response=>{
                        loading=false
                        dispatch({type:"action/SET",payload:response.data.payload.actions})
                        
                }).catch(error=>loading=false)
                }
            }
            else return navigate("/login")
          }
        loadLocalStorage();
       
    },[loading])

    return (
        <div onClick={()=>handleCloseDropDown()} className="bg-black min-h-screen relative noselect">
            <div className="container mx-auto pb-20 relative">
                <TopBar/>
                {!mystate.alert.is_hide &&
                <div className="flex justify-center w-full absolute top-28">
                    <Alert title={mystate.alert.title} type={mystate.alert.type}/>
                </div>}
                {/* page title */}
                <div className="max-w-[1662px] w-full pt-[104px] pr-4">
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
                        return <ActionRow key={element.uuid} element={element}/>
                        })}
                    
                    <div className="border-b-2 mt-2 border-[#2B2B2B] w-full" />
                
                </div>
                {/* Actions list end */}
            </div>
            {!mystate.modal_action.is_hide && <div className="absolute inset-0 w-full h-screen">
             <ModalAction action={mystate.modal_action.action}/>
            </div>}
        </div>
    )
}