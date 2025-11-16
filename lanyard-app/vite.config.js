import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Build config updated for lanyard integration (.glb assets + custom entry)
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
  build: {
    outDir: '../site/js/lanyards',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        lanyards: resolve(__dirname, 'src/TeamLanyardsMount.jsx')
      },
      output: {
        entryFileNames: 'lanyards.js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    }
  }
})
