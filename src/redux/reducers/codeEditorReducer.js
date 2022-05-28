import axios from "axios"
let url="https://api.allorigins.win/get?charset=ISO-8859-1&url=https://pastebin.com/raw/YmsxCEYE"
let url_2="https://api.allorigins.win/get?charset=ISO-8859-1&url=https://pastebin.com/raw/j68BdHAm"


function getContentFromApi(state,url_2){
	axios.get(url_2).then(function (response) {
	return state.selectedFile.content=response.data.contents
	}).catch(e=>{
	return state.selectedFile.content=null
	}) 
}

function codeEditorselectedFile(state, payload){
	if (state.openedFiles.some(e=>e.path===payload.file.path)){
		state.openedFiles.forEach(element => {
			if(element.path===payload.file.path) {
				state.selectedFile={path :payload.file.path, name: payload.file.name, content :element.content}
				console.log(element.content)
				return state
			}
		});
		return state
		
	}
	else {
		getContentFromApi(state,url_2)
		state.selectedFile={path :payload.file.path, name: payload.file.name, content :payload.file.content}
		return state
	}
}

function selectedFile(state, file){
	getContentFromApi(state,url_2)
	state.selectedFile={path :file.path, name: file.name, content :file.content}
	return state
}

function dumpselectedFile(state){
	state.selectedFile={path :"", name :"",content :null}
	return state
}

function updateFileContent(state,payload){
	state.selectedFile.content=payload.content
	console.log(state.openedFiles.indexOf((e)=>e.path===state.selectLastFile.path))
	return state
}

function updateOpenedFileContent(state,payload){
	state.openedFiles.forEach(element => {
		if(element.path===payload.path) {
			element.content=payload.content
			return state
		}
	});
	return state
}

function removeFileFromOpenedFiles(state, payload){
	return state.openedFiles.filter(e=>e.path!=payload.path)
}

function loadFileContent(state, payload){
	if (state.openedFiles.some(e=>e.path===payload.file.path)){
		state.openedFiles.forEach(element => {
			if(element.path===payload.file.path) {
				if(element.content===null){
					axios.get(url_2).then(function (response) {
						state.selectedFile={path:payload.file.path, name:payload.file.name, content:response.data.contents}
						element.content=response.data.contents
						return state
						}).catch(e=>{
						return state
						}) 
				}
				else if(element.content){
						state.selectedFile={path:element.path, name:element.name, content:element.content}
				}
			}
		});
	}
	return state
}

function openFile(state, payload){
	if (state.openedFiles.some(e=>e.path===payload.file.path)) return state
	else state.openedFiles.push({path:payload.file.path, name:payload.file.name,content:null})
    return state
}

function loadLastFileContent(state){
	if(state.openedFiles.length){
		
		return loadFileContent(state,{file:state.openedFiles[state.openedFiles.length-1]} )
	}
	else return state
}

function closeAndOpenLastFile(state, payload){
	state.openedFiles= removeFileFromOpenedFiles(state, { path: payload.path})
	if(state.selectedFile.path===payload.path) state=dumpselectedFile(state)
	return state
}

const codeEditorReducer = (state = {selectedFile:{path :"", name :"",content :null},openedFiles:[]}, { type, payload }) => {
	switch (type) {
		case "code_editor/SET":
        	return payload
		case "code_editor/SELECT_FILE":
			return codeEditorselectedFile(state, payload)
			case "code_editor/LOAD_FILE_CONTENT":
			return loadFileContent(state, payload)
		case "code_editor/CLEAR_SELECTED_FILE":
			return dumpselectedFile(state)
		case "code_editor/OPEN_FILE":
			return openFile(state,payload)
		case "code_editor/LOAD_LAST_FILE_CONTENT":
			return loadLastFileContent(state)
		case "code_editor/CLOSE_FILE":
			return closeAndOpenLastFile(state, payload)
		case "code_editor/UPDATE_FILE_CONTENT":
			return updateFileContent(state, payload)
		case "code_editor/UPDATE_OPENED_FILE_CONTENT":
			return updateOpenedFileContent(state, payload)
		default:
        	return state
    }
}
export default codeEditorReducer