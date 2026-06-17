import path from "node:path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths({ projects: [path.resolve(__dirname, "../tsconfig.json")] })],
  define: {
    // Some built workspace packages (e.g. @plane/constants) read process.env.* at module load.
    // Provide a stub so they resolve to empty strings in the browser instead of throwing.
    "process.env": {},
  },
  resolve: {
    alias: {
      "next/link": path.resolve(__dirname, "../app/compat/next/link.tsx"),
      "next/navigation": path.resolve(__dirname, "../app/compat/next/navigation.ts"),
      "next/script": path.resolve(__dirname, "../app/compat/next/script.tsx"),
    },
    dedupe: ["react", "react-dom", "@headlessui/react"],
  },
});
