import { AccountCircle } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logout } from "../Actions";
import { useSelector, useDispatch } from "react-redux";
import appconfig from "../appconfig";
import logo from "../Assets/images/logo.png";
import apiservice from "../Api/apiService";
import Loading from "./Loading";

const Topbar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const role = useSelector((state) => state.role);
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const x = async () => {
      isLoggedIn && setProfile(await apiservice.get("/user/me"));
      setLoading(false);
    };
    x();
  }, [isLoggedIn]);
  return loading ? (
    <Loading />
  ) : (
    <div
      style={{
        background:
          "linear-gradient(142deg, rgba(7,40,50,1) 0%, rgba(7,40,50,1) 60%, rgba(255,226,0,0.65) 76%)",
      }}
      className="fixed top-0 z-20 px-8 shadow-slate-900 border-b-2 shadow-2xl w-full justify-between h-16 flex items-center"
    >
      <div className="w-6/12 gap-12 flex items-center justify-between">
        <Link to={"/home"} className="w-4/12 mt-1">
          <img src={logo} alt="logo" className="w-full h-full" />
        </Link>
        <nav className="w-8/12 tracking-widest uppercase text-gray-300 text-sm flex items-center gap-6">
          <Link to={"/home"}>
            <div
              className="hover:scale-110 cursor-pointer duration-150 hover:underline"
              style={{
                textUnderlineOffset: 4,
                textDecorationThickness: 2,
                textDecorationColor: appconfig.color.font,
              }}
            >
              Home
            </div>
          </Link>
          <Link to={"/concerts"}>
            <div
              className="hover:scale-110 cursor-pointer duration-150 hover:underline"
              style={{
                textUnderlineOffset: 4,
                textDecorationThickness: 2,
                textDecorationColor: appconfig.color.font,
              }}
            >
              Concerts
            </div>
          </Link>
          <Link to="/about">
            <div
              className="hover:scale-110 cursor-pointer duration-150 hover:underline"
              style={{
                textUnderlineOffset: 4,
                textDecorationThickness: 2,
              }}
            >
              About
            </div>
          </Link>
          {isLoggedIn && role === "admin" && (
            <>
              <Link
                to={"/managers/requests"}
                className="hover:scale-110 cursor-pointer duration-150 hover:underline"
                style={{
                  textUnderlineOffset: 4,
                  textDecorationThickness: 2,
                }}
              >
                Requests
              </Link>
            </>
          )}
          {isLoggedIn && (
            <Link to="/bookings">
              <div
                className="hover:scale-110 cursor-pointer duration-150 hover:underline"
                style={{
                  textUnderlineOffset: 4,
                  textDecorationThickness: 2,
                }}
              >
                Bookings
              </div>
            </Link>
          )}
          {isLoggedIn && role == "manager" && (
            <Link to="/my-bookings">
              <div
                className="hover:scale-110 cursor-pointer duration-150 hover:underline"
                style={{
                  textUnderlineOffset: 4,
                  textDecorationThickness: 2,
                }}
              >
                Posted
              </div>
            </Link>
          )}
        </nav>
      </div>
      <nav className="flex justify-end gap-4 items-center w-3/12">
        {isLoggedIn && profile ? (
          <>
            <div
              className="font-bold hover:scale-110 tracking-widest uppercase text-slate-800 text-sm cursor-pointer duration-150 "
              style={{
                textUnderlineOffset: 4,
                textDecorationThickness: 2,
              }}
              onClick={() => dispatch(logout())}
            >
              Logout
            </div>
            <Link to="/profile">
              <div className="w-10 h-10 rounded-full hover:scale-105 active:scale-95">
                <img
                  className="rounded-full border-4 border-slate-800"
                  src={appconfig.url + "/img/users/" + profile.data.data.avatar}
                ></img>
              </div>
            </Link>
          </>
        ) : (
          <>
            <Link to={"/login"}>
              <div
                className="font-bold hover:scale-110 tracking-widest uppercase text-slate-800 text-sm cursor-pointer duration-150 "
                style={{
                  textUnderlineOffset: 4,
                  textDecorationThickness: 2,
                }}
              >
                Login
              </div>
            </Link>
            <Link to={"/signup"}>
              <div
                className="font-bold hover:scale-110 tracking-widest uppercase text-slate-800 text-sm cursor-pointer duration-150 "
                style={{
                  textUnderlineOffset: 4,
                  textDecorationThickness: 2,
                }}
              >
                Sign up
              </div>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Topbar;
