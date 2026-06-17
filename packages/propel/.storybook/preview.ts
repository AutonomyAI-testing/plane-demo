import type { Preview } from "@storybook/react-vite";
import React from "react";
import { observer } from "mobx-react";
import { TranslationProvider, TranslationContext } from "@plane/i18n";
import "./tailwind.css";

const parameters: Preview["parameters"] = {
  controls: {
    matchers: {},
  },
};

/**
 * Translations in @plane/i18n load asynchronously in the store constructor.
 * The page-level view components are plain function components (not mobx
 * observers), so they don't re-render when translations finish loading and
 * end up showing raw i18n keys. This observer gate subscribes to the store's
 * loading state and re-renders the story once translations are ready.
 */
const TranslationGate = observer(function TranslationGate({ children }: { children: React.ReactNode }) {
  const store = React.useContext(TranslationContext);
  // Touch the observable so this component re-renders when loading completes.
  const ready = store ? !store.isLoading : true;
  return React.createElement(React.Fragment, { key: ready ? "ready" : "loading" }, children);
});

const preview: Preview = {
  parameters,
  tags: ["autodocs"],
  decorators: [
    (Story) =>
      React.createElement(
        TranslationProvider,
        null,
        React.createElement(TranslationGate, null, React.createElement(Story))
      ),
  ],
};
export default preview;
