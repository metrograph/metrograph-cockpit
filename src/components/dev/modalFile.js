import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { config } from "../../config"
import File from "./File";
import ActionCodeBuilder from "./ActionCodeBuilder";
import { getIconForFile, getIconForFolder, getIconForOpenFolder } from 'vscode-icons-js';

export default function ModalFile(props){
    const dispatch = useDispatch()
    const mystate = useSelector((mystate)=>mystate)
    function handleCancel(){
        dispatch({type:"modal_file/SET",payload:{is_hide: true, file:{}}})
    }

    function handleDeleteFile(){
        axios.delete(config.METROGRAPH_API+"/actioncode/"+mystate.actionCode.uuid+"/file", { headers: {Authorization: mystate.user.token},data:{path:props.file.path} })
        .then((response) => {
			ActionCodeBuilder.delete(mystate.file_explorer, props.file.path);
			dispatch({type:"setFileExplorer",payload:mystate.file_explorer})
			dispatch({type:"activeElementContextMenu", payload:{path:""}})
            dispatch({type:"code_editor/CLOSE_FILE",payload:{path:props.file.path}})
            dispatch({type:"code_editor/LOAD_LAST_FILE_CONTENT",payload:{file:props.file}})
            dispatch({type:"alert/SET_ALERT",payload:{title:response.data.message, is_hide:false, type:"success"}})
                setTimeout(() => {  dispatch({type:"alert/SET_ALERT",payload:{title:"", is_hide:true, type:""}})
                }, 3000);
                handleCancel()
        })
        .catch((error) => {
            dispatch({type:"alert/SET_ALERT",payload:{title:error.data.message, is_hide:false, type:"error"}})
                setTimeout(() => {  dispatch({type:"alert/SET_ALERT",payload:{title:"", is_hide:true, type:""}})
                handleCancel()
                }, 3000);
        });
        
    }
    function handleDeleteFolder(){
        axios.delete(config.METROGRAPH_API+"/actioncode/"+mystate.actionCode.uuid+"/folder", { headers: {Authorization: mystate.user.token},data:{path:props.file.path} })
        .then((response) => {
			ActionCodeBuilder.delete(mystate.file_explorer, props.file.path);
			dispatch({type:"setFileExplorer",payload:mystate.file_explorer})
			dispatch({type:"activeElementContextMenu", payload:{path:""}})
            dispatch({type:"alert/SET_ALERT",payload:{title:response.data.message, is_hide:false, type:"success"}})
                setTimeout(() => {  dispatch({type:"alert/SET_ALERT",payload:{title:"", is_hide:true, type:""}})
                }, 3000);
                handleCancel()
        })
        .catch((error) => {
            dispatch({type:"alert/SET_ALERT",payload:{title:error.data.message, is_hide:false, type:"error"}})
                setTimeout(() => {  dispatch({type:"alert/SET_ALERT",payload:{title:"", is_hide:true, type:""}})
                handleCancel()
                }, 3000);
        });
    }

    return (
        <div className="bg-black/60 h-full grid place-content-center">
            <div className="bg-[#070707] flex flex-col border-2 border-[#2B2B2B] h-[450px] w-[800px] rounded-xl px-12 py-4">
                <div className="text-white text-[28px] mt-12 font-regular font-IBM-Plex-Sans">
                   {props.file instanceof File?"Are you sure you want to delete this File ?":"Are you sure you want to delete this Folder ?"}
                </div>
                <div className="flex flex-col mt-12 grow">
                    <div className="flex items-center space-x-2">
                        {props.file instanceof File && <img src={require('../../assets/vsicons/'+getIconForFile(props.file.name))} className="w-[20px] h-[20px]" alt="" />}
                        {!(props.file instanceof File) && <img src={require('../../assets/vsicons/'+getIconForFolder(props.file.name))} className="w-[20px] h-[20px]" alt="" />}
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