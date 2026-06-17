import path from "node:path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  define: {
    "process.env": JSON.stringify({}),
  },
  plugins: [tsconfigPaths({ projects: [path.resolve(__dirname, "../tsconfig.json")] })],
  resolve: {
    alias: {
      // Next.js compatibility shims
      "next/link": path.resolve(__dirname, "../app/compat/next/link.tsx"),
      "next/navigation": path.resolve(__dirname, "../app/compat/next/navigation.ts"),
      "next/script": path.resolve(__dirname, "../app/compat/next/script.tsx"),
    },
    dedupe: ["react", "react-dom", "@headlessui/react"],
  },
});
