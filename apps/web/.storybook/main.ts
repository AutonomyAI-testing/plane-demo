import type { StorybookConfig } from "@storybook/react-vite";
import { join, dirname, resolve } from "path";

/*
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, "package.json")));
}

const config: StorybookConfig = {
  stories: ["../core/**/*.stories.@(ts|tsx)", "../ce/**/*.stories.@(ts|tsx)"],
  addons: [getAbsolutePath("@storybook/addon-docs")],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  core: {
    builder: {
      name: getAbsolutePath("@storybook/builder-vite"),
      options: {
        // Use a minimal Storybook-specific vite config that does NOT include
        // react-router (which fails in Storybook's standalone context)
        viteConfigPath: ".storybook/vite.config.ts",
      },
    },
  },
};

export default config;
