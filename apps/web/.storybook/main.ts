import path from "node:path";
import type { StorybookConfig } from "@storybook/react-vite";

function getAbsolutePath(value: string) {
  return path.dirname(require.resolve(path.join(value, "package.json")));
}

const config: StorybookConfig = {
  stories: ["../core/**/*.stories.@(ts|tsx)"],
  addons: [getAbsolutePath("@storybook/addon-docs")],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {
      builder: {
        viteConfigPath: path.resolve(__dirname, "./vite.config.ts"),
      },
    },
  },
};

export default config;
