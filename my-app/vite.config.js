import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { reactCompilerPreset } from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_URL_CONFIG, // 👈 đúng chỗ này
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
