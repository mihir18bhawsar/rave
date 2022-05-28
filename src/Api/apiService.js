import axios from "axios";

const rave = axios.create({
  baseURL: "https://rave-square.herokuapp.com",
});
export default rave;
