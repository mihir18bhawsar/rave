import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import appconfig from "../appconfig";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import apiService from "../Api/apiService";
import Loading from "../Components/Loading";
import ConcertCard from "../Components/ConcertCard";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Home = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [concerts, setConcerts] = useState([]);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  useEffect(() => {
    apiService.get("/user/cities").then((res) => {
      setCities(res.data.data);
      apiService.get("/concert/recently-posted").then((res) => {
        setConcerts(res.data.data);
        setLoading(false);
      });
    });
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <div className="w-full p-12 bg-slate-800 opacity-90 brightness-110 flex flex-col items-center">
      {!isLoggedIn && (
        <>
          <div
            style={{
              height: 450,
              background:
                "linear-gradient(140deg, rgba(6,45,59,1) 0%, rgba(10,49,62,1) 75%, rgba(255,248,255,1) 75%)",
            }}
            className=" mt-4  contrast-125 text-8xl text-orange-400 opacity-90 tracking-tighter border-gray-100 border-4 font-black w-9/12 p-10 rounded-3xl"
          >
            RaveSquare
            <div
              style={{ letterSpacing: "0.3em" }}
              className="px-7 py-8 text-base font-light uppercase text-white"
            >
              Book your favorite concert today
            </div>
            <div className="flex mt-16">
              <Link to="/login">
                <Button
                  style={{
                    margin: "0 1em",
                    borderRadius: "1em",
                    padding: "1.2em 4em",
                    fontWeight: "600",
                    fontSize: "0.18em",
                    border: "3px solid " + appconfig.color.secondary,
                    color: appconfig.color.primary,
                    background:
                      "linear-gradient(31deg,  rgba(255,223,234,1) 0%, rgba(255,249,238,1) 100%)",
                  }}
                >
                  {" "}
                  Login{" "}
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  style={{
                    borderRadius: "1em",
                    padding: "1.2em 4em",
                    fontWeight: "600",
                    fontSize: "0.18em",
                    border: "3px solid " + appconfig.color.font,
                    color: "white",
                    background:
                      "linear-gradient(31deg,  rgba(255,123,34,1) 0%, rgba(255,249,38,1) 100%)",
                  }}
                >
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}
      {isLoggedIn && (
        <>
          <Carousel
            showArrows={true}
            infiniteLoop
            autoPlay={true}
            showThumbs={false}
            transitionTime={400}
            showStatus={false}
            showIndicators={false}
            width={"90vw"}
          >
            {concerts.map((con) => (
              <Link to={"/concert/" + con._id}>
                <div
                  className="w-full h-96 scale-120"
                  style={{
                    background: `url(${
                      appconfig.url + "/img/concerts/" + con.coverImage
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
              </Link>
            ))}
          </Carousel>
          <Link to="/concerts">
            <Button
              variant="contained"
              style={{ marginTop: "2em", fontSize: "1.5em" }}
            >
              Explore Concerts
            </Button>
          </Link>
        </>
      )}
      <hr className="border-yellow-400 border-2 w-8/12 mt-32 mb-10" />
      <div className="text-6xl font-black tracking-tighter text-white mb-16">
        Concerts across several cities
      </div>
      <div className="grid grid-cols-4 items-center gap-4 justify-center w-8/12">
        {cities.map((city) => (
          <div className="bg-yellow-400 shadow-slate-900 text-slate-900 shadow-2xl text-xl font-black uppercase flex items-center justify-center h-24">
            {city.name}
          </div>
        ))}
      </div>
      <hr className="border-yellow-400 border-2 w-8/12 mt-32 mb-10" />
      <div className="text-6xl font-black tracking-tighter text-white mb-16">
        Latest Concerts
      </div>
      <div className="grid items-center justify-items-center grid-cols-2 gap-12 w-9/12 ">
        {concerts.slice(0, 4).map((concert) => (
          <Link
            className={
              new Date(concert.timing.from) > new Date(Date.now()) &&
              "hover:brightness-125"
            }
            to={"/concert/" + concert._id}
          >
            <ConcertCard concert={concert} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
