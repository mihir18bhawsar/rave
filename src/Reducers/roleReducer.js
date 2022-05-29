const reducer = (state = null, action) => {
  if (action.type === "SET_ROLE") return action.payload;
  return state;
};
export default reducer;
