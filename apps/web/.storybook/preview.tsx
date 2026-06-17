import type { Preview } from "@storybook/react-vite";
import "./storybook.css";

const preview: Preview = {
  parameters: {
    controls: { matchers: {} },
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default preview;
