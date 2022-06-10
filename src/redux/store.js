import { createStore } from "redux";
import { combineReducers } from "redux";
import alertReducer from "./reducers/alertReducer";
import userReducer from "./reducers/userReducer";
import contextMenuReducer from "./reducers/contextMenuReducer";
import fileExplorerReducer from "./reducers/fileExplorerReducer";
import activeElementReducer from "./reducers/activeElementReducer";
import codeEditorReducer from "./reducers/codeEditorReducer";
import actionReducer from "./reducers/actionReducer"
import fileStatusReducer from "./reducers/fileStatusReducer";

const reducers = combineReducers({
  alert: alertReducer,
  user: userReducer,
  contextMenu: contextMenuReducer,
  file_explorer: fileExplorerReducer,
  activeElement: activeElementReducer,
  codeEditor: codeEditorReducer,
  actions: actionReducer,
  file_status: fileStatusReducer
});

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
