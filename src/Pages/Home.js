import { Button } from "@material-ui/core";
import React from "react";
import appconfig from "../appconfig";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  return (
    <div className="w-full p-4 flex flex-col items-center">
      {!isLoggedIn && (
        <>
          <div
            style={{
              height: 450,
              background:
                "linear-gradient(140deg, rgba(6,45,59,1) 0%, rgba(10,49,62,1) 75%, rgba(255,248,255,1) 75%)",
            }}
            className=" mt-4 text-8xl text-orange-400 opacity-90 tracking-tighter border-gray-100 border-4 font-black w-9/12 p-10 rounded-3xl"
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
    </div>
  );
};

export default Home;
