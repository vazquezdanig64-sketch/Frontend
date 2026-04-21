import axios from "axios";

// Si existe la variable de entorno la usa, si no, usa la de Render directamente
const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://backendbaguette-1.onrender.com/api/v1",
});

export default API;
