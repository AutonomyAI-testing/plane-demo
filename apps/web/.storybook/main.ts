import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";
import { dirname, join } from "path";

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, "package.json")));
}

const config: StorybookConfig = {
  stories: ["../core/**/*.stories.@(ts|tsx)", "../ce/**/*.stories.@(ts|tsx)"],
  addons: [getAbsolutePath("@storybook/addon-docs")],
  framework: {
    name: getAbsolutePath("@storybook/react-vite") as any,
    options: {
      builder: {
        viteConfigPath: ".storybook/vite.config.ts",
      },
    },
  },
  async viteFinal(config) {
    const { default: tsconfigPaths } = await import("vite-tsconfig-paths");
    config.plugins = config.plugins || [];
    config.plugins.push(
      tsconfigPaths({
        projects: [path.resolve(__dirname, "../tsconfig.json")],
      })
    );

    // Next.js compatibility shims
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "next/link": path.resolve(__dirname, "../app/compat/next/link.tsx"),
      "next/navigation": path.resolve(__dirname, "../app/compat/next/navigation.ts"),
      "next/script": path.resolve(__dirname, "../app/compat/next/script.tsx"),
    };

    return config;
  },
};

export default config;
