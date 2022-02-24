import { ActionTypes } from "../constans/actionTypes"

export const setJobs = (jobs) => {
    return {
        type: ActionTypes.SET_JOBS,
        payload: jobs
    }
}

export const selectedJobs = (job) => {
    return {
        type: ActionTypes.SELECTED_JOB,
        payload: job
    }
}

export const addedJob = (job) => {
    return {
        type: ActionTypes.ADDED_JOB,
        payload: job
    }
}

export const deletedJob = (job) => {
    return {
        type: ActionTypes.REMOVE_JOB,
        payload: job
    }
}
