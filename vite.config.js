import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/": {
        target: import.meta.env.VITE_REACT_APP_BACKEND_URL,
        changeOrigin: true,
        secure: false
      }
    }
  }
})
