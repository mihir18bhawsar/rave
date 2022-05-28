export const toastMessage = (type, message) => {
  if (type === 0) return { type: "ERROR", payload: message };
  else return { type: "SUCCESS", payload: message };
};
