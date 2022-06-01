import React, { useEffect, useState } from "react";
import apiservice from "../Api/apiService";
import Loading from "../Components/Loading";
import ConcertCard from "../Components/ConcertCard";

const Bookings = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    const x = async () => {
      const bookings = await apiservice.get("/user/me/bookings");
      setData(
        bookings.data.myBookings.map((b) => b.concertId),
        "bookingasd"
      );
      setLoading(false);
    };
    x();
  }, []);
  return loading ? (
    <Loading />
  ) : (
    data.length > 0 && (
      <div className="w-full h-full p-4">
        <div className="w-full h-full flex flex-col items-center rounded-3xl bg-slate-600">
          <div className="9/12 h-full grid grid-cols-4">
            {data.map((c) => (
              <ConcertCard concert={c} />
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Bookings;
