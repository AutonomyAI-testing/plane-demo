import type { Preview } from "@storybook/react-vite";
import "../styles/globals.css";
import React from "react";
import { ThemeProvider } from "next-themes";
import { TranslationProvider } from "@plane/i18n";

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: { matchers: {} },
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light">
        <TranslationProvider>
          <div className="p-4">
            <Story />
          </div>
        </TranslationProvider>
      </ThemeProvider>
    ),
  ],
};

export default preview;
