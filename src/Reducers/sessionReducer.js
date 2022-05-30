import jwtDecode from "jwt-decode";
const token = sessionStorage.getItem("token");
let INITIAL;
if (token) {
  const exp = Number(Date.now()) - Number(jwtDecode(token).iat * 1000);
  console.log(exp, 3600000);
  INITIAL = exp < 3600000 ? true : false;
} else INITIAL = false;

const reducer = (state = INITIAL, action) => {
  if (action.type === "LOGIN") return action.payload;
  if (action.type === "LOGOUT") return action.payload;
  if (action.type === "SESSION_REFRESH") return false;
  return state;
};
export default reducer;
