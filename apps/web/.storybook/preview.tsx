import type { Preview } from "@storybook/react-vite";
import "../styles/globals.css";

const parameters: Preview["parameters"] = {
  controls: {
    matchers: {},
  },
  backgrounds: {
    default: "light",
    values: [
      { name: "light", value: "#ffffff" },
      { name: "dark", value: "#1a1a1a" },
    ],
  },
};

const preview: Preview = {
  parameters,
};

export default preview;
