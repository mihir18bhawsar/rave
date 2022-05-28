import { combineReducers } from "redux";
import toastReducer from "./toastReducer";

const allReducers = combineReducers({
  toast: toastReducer,
});

const rootReducer = (state, action) => {
  return allReducers(state, action);
};
export default rootReducer;
