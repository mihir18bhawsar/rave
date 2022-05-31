import { combineReducers } from "redux";
import toastReducer from "./toastReducer";
import sessionReducer from "./sessionReducer";
import roleReducer from "./roleReducer";
import userReducer from "./userReducer";
const allReducers = combineReducers({
  toast: toastReducer,
  isLoggedIn: sessionReducer,
  role: roleReducer,
  me: userReducer,
});

const rootReducer = (state, action) => {
  return allReducers(state, action);
};
export default rootReducer;
