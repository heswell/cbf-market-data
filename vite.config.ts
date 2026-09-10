import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'reset.css': fileURLToPath(
        new URL('./src/vuu-reset.css', import.meta.url),
      ),
    },
  },
})
