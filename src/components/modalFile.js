// React imports
import axios from "axios"
import {useDispatch, useSelector} from "react-redux"

// Icons imports
import closeIcon from "../assets/icons/close.svg"

// Internal components
import File from "./File";
import ActionCodeBuilder from "./ActionCodeBuilder";
import {config} from "../config"

// External components
import {getIconForFile, getIconForFolder} from 'vscode-icons-js';

export default function ModalFile(props){
    const dispatch = useDispatch()
    const mystate = useSelector((mystate)=>mystate)
    function handleCancel(){
        props.onHide()
    }

    function handleDeleteFile(){
        axios.delete(config.METROGRAPH_API+"/actioncode/"+props.actionCode.uuid+"/file", { headers: {Authorization: mystate.user.token},data:{path:props.file.path} })
        .then((response) => {
			ActionCodeBuilder.delete(mystate.file_explorer, props.file.path);
			dispatch({type:"setFileExplorer",payload:mystate.file_explorer})
			dispatch({type:"activeElementContextMenu", payload:{path:""}})
            dispatch({type:"code_editor/CLOSE_FILE",payload:{path:props.file.path}})
            dispatch({type:"code_editor/LOAD_LAST_FILE_CONTENT",payload:{file:props.file}})
            handleCancel()
            props.setAlert(response.data.message, "success", 3000)
        })
        .catch((error) => {
            handleCancel()
            props.setAlert(error.data.message, "success", 3000)
        });
        
    }
    function handleDeleteFolder(){
        axios.delete(config.METROGRAPH_API+"/actioncode/"+props.actionCode.uuid+"/folder", { headers: {Authorization: mystate.user.token},data:{path:props.file.path} })
        .then((response) => {
			ActionCodeBuilder.delete(mystate.file_explorer, props.file.path);
			dispatch({type:"setFileExplorer",payload:mystate.file_explorer})
			dispatch({type:"activeElementContextMenu", payload:{path:""}})
            handleCancel()
            props.setAlert(response.data.message, "success", 3000)
        })
        .catch((error) => {
            handleCancel()
            props.setAlert(error.data.message, "success", 3000)
        });
    }

    return (
        <div className="bg-black/60 grid place-content-center">
            <div className="bg-[#121212] flex flex-col border-2 border-[hsl(0,0%,14%)] h-[454px] w-[650px] rounded-[22px] px-12 py-[47px] relative">
                <div onClick={()=>handleCancel()} className="absolute top-[28px] right-[30px] cursor-pointer bg-[#262626] hover:bg-gray-400 h-[28px] w-[28px] grid place-content-center rounded-full">
                    <img src={closeIcon} className="h-[10px] w-[10px]" alt="close_icon"/>
                </div>
                <div className="text-white text-[20px] mt-12 font-regular font-IBM-Plex-Sans">
                   {props.file instanceof File?"Are you sure you want to delete this File ?":"Are you sure you want to delete this Folder ?"}
                </div>
                <div className="flex flex-col mt-12 grow">
                    <div className="flex items-center space-x-2">
                        {props.file instanceof File && <img src={require("../assets/vsicons/"+getIconForFile(props.file.name))} className="w-[20px] h-[20px]" alt="" />}
                        {!(props.file instanceof File) && <img src={require("../assets/vsicons/"+getIconForFolder(props.file.name))} className="w-[20px] h-[20px]" alt="" />}
                        <div className="text-white font-regular text-[22px] font-IBM-Plex-Sans">{props.file.name}</div>
                    </div>
                    <div className="text-[#7A7A7A] font-regular text-[16px] font-IBM-Plex-Sans">{props.file.path}</div>
                </div>
                <div className="flex justify-end space-x-4">
                    <div className="">
                        <div onClick={()=>handleCancel()} className="text-white font-IBM-Plex-Sans text-[10px] font-bold bg-[#545454] w-[80px] h-[35px] rounded-[9px] flex items-center justify-center cursor-pointer hover:bg-gray-600">
                            CANCEL
                        </div>
                    </div>
                    <div className="">
                        <div onClick={()=>{props.file instanceof File?handleDeleteFile(): handleDeleteFolder()}}  className="text-white font-IBM-Plex-Sans text-[10px] font-bold bg-red-400 w-[80px] h-[35px] rounded-[9px] flex items-center justify-center cursor-pointer hover:bg-red-600">
                            CONFIRM
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
}