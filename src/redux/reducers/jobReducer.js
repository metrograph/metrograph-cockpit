import { ActionTypes } from "../constans/actionTypes";
import jobs from "../../local/jobs";
const initialState = {
    jobs: jobs
}
export const jobReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_JOBS:
            return state
            break;
        case ActionTypes.ADDED_JOB:
            return state.jobs.push(payload.job)
            break;

        default:
            return state
    }
}
