import React, { useEffect, useState } from "react";
import apiService from "../Api/apiService";
import appconfig from "../appconfig";
import { useHistory } from "react-router-dom";
import { Box, TextField, Button } from "@material-ui/core";
import Loading from "../Components/Loading";

const CreateConcert = () => {
  const [price, setPrice] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [artist, setArtist] = useState("");
  const [artists, setArtists] = useState([]);
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");
  const [timingFrom, setTimingFrom] = useState(null);
  const [timingTo, setTimingTo] = useState(null);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [cover, setCover] = useState(null);
  const [cities, setCities] = useState([]);
  const [optional, setOptional] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  useEffect(() => {
    setLoading(true);
    const x = async () => {
      const cit = await apiService.get("/user/cities");
      setCities(cit.data.data.map((c) => c.name).sort());
      setLoading(false);
    };
    x();
  }, []);
  const onSubmit = async () => {
    const form = new FormData();
    form.append("price", price);
    form.append("name", name);
    form.append("description", description);
    form.append("venue[address]", address);
    form.append("venue[city]", city);
    form.append("totalSlots", 100);
    form.append("timing[to]", timingTo);
    form.append("timing[from]", timingFrom);
    form.append("coverImage", cover);
    var ins = document.getElementById("filesToUpload").files.length;
    for (var x = 0; x < ins; x++) {
      form.append(
        "optionalImages",
        document.getElementById("filesToUpload").files[x]
      );
    }

    artists.map((a, i) => form.append(`artist[${i}]`, a));
    tags.map((t, i) => form.append(`tags[${i}]`, t));

    try {
      await apiService.post("/concert/create", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      history.push("/");
    } catch (err) {
      alert(err?.message || "invalid data");
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="w-full mt-12 flex flex-col items-center justify-center">
      <Box
        style={{ backgroundColor: "rgba(125,125,125,0.5)" }}
        className="w-full border-x-4 border-white flex-col backdrop-blur-lg gap-8 flex items-center h-full sm:h-fit sm:w-5/12 rounded-3xl shadow-slate-800 shadow-2xl"
      >
        <h1
          className="uppercase mt-4 font-bold text-yellow-400 text-4xl"
          style={{ textShadow: `0 0 15px ${appconfig.color.secondary}` }}
        >
          Create Concert
        </h1>
        <p className="uppercase tracking-widest text-white text-xs">
          Please enter the details
        </p>
        <div className="flex flex-col h-96  items-center gap-8 w-full shadow-2xl">
          <form
            className="w-7/12 bg-transparent overflow-y-scroll hide-scrollbar p-4 pt-0 mt-4 flex flex-col items-center gap-8 py-8 h-full"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            <div className="flex flex-col items-center">
              <label className="text-white pb-2">Name</label>
              <input
                type="text"
                className="outline-0 border-0 p-2 rounded-xl"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div className="flex flex-col items-center">
              <label className="text-white pb-2">Price</label>
              <input
                type="number"
                className="outline-0 border-0 p-2 rounded-xl"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></input>
            </div>
            <div className="flex flex-col w-full items-center">
              <label className="text-white pb-2">Description</label>
              <textarea
                type="text"
                className="outline-0 border-0 p-4 px-8 rounded-xl"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="flex flex-col w-full items-center">
              <label className="text-white pb-2">Artists</label>
              <input
                type="text"
                className="outline-0 border-0 p-4 px-8 rounded-xl"
                placeholder="Artists"
                multiple
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
              ></input>
              <button
                className="px-6 border-2 border-black mt-2 rounded-full bg-yellow-400"
                onClick={(e) => {
                  e.preventDefault();
                  if (artist) {
                    setArtists([...artists, artist]);
                    setArtist("");
                    console.log(artists);
                  }
                }}
              >
                Add{" "}
              </button>
            </div>
            <div className="flex flex-col w-full items-center">
              <label className="text-white pb-2">Tags</label>
              <input
                type="text"
                className="outline-0 border-0 p-4 px-8 rounded-xl"
                placeholder="Tags"
                multiple
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              ></input>
              <button
                className="px-6 border-2 border-black mt-2 rounded-full bg-yellow-400"
                onClick={(e) => {
                  e.preventDefault();
                  if (tag) {
                    setTags([...tags, tag]);
                    setTag("");
                    console.log(tags);
                  }
                }}
              >
                Add{" "}
              </button>
            </div>
            <div className="flex flex-col items-center">
              <label className="text-white pb-2">Address</label>
              <input
                type="text"
                className="outline-0 border-0 p-2 rounded-xl"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></input>
            </div>
            <div className="flex flex-col items-center">
              <label className="text-white pb-2">City</label>
              <select
                name="cars"
                id="cars"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                {cities.map((cit) => (
                  <option value={cit}> {cit} </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-center">
              <label className="text-white pb-2">From</label>
              <input
                type="datetime-local"
                className="outline-0 border-0 p-2 rounded-xl"
                placeholder="From"
                value={timingFrom}
                onChange={(e) => setTimingFrom(e.target.value)}
              ></input>
            </div>
            <div className="flex flex-col items-center">
              <label className="text-white pb-2">To</label>
              <input
                type="datetime-local"
                className="outline-0 border-0 p-2 rounded-xl"
                placeholder="To"
                value={timingTo}
                onChange={(e) => setTimingTo(e.target.value)}
              ></input>
            </div>
            <div className="flex flex-col items-center">
              <label className="text-white pb-2">Cover Image</label>
              <input
                type="file"
                className="outline-0 border-0 p-2 rounded-xl"
                placeholder="Cover"
                onChange={(e) => setCover(e.target.files[0])}
              ></input>
            </div>
            <div className="flex flex-col items-center">
              <label className="text-white pb-2">optional Image</label>
              <input
                type="file"
                id="filesToUpload"
                multiple
                className="outline-0 border-0 p-2 rounded-xl"
                placeholder="Cover"
                onChange={(e) => setOptional(e.target.files)}
              ></input>
            </div>
            <Button
              className="bg-white invert saturate-0"
              variant="contained"
              size="large"
              color="secondary"
              type="submit"
            >
              Create concert
            </Button>
          </form>
        </div>
      </Box>
    </div>
  );
};
export default CreateConcert;
