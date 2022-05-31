import jwtDecode from "jwt-decode";
import history from "../history";
export const toastMessage = (type, message) => {
  if (type === 0) return { type: "ERROR", payload: message };
  else return { type: "SUCCESS", payload: message };
};

export const logout = () => async (dispatch) => {
  await sessionStorage.removeItem("token");
  await dispatch({ type: "LOGOUT", payload: false });
  await dispatch({ type: "SESSION_REFRESH", payload: null });
  await dispatch(toastMessage(1, "Logged Out!"));
  history.push("/");
};

export const login = (token) => async (dispatch) => {
  const userid = await jwtDecode(token);
  await sessionStorage.setItem("token", token);
  await dispatch({ type: "LOGIN", payload: true });
  await dispatch({ type: "SET_USER", payload: userid.id });
  if (userid?.role === "customer") {
    await dispatch(setRole("customer"));
  } else if (userid?.role === "manager") {
    await dispatch(setRole("manager"));
  } else if (userid?.role === "admin") await dispatch(setRole("admin"));
  dispatch(toastMessage(1, "Logged in successfully!"));
  history.push("/");
};

export const signup = (token) => async (dispatch) => {
  const userid = await jwtDecode(token);
  await sessionStorage.setItem("token", token);
  await dispatch({ type: "SIGNUP", payload: true });
  await dispatch({ type: "SET_USER", payload: userid.id });
  if (userid?.role === "customer") {
    await dispatch(setRole("customer"));
    dispatch(toastMessage(1, "Your Account is Created successfully!"));
  } else if (userid?.role === "manager") {
    await dispatch(setRole("manager"));
    dispatch(
      toastMessage(
        1,
        "Account Created!! Your manager approval request has been sent"
      )
    );
  }
  history.push("/");
};

export const setRole = (role) => {
  return { type: "SET_ROLE", payload: role };
};
