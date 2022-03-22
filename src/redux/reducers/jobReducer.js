
const deleteJob = (state, payload) => {
    let data = state.filter(e => e.uuid !== payload)

    return data
}



const jobReducer = (state = [], { type, payload }) => {

    switch (type) {
        case "setJobs":
            return payload

        case "addedJob":
            return [...state, payload]

        case "deletedJob":
            return deleteJob(state, payload)


        default:
            return state
    }
}

export default jobReducer
