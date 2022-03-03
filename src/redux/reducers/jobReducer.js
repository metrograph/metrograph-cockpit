
import jobs from "../../local/jobs";

const deleteJob = (state, payload) => {
    let data = state.filter(e => e._id !== payload)

    return data

}


const jobReducer = (state = jobs, { type, payload }) => {

    switch (type) {
        case "setJobs":
            return state
            break;
        case "addedJob":
            return [...state, payload]
            break;
        case "deletedJob":
            return deleteJob(state, payload)
            break;

        default:
            return state
    }
}

export default jobReducer
