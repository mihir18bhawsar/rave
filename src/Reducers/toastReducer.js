const reducer = (state = { type: null, value: null }, action) => {
  if (action.type === "ERROR") return { type: 0, value: action.payload };
  if (action.type === "SUCCESS") return { type: 1, value: action.payload };
  if (action.type === "SESSION_REFRESH") return { type: null, value: null };
  return state;
};
export default reducer;
