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

function SelectedFile(state, file){
	getContentFromApi(state,url_2)
	state.selectedFile={uid :file.uid, name: file.name, content :file.content}
	return state
}

function dumpSelectedFile(state){
	state.selectedFile={uid :"", name :"",content :""}
	return state
}

function removeFileFromOpenedFiles(state, payload){
	return state.openedFiles.filter(e=>e.uid!=payload.uid)
}

function codeEditorOpenedFiles(state, payload){
	if (state.openedFiles.some(e=>e.uid===payload.file.uid)) return state
	else state.openedFiles.push({uid:payload.file.uid, name:payload.file.name})
    return state
}

function selectLastFile(state){
	if(state.openedFiles.length) return SelectedFile(state, state.openedFiles[state.openedFiles.length-1])
	else return state
}
function closeAndOpenLastFile(state, payload){
	state.openedFiles= removeFileFromOpenedFiles(state, { uid: payload.uid})
	if(state.selectedFile.uid===payload.uid) state=dumpSelectedFile(state)
	return selectLastFile(state)
}

const codeEditorReducer = (state = {selectedFile:{uid :"", name :"",content :""},openedFiles:[]}, { type, payload }) => {
	switch (type) {
		case "setCodeEditor":
        	return payload
		case "codeEditorSelectedFile":
			return codeEditorSelectedFile(state, payload)
		case "codeEditorDumpSelectedFile":
			return dumpSelectedFile(state)
		case "codeEditorOpenedFiles":
				return codeEditorOpenedFiles(state,payload)
		case "codeEditorCloseAndOpenLastOpenedFile":
				return closeAndOpenLastFile(state, payload)
        default:
        	return state
    }
}
export default codeEditorReducer