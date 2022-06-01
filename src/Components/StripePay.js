import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toastMessage } from "../Actions";
import apiservice from "../Api/apiService";

import { useHistory } from "react-router-dom";
import Loading from "./Loading";
const StripePay = () => {
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    if (history?.location?.state?.concert?._id) {
      console.log(history);
      !isLoggedIn && history.push("/");
      const x = async () => {
        try {
          const res = await apiservice.get(
            "/booking/checkout-session/" + history.location?.state?.concert?._id
          );
          window.location.href = res.data.session.url;
        } catch (err) {
          dispatch(toastMessage(0, err.message || "unknown error"));
        }
      };
      x();
    }
  }, []);

  return (
    <>
      <Loading />
    </>
  );
};

export default StripePay;
