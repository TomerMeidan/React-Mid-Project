import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://tomermeidan.github.io/React-Mid-Project",
  plugins: [react()],
})
