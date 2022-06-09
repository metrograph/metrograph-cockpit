const actionCodeReducer = (state ={uuid :"", name :"",description :"",runtime:"", runtime_version:"",url_enabled:""}, { type, payload }) => {
	switch (type) {
		case "action_code/SET":
        	return payload
		default:
        	return state
    }
}
export default actionCodeReducer
