import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [react(), tsconfigPaths(), tailwindcss()],
    server: {
        port: 3000,
    },
    preview: {
        port: 3000,
    },
})
