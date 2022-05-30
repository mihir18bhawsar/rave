import { combineReducers } from "redux";
import toastReducer from "./toastReducer";
import sessionReducer from "./sessionReducer";
import roleReducer from "./roleReducer";
const allReducers = combineReducers({
  toast: toastReducer,
  isLoggedIn: sessionReducer,
  role: roleReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "SESSION_REFRESH") state = undefined;
  return allReducers(state, action);
};
export default rootReducer;
