import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toastMessage } from "../Actions";
import apiservice from "../Api/apiService";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useHistory } from "react-router-dom";
const StripePay = () => {
  const [clientSecret, setClientSecret] = useState();
  const stripePromise = loadStripe(
    "pk_test_51KwRvDSEMOu66qSiILeui5ZRo0uKe2adVE5wo9FNdeuhaeyafq5Q8BkRcseEwaBVstbuibozPXbmut2wSE5Uk79d00Yq5X9jNX"
  );
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
          setClientSecret(res.data.client_secret);
        } catch (err) {
          console.log(err);
          dispatch(
            toastMessage(0, err.response?.data.message || "unknown error")
          );
        }
      };
      x();
    }
  }, [history.location.state]);
  const options = {
    // passing the client secret obtained from the server
    clientSecret,
  };
  return (
    clientSecret && (
      <>
        {"hello"}
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      </>
    )
  );
};

export default StripePay;
