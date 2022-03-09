import axios from 'axios';
import jobs from "../../local/jobs";


function setJob(payload) {
    return payload



}
const deleteJob = (state, payload) => {
    let data = state.filter(e => e.uuid !== payload)

    return data
}

function addedJob(state, payload) {
    console.log(payload);
    return [...state, payload]
}


const jobReducer = (state = [], { type, payload }) => {

    switch (type) {
        case "setJobs":
            return setJob(payload)
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

export default jobReducer
