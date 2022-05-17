import axios from "axios"
let url="https://api.allorigins.win/get?charset=ISO-8859-1&url=https://pastebin.com/raw/YmsxCEYE"
let url_2="https://api.allorigins.win/get?charset=ISO-8859-1&url=https://pastebin.com/raw/j68BdHAm"

function getContentFromApi(state,url_2){
	axios.get(url_2).then(function (response) {
	return state.selectedFile.content=response.data.contents
	}).catch(e=>{
	console.log(e)
	return state.selectedFile.content="hello"
	}) 
}

function codeEditorSelectedFile(state, payload){
	let file =payload.file
	getContentFromApi(state,url_2)
	state.selectedFile={uid :file.uid, name: file.name, content :file.content}
	return state
}

function codeEditorDumpSelectedFile(state){
	state.selectedFile={uid :"", name :"",content :""}
	return state
}

const codeEditorReducer = (state = {selectedFile:{uid :"", name :"",content :""},openedFiles:[]}, { type, payload }) => {
	switch (type) {
		case "setCodeEditor":
        	return payload
		case "codeEditorSelectedFile":
			return codeEditorSelectedFile(state, payload)
		case "codeEditorDumpSelectedFile":
			return codeEditorDumpSelectedFile(state)
        default:
        	return state
    }
}
export default codeEditorReducer