import jwtDecode from "jwt-decode";
const token = sessionStorage.getItem("token");
const exp = token && Date.now() - jwtDecode(token).iat * 1000;
const INITIAL = token && exp < 3600000 ? true : false;

const reducer = (state = INITIAL, action) => {
  if (action.type === "LOGIN") return true;
  if (action.type === "LOGOUT") return false;
  return state;
};
export default reducer;
