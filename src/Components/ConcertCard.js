import { Chip } from "@material-ui/core";
import React from "react";
import appconfig from "../appconfig";

const ConcertCard = ({ concert }) => {
  return (
    <div
      className={
        (new Date(concert.timing.from) < new Date(Date.now())
          ? "opacity-80 brightness-125 contrast-50 "
          : "opacity-100 ") +
        "w-96 h-auto flex cursor-pointer flex-col relative px-0 pb-4 rounded-3xl bg-gray-400 items-center justify-center gap-4"
      }
    >
      {new Date(concert.timing.from) < new Date(Date.now()) && (
        <div
          style={{
            textShadow:
              "0 0 40px black, 0 0 40px black,0 0 40px black,0 0 40px black,0 0 40px black",
          }}
          className="bg-transparent backdrop-brightness-50 brightness-200  flex items-center justify-center  w-full h-full absolute text-2xl font-bold tracking-wide text-white"
        >
          Unavailable
        </div>
      )}
      <img
        className="rounded-2xl"
        src={appconfig.url + "/img/concerts/" + concert.coverImage}
        alt="no mage"
      ></img>
      <div className="w-full px-2 flex items-end justify-between">
        <div className="text-lg px-2 text-slate-900 font-bold">
          {concert.name}
          <div className="text-sm text-slate-700 font-semibold">
            {concert.description}
          </div>
        </div>
        <Chip
          style={{
            fontWeight: "bold",
            color: "white",
            background: appconfig.color.dark,
          }}
          label={"Rs " + concert.price}
        />
      </div>
    </div>
  );
};

export default ConcertCard;
