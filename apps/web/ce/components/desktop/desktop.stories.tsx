import type { Meta, StoryObj } from "@storybook/react-vite";
import { Desktop } from "./desktop";

const meta = {
  title: "Web/Desktop",
  component: Desktop,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    name: "Avatar",
  },
} satisfies Meta<typeof Desktop>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default story showing the Desktop component with an anime character avatar.
 * Features a 280px circular avatar with blue-to-cyan gradient border.
 */
export const Default: Story = {
  args: {
    src: "https://i.pravatar.cc/280?img=35",
    name: "Anime Character",
  },
};

/**
 * Story with an anime-style avatar showing the gradient border effect.
 */
export const AnimeAvatar: Story = {
  args: {
    src: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Felix&backgroundColor=b6e3f4",
    name: "Anime Character",
  },
};

/**
 * Story with fallback when image fails to load.
 */
export const Fallback: Story = {
  args: {
    name: "John Doe",
    src: "invalid-url",
    fallbackBackgroundColor: "#028375",
    fallbackTextColor: "#ffffff",
    fallbackText: "JD",
  },
};

/**
 * Story with custom fallback colors.
 */
export const CustomFallbackColors: Story = {
  args: {
    name: "Alice Smith",
    src: "invalid-url",
    fallbackBackgroundColor: "#3b82f6",
    fallbackTextColor: "#ffffff",
  },
};
