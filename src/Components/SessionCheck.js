import { useEffect } from "react";
import history from "../history";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Actions";

const SessionCheck = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    const unlisten = history.listen(() => {
      if (isLoggedIn) {
        !sessionStorage.getItem("token") && dispatch(logout());
      }
    });
    return () => {
      unlisten();
    };
  }, []);
  return null;
};

export default SessionCheck;
