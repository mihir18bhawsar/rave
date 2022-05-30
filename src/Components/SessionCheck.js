import { useEffect } from "react";
import history from "../history";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Actions";
import jwtDecode from "jwt-decode";

const SessionCheck = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    const unlisten = history.listen(() => {
      if (isLoggedIn) {
        const token = sessionStorage.getItem("token");
        if (!token) {
          dispatch(logout());
          return;
        }
        const exp = Date.now() - jwtDecode(token).iat * 1000;
        exp > 3600000 && dispatch(logout());
      }
    });
    return () => {
      unlisten();
    };
  }, [isLoggedIn]);
  return null;
};

export default SessionCheck;
