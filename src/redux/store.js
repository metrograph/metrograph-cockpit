import { createStore } from "redux";
import { combineReducers } from "redux";
import alertReducer from "./reducers/alertReducer";
import userReducer from "./reducers/userReducer";
import contextMenuReducer from "./reducers/contextMenuReducer";
import fileExplorerReducer from "./reducers/fileExplorerReducer";
import activeElementReducer from "./reducers/activeElementReducer";
import folderReducer from "./reducers/folderReducer";
import codeEditorReducer from "./reducers/codeEditorReducer";
import actionCodeReducer from "./reducers/actionCodeReducer"
import actionReducer from "./reducers/actionReducer"
import modalActionReducer from "./reducers/modalActionReducer";
import modalFileReducer from "./reducers/modalFileReducer";
import fileStatusReducer from "./reducers/fileStatusReducer";
import modalsScheduleReducer from "./reducers/modalsScheduleReducer";
const reducers = combineReducers({
  alert: alertReducer,
  user: userReducer,
  contextMenu: contextMenuReducer,
  file_explorer: fileExplorerReducer,
  activeElement: activeElementReducer,
  folder: folderReducer,
  codeEditor: codeEditorReducer,
  actionCode: actionCodeReducer,
  actions: actionReducer,
  modal_action: modalActionReducer,
  modal_file: modalFileReducer,
  file_status: fileStatusReducer,
  model_schedule: modalsScheduleReducer 
});

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
