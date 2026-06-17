import type { Preview } from "@storybook/react-vite";
import "./tailwind.css";

// Shim Node's `process` global for workspace bundles (e.g. @plane/utils, @plane/constants)
// that reference it during module initialization, preventing "process is not defined" errors
// when running in the browser environment.
if (typeof (globalThis as any).process === "undefined") {
  (globalThis as any).process = { env: { NODE_ENV: "development" } };
}

const parameters: Preview["parameters"] = {
  controls: {
    matchers: {},
  },
};

const preview: Preview = {
  parameters,
  tags: ["autodocs"],
};
export default preview;
