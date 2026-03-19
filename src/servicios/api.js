import axios from "axios";

const API = axios.create({
  baseURL: "https://backendbaguette-production-ad38.up.railway.app/api/v1",
});

export default API;
