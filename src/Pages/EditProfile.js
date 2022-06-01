import { Button, Input, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Loading from "../Components/Loading";
import appconfig from "../appconfig";
import apiService from "../Api/apiService";
import { toastMessage } from "../Actions";
import { useDispatch } from "react-redux";
const EditProfile = () => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState();
  const [name, setName] = useState();
  const [birthDate, setBirthDate] = useState();
  const [avatar, setAvatar] = useState();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    !history?.location?.state?.profile && history.push("/");
    setProfile(history.location.state.profile);
    setLoading(false);
  }, []);
  useEffect(() => {
    setName(profile?.name);
    setBirthDate(profile?.birthDate);
  }, [profile]);
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
          Edit Profile
        </h1>
        <p className="uppercase tracking-widest text-white text-xs">
          Please enter the details
        </p>
        <div className="flex flex-col items-center gap-8 w-full h-full shadow-2xl">
          <form
            name="forms"
            className="w-7/12 bg-transparent flex flex-col items-center gap-8 py-8 h-full"
            onSubmit={async (e) => {
              e.preventDefault();
              const formd = new FormData();
              name && formd.append("name", name);
              avatar && formd.append("avatar", avatar);
              birthDate && formd.append("birthDate", birthDate);
              await apiService.patch("/user/me/update", formd, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              });
              await dispatch(toastMessage(1, "Updated Successfuly"));
              history.push("/profile");
            }}
          >
            <TextField
              variant="filled"
              type={"text"}
              label="Name"
              color="secondary"
              className="bg-white opacity-50 shadow-2xl shadow-black"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              variant="filled"
              type={"file"}
              label="Avatar"
              color="secondary"
              className="bg-white w-8/12 opacity-50 shadow-2xl shadow-black"
              onChange={(e) => setAvatar(e.target.files[0])}
            />
            <div className="invert font-bold">Birth Date</div>
            <input
              variant="filled"
              className="bg-white opacity-50 shadow-2xl shadow-black"
              type={"date"}
              label="BirthDate"
              color="secondary"
              onChange={(e) => setBirthDate(e.target.value)}
              fullWidth
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
                Submit
              </Button>
            </div>
          </form>
        </div>
      </Box>
    </div>
  );
};

export default EditProfile;
