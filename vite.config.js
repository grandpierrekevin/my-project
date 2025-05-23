import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Pages from 'vite-plugin-pages'
import path from 'path' 

export default defineConfig({
  base: '/my-project/',
  plugins: [
    react(),
    Pages({
      importMode: 'async', // active le lazy loading automatique des routes
      dirs: 'src/pages',
      extensions: ['jsx', 'js'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), 
    },
  },
})
