// React imports
import { useDispatch, useSelector } from "react-redux"

// Icons imports
import closeIcon from "../assets/icons/close.svg"

// External components
import axios from "axios"

// Internal components
import { config } from "../config"

export default function ModalAction(props){
    const mystate = useSelector((state)=>state)
    const dispatch = useDispatch()

    
    function handleCancel(){
        props.onHide()
    }

    function handleDelete(){
        axios.delete(config.METROGRAPH_API+"/action/"+props.action.uuid, {headers: { Authorization: mystate.user.token }})
			.then(response=>{
                dispatch({type:"action/DELETE",payload:{uuid:props.action.uuid}})
                handleCancel()
                props.setAlert(response.data.message, "success", 3000)
            }).catch(error=>{props.setAlert(error.data.message, "error", 3000)})
    }

    if(!props.show) return <></>
    else return (
        <div className="bg-black/60 grid place-content-center">
            <div className="bg-[#121212] flex flex-col border-2 border-[hsl(0,0%,14%)] h-96 w-[650px] rounded-[22px] px-12 py-[47px] relative">
                <div onClick={()=>handleCancel()} className="absolute top-[28px] right-[30px] cursor-pointer bg-[#262626] hover:bg-gray-400 h-[28px] w-[28px] grid place-content-center rounded-full">
                    <img src={closeIcon} className="h-[10px] w-[10px]" alt="close_icon"/>
                </div>
                <div className="text-white text-[20px]  font-regular font-IBM-Plex-Sans">
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