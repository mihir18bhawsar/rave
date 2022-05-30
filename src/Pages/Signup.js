import React, { useEffect, useState } from "react";
import apiService from "../Api/apiService";
import appconfig from "../appconfig";
import { useDispatch, useSelector } from "react-redux";
import { signup, toastMessage } from "../Actions";
import { useHistory } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
  FormControl,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { Input } from "@material-ui/core";
import Loading from "../Components/Loading";

const Signup = () => {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("customer");
  const [gender, setGender] = useState("female");
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
      res = await apiService.post("/user/signup", {
        ...formdata,
        role,
        gender,
      });
      await dispatch(signup(res.data.token));
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
          Signup
        </h1>
        <p className="uppercase tracking-widest text-white text-xs">
          Please enter the details
        </p>
        <div className="flex flex-col h-96  items-center gap-8 w-full shadow-2xl">
          <form
            className="w-7/12 bg-transparent overflow-y-scroll hide-scrollbar p-4 pt-0 mt-4 flex flex-col items-center gap-8 py-8 h-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex gap-4 w-full">
              <Chip
                variant="filled"
                className="w-full cursor-pointer"
                label="User"
                onClick={() => setRole("customer")}
                style={{
                  color: role === "customer" && appconfig.color.secondary,
                  backgroundColor: role == "customer" && appconfig.color.dark,
                }}
              />
              <Chip
                variant="filled"
                className="w-full cursor-pointer"
                label="Manager"
                onClick={() => setRole("manager")}
                style={{
                  color: role === "manager" && appconfig.color.secondary,
                  backgroundColor: role == "manager" && appconfig.color.dark,
                }}
              />
              {/* <Chip
                label="Admin"
                className=" w-full cursor-pointer"
                variant="filled"
                onClick={() => setRole("admin")}
                style={{
                  color: role === "admin" && appconfig.color.secondary,
                  backgroundColor: role == "admin" && appconfig.color.dark,
                }}
              /> */}
            </div>
            <TextField
              variant="filled"
              type={"text"}
              label="Name"
              color="secondary"
              className="bg-white opacity-50 shadow-2xl shadow-black"
              error={errors?.name}
              helperText={errors?.name && errors.name.message}
              fullWidth
              {...register("name", {
                required: "Your name is required",
                minLength: { value: 3, message: "Name is too short" },
                maxLength: { value: 30, message: "Name is too long" },
              })}
            />
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
            <TextField
              variant="filled"
              className="bg-white opacity-50 shadow-2xl shadow-black"
              type={"password"}
              label="Confirm Password"
              color="secondary"
              fullWidth
              error={Boolean(errors?.passwordConfirmation)}
              helperText={
                errors?.passwordConfirmation &&
                errors.passwordConfirmation.message
              }
              {...register("passwordConfirmation", {
                required: "Password confirmation required",
                minLength: {
                  value: 8,
                  message: "Password must be atleast 8 characters long",
                },
              })}
            />
            {role === "manager" && (
              <>
                <TextField
                  variant="filled"
                  className="bg-white opacity-50 shadow-2xl shadow-black"
                  type={"number"}
                  label="Contact number"
                  color="secondary"
                  fullWidth
                  error={Boolean(errors?.contactNumber)}
                  helperText={
                    errors?.contactNumber && errors.contactNumber.message
                  }
                  {...register("contactNumber", {
                    required: "Number Required",
                    minLength: {
                      value: 10,
                      message: "Number invalid",
                    },
                    maxLength: {
                      value: 10,
                      message: "Number Invalid",
                    },
                  })}
                />
                <TextField
                  variant="filled"
                  className="bg-white opacity-50 shadow-2xl shadow-black"
                  type={"number"}
                  label="Account number"
                  color="secondary"
                  fullWidth
                  error={Boolean(errors?.accountNum)}
                  helperText={errors?.accountNum && errors.accountNum.message}
                  {...register("accountNum", {
                    required: "Account Number Required",
                  })}
                />
                <TextField
                  variant="filled"
                  className="bg-white opacity-50 shadow-2xl shadow-black"
                  type={"text"}
                  label="IFSC code"
                  color="secondary"
                  fullWidth
                  error={Boolean(errors?.ifscCode)}
                  helperText={errors?.ifscCode && errors.ifscCode.message}
                  {...register("ifscCode", {
                    required: "IFSC code Required",
                  })}
                />
                <TextField
                  variant="filled"
                  className="bg-white opacity-50 shadow-2xl shadow-black"
                  type={"text"}
                  label="Bank Name"
                  color="secondary"
                  fullWidth
                  error={Boolean(errors?.bankName)}
                  helperText={errors?.bankName && errors.bankName.message}
                  {...register("bankName", {
                    required: "Bank Name Required",
                  })}
                />
              </>
            )}
            <div className="w-full">
              <FormLabel
                className="w-full font-light text-xs mb-2 uppercase"
                style={{ color: appconfig.color.secondary, fontSize: "0.7em" }}
              >
                Birth date
              </FormLabel>
              <Input
                type="date"
                style={{ color: "white" }}
                color="secondary"
                fullWidth
                className=" opacity-60"
                error={Boolean(errors?.birthDate)}
                helperText={errors?.birthDate && errors.birthDate.message}
                {...register("birthDate", {
                  required: "Birth date is required to verify age",
                })}
              />
            </div>

            <FormControl className="flex flex-col items-start w-full">
              <FormLabel
                id="demo-radio-buttons-group-label"
                className="mb-2 uppercase tracking-widest"
                style={{ fontSize: "0.7em", color: appconfig.color.secondary }}
              >
                Gender
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="other"
                name="radio-buttons-group"
                className="flex"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                color="primary"
              >
                <FormControlLabel
                  value="female"
                  control={<Radio color="default" />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio color="default" />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio color="default" />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
            <div className="px-20 mt-4 rounded-2xl w-full flex justify-center">
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
                Sign up
              </Button>
            </div>
          </form>
        </div>
      </Box>
    </div>
  );
};

export default Signup;
