import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { execSync } from "node:child_process";

const appVersion = execSync("git rev-parse --short HEAD", { encoding: "utf8" }).trim();

export default defineConfig({
  base: "./",
  plugins: [svelte()],
  define: {
    "import.meta.env.VITE_APP_VERSION": JSON.stringify(appVersion)
  },
  server: {
    host: "127.0.0.1",
    port: 5173
  },
  preview: {
    host: "127.0.0.1",
    port: 4173
  }
});
