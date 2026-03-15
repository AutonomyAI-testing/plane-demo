import type { Preview } from "@storybook/react-vite";
import React from "react";
import { ThemeProvider } from "next-themes";
import "@plane/tailwind-config/index.css";
import "@fontsource-variable/inter";

// Mock store context for components that need it
const MockStoreContext = React.createContext<any>(null);

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light">
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
