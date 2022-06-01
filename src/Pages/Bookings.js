import React, { useEffect, useState } from "react";
import apiservice from "../Api/apiService";
import Loading from "../Components/Loading";

const Bookings = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const x = async () => {
      const bookings = await apiservice.get("/user/me/bookings");
      console.log(bookings.data, "bookingasd");
      setLoading(false);
    };
    x();
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <div className="w-full h-full p-4">
      <div className="w-full h-full flex flex-col items-center rounded-3xl bg-slate-600">
        <div className="9/12 h-full grid grid-cols-4">hey</div>
      </div>
    </div>
  );
};

export default Bookings;
