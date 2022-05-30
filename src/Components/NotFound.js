import React from "react";
import logo from "../Assets/images/logo.png";

const NotFound = () => {
  return (
    <div className="w-full backdrop-blur-xl text-6xl p-8 backdrop-brightness-75 text-yellow-400 font-black h-screen tracking-tighter gap-12  flex flex-col items-center justify-start">
      <div className="opacity-80 ">Page Not Found</div>
      <div className="w-fit flex-col flex items-center  backdrop-blur-xl">
        <img
          src="https://bashooka.com/wp-content/uploads/2015/10/404-errrrr-page-19.jpg"
          alt="ima"
          className=" shadow-2xl shadow-black backdrop-blur opacity-70 border-yellow-400 rounded-xl border-2"
        />
      </div>
      <div className="w-2/12 border-yellow-400 border-2 p-4 bg-slate-800 rounded-full shadow-black shadow-2xl">
        <img src={logo} alt="logo" />
      </div>
    </div>
  );
};

export default NotFound;
