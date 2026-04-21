import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://backendbaguette-1.onrender.com/api/v1",
});

// Este interceptor añade la API KEY a todas las peticiones automáticamente
API.interceptors.request.use((config) => {
  config.headers["x-api-key"] = "full-stack"; // Debe ser igual a la variable API_KEY en Render
  return config;
});

export default API;
