import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";

const config: StorybookConfig = {
  stories: ["../core/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    // Filter out react-router plugins that conflict with Storybook
    config.plugins = (config.plugins || []).filter((plugin) => {
      if (!plugin) return false;
      const pluginName = Array.isArray(plugin) ? plugin[0]?.name : (plugin as any)?.name;
      return !pluginName?.includes("react-router");
    });

    // Add path aliases manually since we're not using vite.config.ts plugins
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        "@": path.resolve(__dirname, "../core"),
        "@/app": path.resolve(__dirname, "../app"),
        "@/helpers": path.resolve(__dirname, "../helpers"),
        "@/plane-web": path.resolve(__dirname, "../ce"),
        "@/styles": path.resolve(__dirname, "../styles"),
        "next/link": path.resolve(__dirname, "../app/compat/next/link.tsx"),
        "next/navigation": path.resolve(__dirname, "../app/compat/next/navigation.ts"),
        "next/script": path.resolve(__dirname, "../app/compat/next/script.tsx"),
      },
    };

    return config;
  },
};

export default config;
