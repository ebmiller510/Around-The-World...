import path from 'path'
import 'dotenv/config'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // this specifies where the app runs if it's not in the default
  // basically saying where it should look for the index.html file
  root: path.resolve(__dirname, 'frontend'),
  envFile: path.resolve(__dirname, '.env'),
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    }
  }
})