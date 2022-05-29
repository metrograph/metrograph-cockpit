
const actionReducer = (state =[], { type, payload }) => {
	switch (type) {
		case "action/SET":
        	return payload
		default:
        	return state
    }
}
export default actionReducer
