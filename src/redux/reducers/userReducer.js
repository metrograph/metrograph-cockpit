import axios from 'axios';
import jobs from "../../local/jobs";


function setUser(payload) {
    return payload.user



}
const deleteJob = (state, payload) => {
    let data = state.filter(e => e.uuid !== payload)

    return data
}

function addedJob(state, payload) {
    console.log(payload);
    return [...state, payload]
}


const userReducer = (state = {}, { type, payload }) => {

    switch (type) {
        case "setUser":
            return setUser(payload)
            break;
        case "addedJob":
            return addedJob(state, payload)
            break;
        case "deletedJob":
            return deleteJob(state, payload)
            break;

        default:
            return state
    }
}

export default userReducer
