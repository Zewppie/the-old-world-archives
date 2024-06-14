import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host : true,
    port : 8081, // o back usa 8080
    watch : {
      usePolling : true // para que funcione em windows
    }
  }
})
