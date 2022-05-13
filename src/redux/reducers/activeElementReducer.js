function setActiveElement(payload){
    console.log("element has beeing set!")
    }
    
    function addActiveElementTocodeAction(state, payload){
        state.codeAction= payload.uid
        return state
    }

    function activeElementRename(state, payload){
        state.renameView=payload.uid
        return state
    }
     
    const activeElementReducer = (state = {codeAction:"",renameView:""}, { type, payload }) => {
        switch (type) {
            case "setActiveElement":
                return setActiveElement(payload)
            case "addActiveElementTocodeAction":
                return addActiveElementTocodeAction(state, payload)
                case "activeElementRename":
                    return activeElementRename(state, payload)
            default:
                return state
            }
    }
    
    export default activeElementReducer