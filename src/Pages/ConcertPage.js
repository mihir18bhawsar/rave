import React, { useEffect, useState } from "react";
import apiservice from "../Api/apiService";
// import history from "../history";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import appconfig from "../appconfig";
import Loading from "../Components/Loading";
import { Chip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toastMessage } from "../Actions";
import history from "../history";

const ConcertPage = () => {
  const { id } = useParams();
  const [concert, setConcert] = useState();
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const role = useSelector((state) => state.role);
  const me = useSelector((state) => state.me);
  const dispatch = useDispatch();
  useEffect(() => {
    const asyncCall = async () => {
      try {
        setConcert((await apiservice.get("/concert/" + id)).data.data);
        console.log(concert);
        setLoading(false);
      } catch (err) {
        dispatch(toastMessage(0, "some error occured"));
        history.push("/concerts");
      }
    };
    asyncCall();
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <div className="w-full fixed top-0 overflow-hidden flex">
      <div
        className=" h-screen overflow-hidden top-0 w-8/12 -z-10 left-0 fixed"
        style={{
          flex: 1,
          backgroundImage: `url(${appconfig.url}/img/concerts/${concert.coverImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div
        style={{
          flex: 1,
          background:
            "linear-gradient(100deg,transparent 0%, transparent 52.8%,white 52.8%, white 53%, rgba(55,55,55,0.2) 53%, #283133 49%, #283133 100%)",
        }}
        className="font-black pt-20 pb-8 h-screen top-0 overflow-y-scroll flex flex-col gap-8 items-end w-full text-white"
      >
        <div className="my-4 text-yellow-400 text-5xl w-5/12">
          {concert.name}
        </div>
        <div className="font-light w-5/12 pl-2 text-xs uppercase tracking-widest">
          {concert.description}
        </div>
        {new Date(concert.timing.from) < new Date(Date.now()) && (
          <div className="px-2 text-xl w-5/12 font-bold  text-red-500">
            Unavailable
          </div>
        )}
        <div className=" font-light flex items-center w-5/12">
          <div className="px-2 font-bold text-yellow-400">Location: </div>
          {concert.venue.address + " " + concert.venue.city}
        </div>
        <div className=" font-light flex items-center w-5/12">
          <div className="px-2 font-bold text-yellow-400">From: </div>
          {new Date(concert.timing.from)
            .toString()
            .split(" ")
            .slice(0, 5)
            .join(" ")}
        </div>
        <div className=" font-light flex items-center w-5/12">
          <div className="px-2 font-bold text-yellow-400">To: </div>
          {new Date(concert.timing.to)
            .toString()
            .split(" ")
            .slice(0, 5)
            .join(" ")}
        </div>
        <div className=" invert font-light grid-cols-3 grid gap-4 pr-24 w-5/12">
          {[...concert.tags, ...concert.artist].map((c) => (
            <Chip label={c}></Chip>
          ))}
        </div>
        <div className="w-5/12">
          <div className="pl-2 font-bold items-center justify-center flex w-48 text-center p-2 gap-2 text-slate-800 mr-24 bg-yellow-400 rounded-full">
            <div className="font-bold">Price: </div>
            <div> Rs. {concert.price}</div>
          </div>
        </div>
        {concert.optionalImages.length > 0 && (
          <div className="w-5/12 p-4 pl-0">
            <div className="w-full pr-10 grid grid-cols-2 gap-8 items-center  text-center">
              {concert.optionalImages.map((i) => (
                <img
                  src={appconfig.url + "/img/concerts/" + i}
                  alt={"no pic"}
                  className="rounded-xl"
                ></img>
              ))}
            </div>
          </div>
        )}
        {!isLoggedIn && new Date(concert.timing.from) > new Date(Date.now()) && (
          <div className={"w-5/12"}>
            <Link to="/login">
              <div
                style={{
                  background:
                    "linear-gradient(128deg, rgba(91,255,45,1) 34%, rgba(0,255,94,1) 100%)",
                }}
                className="pl-2 font-bold  hover:scale-105 active:scale-95 duration-200 items-center justify-center flex w-48 text-center p-2 py-4 gap-2 text-slate-800 mr-24 bg-slate-700 rounded-xl"
              >
                Login To Book
              </div>
            </Link>
          </div>
        )}
        {isLoggedIn &&
          concert.postedBy != me &&
          new Date(concert.timing.from) > new Date(Date.now()) && (
            <div className={"w-5/12"}>
              <div
                style={{
                  background:
                    "linear-gradient(128deg, rgba(91,255,45,1) 34%, rgba(0,255,94,1) 100%)",
                }}
                className="pl-2 cursor-pointer hover:scale-105 active:scale-95 duration-200 font-bold items-center justify-center flex w-48 text-center p-2 py-4 gap-2 text-slate-800 mr-24 bg-yellow-400 rounded-xl"
                onClick={() => {
                  history.push({
                    pathname: "/payment",
                    state: {
                      concert,
                    },
                  });
                }}
              >
                Book Now
              </div>
            </div>
          )}
        {isLoggedIn &&
          concert.postedBy == me &&
          new Date(concert.timing.from) > new Date(Date.now()) && (
            <div className={"w-5/12"}>
              <div
                style={{
                  background:
                    "linear-gradient(128deg, rgba(255,91,45,1) 34%, rgba(255,94,0,1) 100%)",
                }}
                className="pl-2 cursor-pointer hover:scale-105 active:scale-95 duration-200 font-bold items-center justify-center flex w-48 text-center p-2 py-4 gap-2 text-slate-800 mr-24 bg-yellow-400 rounded-xl"
              >
                Edit
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default ConcertPage;
