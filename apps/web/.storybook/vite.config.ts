/**
 * Minimal Vite config for Storybook.
 * Does NOT include react-router which requires a dedicated vite config file
 * and fails in Storybook's standalone build context.
 * @storybook/react-vite provides its own React transform.
 */
import { defineConfig } from "vite";
import { join, resolve, dirname } from "path";
import { fileURLToPath } from "url";
import tsconfigPaths from "vite-tsconfig-paths";

const __dirname = dirname(fileURLToPath(import.meta.url));
const webRoot = resolve(__dirname, "..");

export default defineConfig({
  // Resolve tsconfig path aliases (@/*, @/app/*, @/helpers/*, @/plane-web/*, @/styles/*)
  // exactly as the app does, so more-specific aliases win over the bare "@" prefix.
  plugins: [tsconfigPaths({ projects: [join(webRoot, "tsconfig.json")] })],
  resolve: {
    alias: {
      "next/link": join(webRoot, "app/compat/next/link.tsx"),
      "next/navigation": join(webRoot, "app/compat/next/navigation.ts"),
      "next/script": join(webRoot, "app/compat/next/script.tsx"),
    },
    dedupe: ["react", "react-dom"],
  },
  define: {
    "process.env": JSON.stringify({}),
  },
  server: {
    fs: {
      allow: [
        resolve(__dirname, ".."),           // apps/web
        resolve(__dirname, "../.."),        // monorepo root
        resolve(__dirname, "../node_modules"), // apps/web/node_modules
      ],
    },
  },
});
