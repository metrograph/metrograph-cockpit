function removeAction(state, payload){
	console.log("payload")
	return state.filter(e => e.uuid !== payload.uuid)
}

function addAction(state, payload){
	state.push(payload)
	return state
}

const actionReducer = (state =[], { type, payload }) => {
	switch (type) {
		case "action/SET":
        	return payload
		case "action/DELETE":
			return removeAction(state, payload)
		case "action/ADD":
			return addAction(state, payload)
		default:
        	return state
    }
}
export default actionReducer
