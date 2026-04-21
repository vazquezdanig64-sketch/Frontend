import axios from "axios";

const API = axios.create({
  // Usamos la ruta completa directamente para asegurar la Fase 4
  baseURL: "https://backendbaguette-1.onrender.com/api/v1",
});

// Interceptor para la x-api-key (El Círculo de Seguridad)
API.interceptors.request.use((config) => {
  config.headers["x-api-key"] = "full-stack";
  return config;
});

export default API;
