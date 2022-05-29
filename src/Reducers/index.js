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
  return allReducers(state, action);
};
export default rootReducer;