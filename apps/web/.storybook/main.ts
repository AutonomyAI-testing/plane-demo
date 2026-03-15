import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";

const config: StorybookConfig = {
  stories: ["../app/**/*.stories.@(ts|tsx)", "../core/**/*.stories.@(ts|tsx)"],
  addons: [],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: { autodocs: "tag" },
  staticDirs: ["../app/assets"],
  core: {
    disableTelemetry: true,
    // Disable loading the project's vite.config.ts
  },
  viteFinal: async (config) => {
    // Filter out react-router Vite plugins that conflict with Storybook
    if (config.plugins) {
      config.plugins = (config.plugins as any[]).filter((plugin) => {
        if (!plugin) return false;
        // Handle both single plugins and plugin arrays
        const getName = (p: any) => (typeof p === "object" && p && "name" in p ? p.name : "");
        if (Array.isArray(plugin)) {
          return !plugin.some((p) => getName(p).includes("react-router"));
        }
        const pluginName = getName(plugin);
        return !pluginName.includes("react-router");
      });
    }

    // Add tsconfigPaths plugin for alias resolution
    config.plugins = config.plugins || [];
    config.plugins.push(
      tsconfigPaths({ projects: [path.resolve(__dirname, "../tsconfig.json")] })
    );

    // Add aliases for Next.js compatibility shims
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "next/link": path.resolve(__dirname, "../app/compat/next/link.tsx"),
      "next/navigation": path.resolve(
        __dirname,
        "../app/compat/next/navigation.ts"
      ),
      "next/script": path.resolve(__dirname, "../app/compat/next/script.tsx"),
    };

    return config;
  },
};

export default config;
