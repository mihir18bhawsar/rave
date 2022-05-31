import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Button } from "@material-ui/core";
import appconfig from "../appconfig";

function valuetext(value) {
  return `${value} Rs`;
}

export default function RangeSlider({ values, setValues }) {
  const [value, setValue] = React.useState([...values]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="flex p-0 w-full items-center flex-col gap-4">
      <div className="text-base uppercase my-4 font-bold text-slate-400 tracking-widest ">
        Price range
      </div>
      <Slider
        step={100}
        className="saturate-0 invert contrast-200 brightness-75"
        color="primary"
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        max={10000}
        min={0}
      />
      <div className="max-w-fit px-4 py-2 border-yellow-400 border-2 shadow-xl font-bold uppercase bg-slate-300">
        {value[0]} Rs - {value[1]} Rs
      </div>
      <Button
        variant="contained"
        style={{
          border: "2px solid " + appconfig.color.secondary,
          fontSize: "0.8em",
          padding: "0.2em 1em",
          background: appconfig.color.dark,
          fontWeight: "bold",
          color: appconfig.color.secondary,
        }}
        onClick={() => setValues(value)}
      >
        Apply
      </Button>
    </Box>
  );
}
