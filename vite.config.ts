import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // The prerender step reads dist/index.html as its shell, so keep it emitted.
    outDir: 'dist',
    emptyOutDir: true,
    // scripts/prerender.mjs reads the manifest to emit a modulepreload for each
    // split route's chunk. See src/routeView.tsx.
    manifest: true,
  },
})
