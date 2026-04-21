import axios from "axios";

const API = axios.create({
  // URL base limpia sin subrutas
  baseURL: import.meta.env.VITE_API_URL || "https://backendbaguette-1.com",
});

// Interceptor para la seguridad (Fase 4)
API.interceptors.request.use((config) => {
  config.headers["x-api-key"] = "full-stack";
  return config;
});

export default API;
