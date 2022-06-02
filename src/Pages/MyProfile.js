import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiservice from "../Api/apiService";
import appconfig from "../appconfig";
import Loading from "../Components/Loading";

const MyProfile = () => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    console.log("here");
    const x = async () => {
      const me = await apiservice.get("/user/me");
      setInfo(me.data?.data || me.data);
      console.log(me.data.data);
      setLoading(false);
    };
    x();
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <div className="w-full h-full flex flex-col items-center p-8">
      <div className="bg-slate-800 p-8 rounded-3xl flex w-6/12 flex-col items-center opacity-80">
        <div className="grid grid-cols-4 gap-8 gap-y-10 justify-items-center items-center">
          <div className="text-5xl flex justify-start w-full font-black col-span-3 text-white">
            <div>{info.name}</div>
          </div>
          <div className="w-full h-full ">
            <img
              src={
                info.avatar == "default.jpeg"
                  ? appconfig.url + "/img/default.jpeg"
                  : appconfig.url + "/img/users/" + info.avatar
              }
              alt="profile"
              className="w-full h-auto rounded-full border-2 border-white"
            />
          </div>
          <div className="text-sm w-full col-span-4 px-2 gap-4 flex flex-col font-bold tracking-wide text-yellow-200 ">
            <div className="text-white font-light tracking-widest">Gender</div>
            <div className="text-3xl">{info.gender}</div>
          </div>
          <div className="col-span-4  w-full flex flex-col gap-4 justify-start p-2 text-yellow-200 font-bold">
            <div className="text-white font-light tracking-widest">Email</div>
            <div className="text-3xl">{info.email}</div>
          </div>
          <div className="text-yellow-200 col-span-2 font-bold flex w-full">
            <div className="px-2">
              <div className="text-white font-light tracking-widest">Age</div>
              <div className="text-3xl">
                {new Date(Date.now()).getFullYear() -
                  new Date(info.birthDate).getFullYear()}{" "}
                years old
              </div>
            </div>
          </div>
          <div className="w-full col-span-2 h-full justify-end flex items-end">
            <Link
              to={{
                pathname: "/profile/edit",
                state: {
                  profile: info,
                },
              }}
            >
              <Button variant="contained" color="secondary" size="large">
                Edit
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
