import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/": {
        target: "https://chat-backend-silk-nine.vercel.app",
        changeOrigin: true,
        secure: false
      }
    }
  }
})
