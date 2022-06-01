import React, { useEffect, useState } from "react";
import apiservice from "../Api/apiService";
import Loading from "../Components/Loading";
import ConcertCard from "../Components/ConcertCard";

import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    const x = async () => {
      const bookings = await apiservice.get("/user/manager/my-concerts");
      setData(bookings.data.data);
      console.log(bookings.data);
      setLoading(false);
    };
    x();
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <div className="w-full h-full flex-col flex items-center p-8 ">
      <div className="fixed z-10 bottom-5 shadow-black border-2 border-white scale-125 left-10 shadow-2xl">
        <Link to={"/create-concert"}>
          <Button
            variant="contained"
            color="primary"
            className="invert border-2 border-white"
            size="large"
          >
            Create New
          </Button>
        </Link>
      </div>
      <div className="w-8/12 p-8 h-full opacity-75  flex flex-col items-center rounded-3xl bg-slate-800">
        <div className="text-5xl p-4 mb-8 font-black text-yellow-400">
          My Recently Hosted Concerts
        </div>

        {data.length < 0 ? (
          <div className="w-full h-full gap-8 items-center justify-center justify-items-center grid grid-cols-2">
            No current concerts by you
          </div>
        ) : (
          <div className="w-full h-full gap-8 items-center justify-center justify-items-center grid grid-cols-2">
            {data.map((c) => (
              <ConcertCard concert={c} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
