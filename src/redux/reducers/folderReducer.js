function setActiveElement(payload){
    console.log("element has beeing set!")
    }
    
const folderReducer = (state = {codeAction:"",renameView:"",contextMenu:""}, { type, payload }) => {
        switch (type) {
            case "setActiveElement":
                return setActiveElement(payload)
           
            default:
                return state
            }
    }
    
export default folderReducer