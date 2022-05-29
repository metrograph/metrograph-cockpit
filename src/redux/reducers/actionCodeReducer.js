import axios from "axios"
let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiZWhhbXphIn0sInRpbWUiOiIxNjUzNjY0MjY3LjA1ODAzMSJ9.0cXDjsGeWZ4PEIeiqagcF8B1VsmdMdat3-GZPKId5To"
let hostname="http://195.201.146.87:80/v1"

function GET_ACTION(state){
	axios.get(hostname+"/action/bd1e8474-43b8-47ad-8673-93d92d46ebe5", {headers: { Authorization: token },})
	.then(function response(){
		let data = response.data.payload.ActionCode;
	return {uuid :data.uuid, name :data.name, description :data.description, runtime:data.runtime, runtime_version: data.runtime_version, url_enabled:data.url_enabled}
	}).catch(function error(){return state})
}

 async function setActionCode(state,payload){
	const response = await axios.get(hostname+"/action/bd1e8474-43b8-47ad-8673-93d92d46ebe5", {headers: { Authorization: token },})
	let data = response.data.payload.ActionCode;
	return {uuid :data.uuid, name :data.name, description :data.description, runtime:data.runtime, runtime_version: data.runtime_version, url_enabled:data.url_enabled}
}
	

const actionCodeReducer = (state ={uuid :"", name :"",description :"",runtime:"", runtime_version:"",url_enabled:""}, { type, payload }) => {
	switch (type) {
		case "action_code/SET":
        	return payload
		default:
        	return state
    }
}
export default actionCodeReducer
