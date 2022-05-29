const INITIAL = sessionStorage.getItem("token") ? true : false;

const reducer = (state = INITIAL, action) => {
  if (action.type === "LOGIN") return true;
  if (action.type === "LOGOUT") return false;
  return state;
};
export default reducer;
