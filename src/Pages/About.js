import React from "react";

const About = () => {
  return (
    <div className="w-full h-full p-8  gap-8 flex flex-col items-center">
      <div className="text-7xl font-black text-yellow-400"> RaveSquare </div>
      <div className="text-sm font-light text-white text-center tracking-wider w-8/12 uppercase">
        {" "}
        A concert booking and management system. The team includes the following
        members:-{" "}
      </div>
      <div className="flex w-6/12 h-full py-10 rounded-3xl flex-col items-center bg-slate-700 opacity-80">
        <div className="grid text-center grid-cols-2 gap-12 justify-items-center items-center">
          <div className="w-56 h-24 font-black text-2xl text-slate-400 uppercase bg-white p-4 shadow-yellow-400 shadow-lg rounded-2xl flex flex-col items-center">
            {" "}
            Shreyansh Tiwari{" "}
          </div>
          <div className="w-56 h-24 font-black text-2xl text-slate-400 uppercase bg-white p-4 shadow-yellow-400 shadow-lg rounded-2xl flex flex-col items-center">
            {" "}
            Shubham Maheshwari{" "}
          </div>
          <div className="w-56 h-24 font-black text-2xl text-slate-400 uppercase bg-white p-4 shadow-yellow-400 shadow-lg rounded-2xl flex flex-col items-center">
            {" "}
            Sumant Vyas{" "}
          </div>
          <div className="w-56 h-24 font-black text-2xl text-slate-400 uppercase bg-white p-4 shadow-yellow-400 shadow-lg rounded-2xl flex flex-col items-center">
            {" "}
            Mihir Bhawsar{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
