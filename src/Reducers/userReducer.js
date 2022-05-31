import jwtDecode from "jwt-decode";

const token = sessionStorage.getItem("token");
const data = token && jwtDecode(token).id;
const INITIAL = data || null;
const reducer = (state = INITIAL, action) => {
  if (action.type === "SET_USER") return action.payload;
  if (action.type === "SESSION_REFRESH") return null;
  return state;
};
export default reducer;
