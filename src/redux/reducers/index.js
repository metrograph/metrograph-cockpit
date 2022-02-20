import { combineReducers } from "redux";
import { jobReducer } from "./jobReducer";

const reducers = combineReducers({
    alljobs: jobReducer
})
export default reducers