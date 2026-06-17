import path from "node:path";
import { createRequire } from "node:module";
import { defineConfig } from "vite";

const webRoot = path.resolve(__dirname, "../../../apps/web");

/**
 * Dependency resolution strategy for cross-workspace components.
 * apps/web depends on packages (mobx, mobx-react, next-themes, etc.) that pnpm
 * does NOT hoist to packages/propel node_modules. We resolve these from apps/web
 * to ensure the cross-app component graph can find all dependencies.
 */
const webRequire = createRequire(path.join(webRoot, "package.json"));
const SHARED_DEPS = [
  "mobx",
  "mobx-react",
  "mobx-react-lite",
  "mobx-utils",
  "next-themes",
  "@headlessui/react",
  "lucide-react",
];
const sharedDepAliases = SHARED_DEPS.map((id) => {
  try {
    // Exact match pointing to the resolved entry file (not just directory).
    // This ensures Vite's import analysis resolves these from apps/web,
    // even when imported from prebuilt dist files in other workspace packages.
    return { find: id, replacement: webRequire.resolve(id) };
  } catch {
    return null;
  }
}).filter(Boolean) as { find: string; replacement: string }[];

export default defineConfig({
  resolve: {
    alias: [
      ...sharedDepAliases,
      // Next.js compatibility shims for apps/web components running in Storybook
      { find: "next/link", replacement: path.resolve(webRoot, "app/compat/next/link.tsx") },
      { find: "next/navigation", replacement: path.resolve(webRoot, "app/compat/next/navigation.ts") },
      { find: "next/script", replacement: path.resolve(webRoot, "app/compat/next/script.tsx") },
      { find: "next/image", replacement: path.resolve(webRoot, "app/compat/next/image.tsx") },
      // apps/web tsconfig path aliases — order matters: most specific patterns first
      { find: /^@\/app\/(.*)$/, replacement: path.resolve(webRoot, "app/$1") },
      { find: /^@\/helpers\/(.*)$/, replacement: path.resolve(webRoot, "helpers/$1") },
      { find: /^@\/plane-web\/(.*)$/, replacement: path.resolve(webRoot, "ce/$1") },
      { find: /^@\/styles\/(.*)$/, replacement: path.resolve(webRoot, "styles/$1") },
      { find: /^@\/(.*)$/, replacement: path.resolve(webRoot, "core/$1") },
      { find: /^ce\/(.*)$/, replacement: path.resolve(webRoot, "ce/$1") },
    ],
    dedupe: ["react", "react-dom", "@headlessui/react", "mobx", "mobx-react"],
  },
  server: {
    fs: {
      allow: [
        path.resolve(__dirname, "../../.."), // monorepo root: /home/user/plane-demo
      ],
    },
  },
  define: {
    "process.env": {},
  },
});
