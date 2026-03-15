import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { createContext } from "react";
import { ThemeProvider } from "next-themes";

// Mock the store context
const MockStoreContext = createContext<any>({
  instance: {
    isLoading: false,
    config: {
      enable_signup: true,
      is_google_enabled: true,
      is_github_enabled: true,
      is_gitlab_enabled: false,
      is_gitea_enabled: false,
      is_smtp_configured: true,
    },
    instance: {
      is_activated: true,
      is_setup_done: true,
    },
    error: undefined,
  },
});

// Mock the TranslationContext
const MockTranslationContext = createContext<any>({
  t: (key: string) => {
    const translations: Record<string, string> = {
      "auth.common.email.label": "Email",
      "auth.common.email.placeholder": "name@company.com",
      "auth.common.email.errors.invalid": "Please enter a valid email",
      "auth.common.new_to_plane": "New to Plane?",
      "auth.common.already_have_an_account": "Already have an account?",
      "common.continue": "Continue",
    };
    return translations[key] || key;
  },
  currentLocale: "en",
});

// Create a mock version of LoginPage that doesn't depend on actual stores
function MockLoginPage() {
  return (
    <div className="h-screen w-full overflow-hidden bg-surface-1">
      <div className="relative z-10 flex flex-col items-center w-screen h-screen overflow-hidden overflow-y-auto pt-6 pb-10 px-8">
        {/* Header */}
        <div className="flex items-center justify-between gap-6 w-full flex-shrink-0 sticky top-0">
          <a href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="95"
              height="20"
              viewBox="0 0 95 20"
              fill="none"
              className="text-primary"
            >
              <path
                d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.58 18 2 14.42 2 10C2 5.58 5.58 2 10 2C14.42 2 18 5.58 18 10C18 14.42 14.42 18 10 18Z"
                fill="currentColor"
              />
              <text x="25" y="15" fill="currentColor" fontSize="14" fontWeight="600">
                Plane
              </text>
            </svg>
          </a>
          <div className="flex flex-col items-end text-13 font-medium text-center sm:items-center sm:gap-2 sm:flex-row text-tertiary">
            <span className="text-body-sm-regular text-tertiary">New to Plane?</span>
            <a
              href="/sign-up"
              className="text-body-sm-semibold text-accent-primary hover:underline"
            >
              Sign up
            </a>
          </div>
        </div>

        {/* Auth Form */}
        <div className="flex flex-col justify-center items-center flex-grow w-full py-6 mt-10">
          <div className="relative flex flex-col gap-6 max-w-[22.5rem] w-full">
            {/* Auth Header */}
            <div className="text-center space-y-1 py-4">
              <h1 className="text-2xl font-semibold text-primary">Welcome back!</h1>
            </div>

            {/* OAuth Options */}
            <div className="flex flex-col gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-3 w-full h-10 px-4 rounded-md border border-strong bg-surface-1 hover:bg-surface-2 transition-colors"
              >
                <img
                  src="https://www.google.com/favicon.ico"
                  height={18}
                  width={18}
                  alt="Google Logo"
                />
                <span className="text-sm font-medium">Sign in with Google</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-3 w-full h-10 px-4 rounded-md border border-strong bg-surface-1 hover:bg-surface-2 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span className="text-sm font-medium">Sign in with GitHub</span>
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border-strong"></div>
              <span className="text-xs text-tertiary">or</span>
              <div className="flex-1 h-px bg-border-strong"></div>
            </div>

            {/* Email Form */}
            <form className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="email" className="text-13 text-tertiary font-medium">
                  Email
                </label>
                <div className="relative flex items-center rounded-md bg-surface-1 border border-strong">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@company.com"
                    className="h-10 w-full px-3 placeholder:text-placeholder bg-transparent border-0 focus:outline-none"
                    autoComplete="on"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full h-10 px-4 rounded-md bg-accent-primary text-on-color font-medium hover:bg-accent-primary-hover transition-colors"
              >
                Continue
              </button>
            </form>

            {/* Terms and Conditions */}
            <p className="text-xs text-tertiary text-center">
              By signing in, you agree to our{" "}
              <a href="#" className="text-accent-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-accent-primary hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center gap-6">
          <span className="text-13 text-tertiary whitespace-nowrap">
            Join 10,000+ teams building with Plane
          </span>
          <div className="flex items-center justify-center gap-x-10 gap-y-4 w-full flex-wrap">
            <div className="flex items-center justify-center h-7 flex-1 text-tertiary">
              Zerodha
            </div>
            <div className="flex items-center justify-center h-7 flex-1 text-tertiary">
              Sony
            </div>
            <div className="flex items-center justify-center h-7 flex-1 text-tertiary">
              Dolby
            </div>
            <div className="flex items-center justify-center h-7 flex-1 text-tertiary">
              Accenture
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const meta = {
  title: "Pages/Login",
  component: MockLoginPage,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light">
        <div className="font-body">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof MockLoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DarkTheme: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
        <div className="font-body dark">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};
