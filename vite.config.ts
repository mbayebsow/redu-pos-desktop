import { resolve } from 'path'
import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src/renderer/',
  build: {
    rollupOptions: {
      output: {
        dir: './out/renderer'
      },
      input: {
        main: resolve('src/renderer/index.html')
      }
    }
  },
  plugins: [react()]
})
