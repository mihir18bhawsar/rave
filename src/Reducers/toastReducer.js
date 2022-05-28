const reducer = (state = { type: null, value: null }, action) => {
  if (action.type === "ERROR") return { type: 0, value: action.payload };
  if (action.type === "SUCCESS") return { type: 1, value: action.payload };

  return state;
};
export default reducer;
