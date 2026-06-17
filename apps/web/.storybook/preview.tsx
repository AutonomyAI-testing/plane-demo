import type { Preview } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
// plane imports
import { TranslationProvider } from "@plane/i18n";
// styles
import "../styles/globals.css";
// store
import { StoreProvider } from "@/lib/store-context";

const parameters: Preview["parameters"] = {
  controls: {
    matchers: {},
  },
};

function StorybookDecorator({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={false}>
      <StoreProvider>
        <TranslationProvider>{children}</TranslationProvider>
      </StoreProvider>
    </ThemeProvider>
  );
}

const preview: Preview = {
  parameters,
  decorators: [
    (Story) => (
      <StorybookDecorator>
        <Story />
      </StorybookDecorator>
    ),
  ],
  tags: ["autodocs"],
};

export default preview;
