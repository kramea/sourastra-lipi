import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/sourastra-lipi/', // GitHub Pages subpath
  server: {
    host: true, // Allow access from network (for testing on phone)
    port: 5173,
  }
})
