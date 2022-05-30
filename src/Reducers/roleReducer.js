import jwtDecode from "jwt-decode";
const token = sessionStorage.getItem("token");
const INITIAL_STATE = (token && jwtDecode(token).role) || null;
const reducer = (state = INITIAL_STATE, action) => {
  if (action.type === "SET_ROLE") return action.payload;
  if (action.type === "SESSION_REFRESH") return null;

  return state;
};
export default reducer;
