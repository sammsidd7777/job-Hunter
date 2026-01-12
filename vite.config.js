import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 👈 allows other devices to connect
    port: 5173, // optional, default is 5173
  },
});
