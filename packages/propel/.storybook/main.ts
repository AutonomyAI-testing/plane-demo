import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";

import { join, dirname } from "path";

/*
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, "package.json")));
}
const config: StorybookConfig = {
  stories: [
    "../src/**/*.stories.@(ts|tsx)",
    "../../../apps/web/core/**/*.stories.@(ts|tsx)",
    "../../../apps/web/ce/**/*.stories.@(ts|tsx)",
    "../../../apps/web/ee/**/*.stories.@(ts|tsx)",
    "../../../apps/web/app/**/*.stories.@(ts|tsx)",
  ],
  addons: [getAbsolutePath("@storybook/addon-designs"), getAbsolutePath("@storybook/addon-docs")],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  viteFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = [
      ...(Array.isArray(config.resolve.alias)
        ? config.resolve.alias
        : Object.entries(config.resolve.alias || {}).map(([find, replacement]) => ({
            find,
            replacement: replacement as string,
          }))),
      // More-specific aliases MUST come before the catch-all "@/".
      // Use regex finds anchored to the prefix; path.resolve drops trailing
      // slashes, so we add "/" in the replacement to keep the joined path valid.
      { find: /^@\/app\//, replacement: path.resolve(__dirname, "../../../apps/web/app") + "/" },
      { find: /^@\/helpers\//, replacement: path.resolve(__dirname, "../../../apps/web/helpers") + "/" },
      { find: /^@\/plane-web\//, replacement: path.resolve(__dirname, "../../../apps/web/ce") + "/" },
      { find: /^@\/styles\//, replacement: path.resolve(__dirname, "../../../apps/web/styles") + "/" },
      { find: /^@\//, replacement: path.resolve(__dirname, "../../../apps/web/core") + "/" },
      { find: "next/link", replacement: path.resolve(__dirname, "../../../apps/web/app/compat/next/link.tsx") },
      {
        find: "next/navigation",
        replacement: path.resolve(__dirname, "../../../apps/web/app/compat/next/navigation.ts"),
      },
      { find: "next/script", replacement: path.resolve(__dirname, "../../../apps/web/app/compat/next/script.tsx") },
    ];
    config.assetsInclude = [...(Array.isArray(config.assetsInclude) ? config.assetsInclude : []), "**/*.webp"];
    config.resolve.dedupe = [...(config.resolve.dedupe || []), "react-router"];
    // @plane/constants reads process.env at runtime (mirrors apps/web/vite.config.ts).
    config.define = {
      ...(config.define || {}),
      "process.env": JSON.stringify({}),
    };
    return config;
  },
};
export default config;
