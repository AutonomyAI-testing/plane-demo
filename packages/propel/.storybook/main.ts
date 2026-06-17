import path, { join, dirname } from "path";
import { mergeConfig } from "vite";
import type { StorybookConfig } from "@storybook/react-vite";

/**
 * Resolve the absolute path of a package for Storybook addon registration.
 * Required for Yarn PnP and monorepo setups to correctly locate node_modules.
 */
function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, "package.json")));
}
const config: StorybookConfig = {
  stories: [
    "../src/**/*.stories.@(ts|tsx)",
    // Include stories from apps/web/core for cross-app component documentation
    "../../../apps/web/core/**/*.stories.@(ts|tsx)",
  ],
  addons: [getAbsolutePath("@storybook/addon-designs"), getAbsolutePath("@storybook/addon-docs")],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {
      builder: {
        viteConfigPath: ".storybook/vite.config.ts",
      },
    },
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      server: {
        fs: {
          // Allow Storybook dev server to access files across the entire monorepo
          // for cross-workspace imports (apps/web components importing from packages/*)
          allow: [path.resolve(__dirname, "../../..")],
        },
      },
    });
  },
};
export default config;
