import { createStore } from "redux";
import { combineReducers } from 'redux'
import jobReducer from "./reducers/jobReducer";
import formReducer from "./reducers/formReducer";
const reducers = combineReducers({
    jobs: jobReducer
})

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;