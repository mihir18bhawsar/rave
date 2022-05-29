import axios from "axios";

const rave = axios.create({
  baseURL: "https://rave-square.herokuapp.com",
});
rave.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    config.headers.Authorization = "";
  } else config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export default rave;
