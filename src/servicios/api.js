import axios from "axios";

const API = axios.create({
  baseURL: "https://backendbaguette-production-ad38.up.railway.app",
});

export default API;
