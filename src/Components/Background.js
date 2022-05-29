import React from "react";

const Background = () => {
  return (
    <div
      className="fixed -z-10 w-full h-screen brightness-50 contrast-75 saturate-150"
      style={{
        backgroundImage:
          "url(https://i.pinimg.com/originals/da/4c/07/da4c07d5ec2147069d3abd71b27f223e.gif)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></div>
  );
};

export default Background;
