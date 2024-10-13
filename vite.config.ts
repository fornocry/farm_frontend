import react from "@vitejs/plugin-react";
import viteCompression from 'vite-plugin-compression';
import {defineConfig} from "vite";
import {ViteImageOptimizer} from "vite-plugin-image-optimizer";

export default defineConfig({
    plugins: [react(),
        viteCompression(),
        ViteImageOptimizer({
            /* pass your config */
        }),],
    resolve: {},
});