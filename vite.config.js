import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    host: true,
  },
  preview: {
    port: 8080,
    host: true,
    // Esto permite que Railway muestre la app sin el error de "Blocked host"
    allowedHosts: true,
  },
});
