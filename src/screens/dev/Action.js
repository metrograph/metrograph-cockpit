import React,{useEffect, useState} from "react"
import axios from "axios"
import { useSelector,useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/dev/TopBar"

let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiZWhhbXphIn0sInRpbWUiOiIxNjUzNjY0MjY3LjA1ODAzMSJ9.0cXDjsGeWZ4PEIeiqagcF8B1VsmdMdat3-GZPKId5To"
let hostname="http://195.201.146.87:80/v1"

function ActionRow(props){
    const dispatch = useDispatch()
    const navigate = useNavigate();
    
    function handleManage(){
        dispatch({type:"action_code/SET",payload:props.element})
        navigate("/edit-action/"+props.element.uuid)
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
                <div className="">
                    <div onClick={()=>handleManage()} className="text-white font-IBM-Plex-Sans text-[10px] font-bold bg-[#7900FF] w-[80px] h-[35px] rounded-[9px] flex items-center justify-center cursor-pointer hover:bg-purple-600">
                         MANAGE
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

    useEffect(()=>{
        window.scrollTo(0, 0);
        if (!mystate.actions.length) {
            
			axios.get(hostname+"/action", {headers: { Authorization: token }})
			.then(response=>{
				console.log(response.data.payload.actions)
				let data = response.data.payload.actions;
				dispatch({type:"action/SET",payload:data})
        }).catch(error=>console.log(error))
	
		}
    },[mystate.actions])

    return (
        <div className="bg-black min-h-screen">
            <div className="container mx-auto pb-20">
                <TopBar/>
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
        </div>
    )
}