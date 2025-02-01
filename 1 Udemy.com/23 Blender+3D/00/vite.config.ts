import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";

export default defineConfig(() => {
  return {
    server: {
      host: true,
      port: 3000,
    },
    plugins: [glsl()],
    assetsInclude: ["**/*.glb"],
  };
});
