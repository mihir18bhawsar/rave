import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
  return (
    <div className="w-full h-full text-white text-2xl gap-10 backdrop-blur-lg brightness-200 flex flex-col items-center justify-center">
      <CircularProgress size={60} color="warning" />
      Loading...
    </div>
  );
};

export default Loading;
