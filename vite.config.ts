import path from "path";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint(), splitVendorChunkPlugin()],
  server: {
    port: 3000
  },
  envPrefix: "PUB_",
  resolve: {
    alias: {
      "@config": path.resolve("src/common/config.ts"),
      "@utils": path.resolve("src/common/utils.ts"),
      "@services": path.resolve("src/common/services/index.ts"),
      "@schemas": path.resolve("src/common/schemas/index.ts"),
      "@typing": path.resolve("src/common/typing/"),
      "@context": path.resolve("src/context/index.ts"),
      "@hooks": path.resolve("src/hooks/index.ts"),
      "@hoc": path.resolve("src/hoc/index.ts"),
      "@components": path.resolve("src/components/index.ts"),
      "@contianers": path.resolve("src/contianers/index.ts"),
      "@pages": path.resolve("src/pages/"),
      "@pstyles": path.resolve("src/styles/pages/index.ts"),
      "@cstyles": path.resolve("src/styles/components/index.ts"),
      "@mixins": path.resolve("src/styles/Mixins.ts"),
      "@styles": path.resolve("src/styles/Globals.ts")
    }
  }
});
