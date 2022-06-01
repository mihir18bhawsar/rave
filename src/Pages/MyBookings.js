import React, { useEffect, useState } from "react";
import apiservice from "../Api/apiService";
import Loading from "../Components/Loading";
import ConcertCard from "../Components/ConcertCard";

const MyBookings = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    const x = async () => {
      const bookings = await apiservice.get("/user/me/bookings");
      setData(bookings.data.myBookings.map((b) => b.concertId));
      setLoading(false);
    };
    x();
  }, []);
  return loading ? (
    <Loading />
  ) : (
    data.length > 0 && (
      <div className="w-full h-full flex-col flex items-center p-8 ">
        <div className="w-8/12 p-8 h-full opacity-75  flex flex-col items-center rounded-3xl bg-slate-800">
          <div className="text-5xl p-4 mb-8 font-black text-yellow-400">
            My Recent Bookings
          </div>
          <div className="w-full h-full gap-8 items-center justify-center justify-items-center grid grid-cols-2">
            {data.map((c) => (
              <ConcertCard concert={c} />
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default MyBookings;
