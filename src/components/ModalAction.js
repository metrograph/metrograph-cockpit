// React imports
import { useDispatch, useSelector } from "react-redux"

// External components
import axios from "axios"

// Internal components
import { config } from "../config"

export default function ModalAction(props){
    const mystate = useSelector((state)=>state)
    const dispatch = useDispatch()
    function handleCancel(){
        dispatch({type:"modal_action/SET",payload:{is_hide: true, action:{}}})
    }

    function handleDelete(){
        axios.delete(config.METROGRAPH_API+"/action/"+props.action.uuid, {headers: { Authorization: mystate.user.token }})
			.then(response=>{

                console.log(response)
                dispatch({type:"action/DELETE",payload:{uuid:props.action.uuid}})
                dispatch({type:"alert/SET_ALERT",payload:{title:response.data.message, is_hide:false, type:"success"}})
                setTimeout(() => {  dispatch({type:"alert/SET_ALERT",payload:{title:"", is_hide:true, type:""}})
                }, 3000);
                handleCancel()
            }).catch(error=>{
                dispatch({type:"alert/SET_ALERT",payload:{title:error.data.message, is_hide:false, type:"error"}})
                setTimeout(() => {  dispatch({type:"alert/SET_ALERT",payload:{title:"", is_hide:true, type:""}})
                handleCancel()
                }, 3000);
        })
        
    }

    return (
        <div className="bg-black/60 min-h-screen grid place-content-center">
            <div className="bg-[#070707] flex flex-col border-2 border-[#2B2B2B] h-[450px] w-[800px] rounded-xl px-12 py-4">
                <div className="text-white text-[28px] mt-12 font-regular font-IBM-Plex-Sans">
                   Are you sure you want to delete this Action ?
                </div>
                <div className="flex flex-col mt-12 grow">
                    <div className="text-white font-regular text-[22px] font-IBM-Plex-Sans">{props.action.name}</div>
                    <div className="text-[#7A7A7A] font-regular text-[16px] font-IBM-Plex-Sans">{props.action.description}</div>
                </div>
                <div className="flex justify-end space-x-4">
                    <div className="">
                        <div onClick={()=>handleCancel()} className="text-white font-IBM-Plex-Sans text-[10px] font-bold bg-[#545454] w-[80px] h-[35px] rounded-[9px] flex items-center justify-center cursor-pointer hover:bg-gray-600">
                            CANCEL
                        </div>
                    </div>
                    <div className="">
                        <div onClick={()=>handleDelete()}  className="text-white font-IBM-Plex-Sans text-[10px] font-bold bg-red-400 w-[80px] h-[35px] rounded-[9px] flex items-center justify-center cursor-pointer hover:bg-red-600">
                            CONFIRM
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
}