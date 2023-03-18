import { fileURLToPath, URL } from "node:url";

import FullReload from 'vite-plugin-full-reload'

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), FullReload(['config/routes.rb', 'src/views/**/*'])
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
