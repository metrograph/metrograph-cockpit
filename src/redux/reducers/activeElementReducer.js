function setActiveElement(state, payload){
   return {codeAction:"", renameView:"", contextMenu:"", opendFolders:[], opendDropDown:""}
    }
    
function activeElementSelected(state, payload){
    return {...state,codeAction:payload.path}
    }

function dropDown(state, payload){
    return {...state,opendDropDown:payload.key}
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
     
const activeElementReducer = (state = {codeAction:"", renameView:"", contextMenu:"", opendFolders:[], opendDropDown:""}, { type, payload }) => {
    switch (type) {
        case "active_element/SET":
            return setActiveElement(state, payload)
        case "active_element/SELECT_FILE":
            return activeElementSelected(state, payload)
        case "active_element/RENAME":
            return activeElementRename(state, payload)
        case "active_element/CONTEXT_MENU":
            return activeElementContextMenu(state, payload)
        case "active_element/OPEN_FOLDER":
            return OpendFolders(state, payload)
        case "active_element/DROP_DOWN":
            return dropDown(state, payload)
        default:
            return state
            }
    }
    
export default activeElementReducer