import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Badge } from "./badge";
import type { TBadgeVariant } from "./helper";

const meta: Meta<typeof Badge> = {
  title: "Badge",
  component: Badge,
  parameters: {
    layout: "padded",
  },
  args: {
    children: "Badge",
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    variant: "primary",
    children: "Info",
  },
};

const variantGroups: { title: string; items: { variant: TBadgeVariant; label: string }[] }[] = [
  {
    title: "Primary",
    items: [
      { variant: "primary", label: "Info" },
      { variant: "accent-primary", label: "Info" },
      { variant: "outline-primary", label: "Info" },
    ],
  },
  {
    title: "Success",
    items: [
      { variant: "success", label: "Success" },
      { variant: "accent-success", label: "Success" },
      { variant: "outline-success", label: "Success" },
    ],
  },
  {
    title: "Warning",
    items: [
      { variant: "warning", label: "Warning" },
      { variant: "accent-warning", label: "Warning" },
      { variant: "outline-warning", label: "Warning" },
    ],
  },
  {
    title: "Destructive",
    items: [
      { variant: "destructive", label: "Error" },
      { variant: "accent-destructive", label: "Error" },
      { variant: "outline-destructive", label: "Error" },
    ],
  },
  {
    title: "Neutral",
    items: [
      { variant: "neutral", label: "Neutral" },
      { variant: "accent-neutral", label: "Neutral" },
      { variant: "outline-neutral", label: "Neutral" },
    ],
  },
];

export const AllStatusVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-6">
      {variantGroups.map((group) => (
        <div key={group.title} className="flex flex-col gap-2">
          <h3 className="text-13 font-semibold text-secondary">{group.title}</h3>
          <div className="flex flex-wrap items-center gap-3">
            {group.items.map((item) => (
              <Badge key={item.variant} variant={item.variant}>
                {item.label}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};
