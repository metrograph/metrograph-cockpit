import { combineReducers } from "redux";
import { jobReducer } from "./jobReducer";

const reducers = combineReducers({
    jobs: jobReducer
})
export default reducers