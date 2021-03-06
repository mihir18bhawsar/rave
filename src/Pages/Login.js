import React, { useEffect, useState } from "react";
import apiService from "../Api/apiService";
import appconfig from "../appconfig";
import { useDispatch, useSelector } from "react-redux";
import { login, toastMessage } from "../Actions";
import { useHistory } from "react-router-dom";
import { Box, TextField, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import Loading from "../Components/Loading";

const Login = (props) => {
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (formdata) => {
    setLoading(true);
    let res;
    try {
      res = await apiService.post("/user/login", formdata);
      await dispatch(login(res.data.token));
    } catch (err) {
      err.response.data.status === "fail" &&
        dispatch(toastMessage(0, err.response.data.message));
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
      dispatch(toastMessage(1, "Already Logged In"));
    }
    setLoading(false);
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div className="w-full mt-12 flex flex-col items-center justify-center">
      <Box
        style={{ backgroundColor: "rgba(125,125,125,0.5)" }}
        className="w-full border-x-4 border-white flex-col backdrop-blur-lg gap-8 flex items-center h-full sm:h-fit sm:w-5/12 rounded-3xl shadow-slate-800 shadow-2xl"
      >
        <h1
          className="uppercase mt-4 font-bold text-yellow-400 text-4xl"
          style={{ textShadow: `0 0 15px ${appconfig.color.secondary}` }}
        >
          Login
        </h1>
        <p className="uppercase tracking-widest text-white text-xs">
          Please enter the details
        </p>
        <div className="flex flex-col items-center gap-8 w-full h-full shadow-2xl">
          <form
            className="w-7/12 bg-transparent flex flex-col items-center gap-8 py-8 h-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              variant="filled"
              type={"email"}
              label="Email"
              color="secondary"
              className="bg-white opacity-50 shadow-2xl shadow-black"
              error={errors?.email}
              helperText={errors?.email && errors.email.message}
              fullWidth
              {...register("email", { required: "Email is required" })}
            />
            <TextField
              variant="filled"
              className="bg-white opacity-50 shadow-2xl shadow-black"
              type={"password"}
              label="Password"
              color="secondary"
              fullWidth
              error={Boolean(errors?.password)}
              helperText={errors?.password && errors.password.message}
              {...register("password", {
                required: "Password Required",
                minLength: {
                  value: 8,
                  message: "Password must be atleast 8 characters long",
                },
              })}
            />
            <div className="px-20 rounded-2xl w-full flex justify-center">
              <Button
                size="large"
                variant="outlined"
                type="submit"
                className="rounded-xl h-12 hover:shadow-2xl hover:shadow-black"
                style={{
                  fontWeight: "bold",
                  borderRadius: "30px",
                  backgroundColor: appconfig.color.primary,
                  color: appconfig.color.font,
                  border: "2px solid #ddd",
                }}
                fullWidth
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      </Box>
    </div>
  );
};

export default Login;
