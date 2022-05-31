import React, { useEffect, useState } from "react";
import ConcertCard from "../Components/ConcertCard";
import Loading from "../Components/Loading";
import apiService from "../Api/apiService";
import { Link } from "react-router-dom";
import Range from "../Components/Range";
import { Pagination } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import appconfig from "../appconfig";
import { Button } from "@mui/material";
import {
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@material-ui/core";

const Concerts = () => {
  const [loading, setLoading] = useState(true);
  const [concerts, setConcerts] = useState([]);
  const [values, setValues] = useState([0, 10000]);
  const [page, setPage] = useState(1);
  const [city, setCity] = useState(null);
  const [cities, setCities] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [finalSearchValue, setFinalSearchValue] = useState();

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  useEffect(() => {
    setLoading(true);
    const asyncCall = async () => {
      const cit = await apiService.get("/user/cities");
      setCities(cit.data.data.map((c) => c.name).sort());
      const res = await apiService.get("/concert?page=" + page || "1");
      setLoading(false);
      console.log(concerts[0]);
      setConcerts(res.data.data);
      let unfiltered = res.data.data;
      if (values.length > 0) {
        unfiltered = unfiltered?.filter(
          (c) => c.price >= values[0] && c.price <= values[1]
        );
      }
      if (city) {
        unfiltered = unfiltered?.filter((c) => c.venue.city === city);
      }
      if (finalSearchValue) {
        unfiltered = unfiltered?.filter((c) =>
          c.name.toLowerCase().includes(finalSearchValue.toLowerCase())
        );
      }
      setConcerts(unfiltered);
    };
    asyncCall();
  }, [values, page, city, finalSearchValue]);
  return loading ? (
    <Loading />
  ) : (
    <div className="flex  w-full">
      <div style={{ flex: 1 }}></div>
      <div
        style={{ flex: 1 }}
        className="bg-slate-800 fixed h-screen top-0 left-0  p-12 pt-24 flex flex-col items-center"
      >
        <Search className="invert border-2 border-black rounded-xl ">
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            value={searchValue}
            autoFocus
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <Button
          variant="contained"
          style={{
            border: "2px solid " + appconfig.color.secondary,
            fontSize: "0.8em",
            padding: "0.2em 1em",
            background: appconfig.color.dark,
            fontWeight: "bold",
            color: appconfig.color.secondary,
            margin: "1em 0 3em 0em",
          }}
          onClick={() => setFinalSearchValue(searchValue)}
        >
          Search
        </Button>
        <div className="border-2 border-slate-500 text-center font-bold uppercase p-4 mb-4 bg-slate-300 rounded text-xl opacity-80 w-full text-slate-900">
          Apply Filters
        </div>
        <div className="w-full">
          <Range setValues={setValues} values={values} />
        </div>
        <hr className="w-1/12 bg-white my-8 border-none h-1" />
        <Box className="flex invert p-0 w-full items-center flex-col gap-4">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">City</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={city}
              label="Age"
              onChange={(e) => setCity(e.target.value)}
            >
              {cities.map((c) => (
                <MenuItem value={c}>
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      <div style={{ flex: 3 }} className="items-center flex-col flex">
        <div className="grid items-center justify-items-center grid-cols-2 gap-12 p-10">
          {concerts.map((concert) => (
            <Link
              className={
                concert.isActive
                  ? "hover:brightness-125"
                  : "pointer-events-none"
              }
              to={"/concert" + concert._id}
            >
              <ConcertCard concert={concert} />
            </Link>
          ))}
        </div>
        <Pagination
          className="invert "
          color="primary"
          count={
            concerts.length % 10
              ? parseInt(concerts.length / 10) + 1
              : parseInt(concerts.length / 10)
          }
          page={page}
          onChange={(e) => setPage(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Concerts;
