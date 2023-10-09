import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src"
    }
  },
  base: '/web',
  build: {
    outDir: "../test/public/web"
  },
  // server: {
  //   proxy: {
  //     "/comfyui": {
  //       target: "http://127.0.0.1:8188",
  //       changeOrigin: true,
  //       ws: true,
  //       rewrite: (path) => path.replace(/^\/comfyui/, '')
  //     }
  //   }
  // }
})
