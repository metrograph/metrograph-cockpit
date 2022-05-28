function setActiveElement(payload){
    console.log("element has beeing set!")
    }
    
function activeElementSelected(state, payload){
    return {...state,codeAction:payload.path}
    }

function activeElementRename(state, payload){
    return {...state, renameView:payload.path}
    }

function activeElementContextMenu(state, payload){
    return {...state,contextMenu:payload.path}
    }

function OpendFolders(state, payload){
    let index = state.opendFolders.indexOf(payload.path);
    console.log(index)
    if (index !== -1) state.opendFolders.splice(index, 1);
    else state.opendFolders.push(payload.path)
    return state
    }
     
const activeElementReducer = (state = {codeAction:"",renameView:"",contextMenu:"",opendFolders:[]}, { type, payload }) => {
    switch (type) {
        case "setActiveElement":
            return setActiveElement(payload)
        case "activeElementSelected":
            return activeElementSelected(state, payload)
        case "activeElementRename":
            return activeElementRename(state, payload)
        case "activeElementContextMenu":
            return activeElementContextMenu(state, payload)
        case "activeElementOpendFolders":
            return OpendFolders(state, payload)
        default:
            return state
            }
    }
    
export default activeElementReducer