import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pill, EPillVariant, EPillSize } from "./pill";

// Reusable icon for story demonstrations
const CircleIcon = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <circle cx="6" cy="6" r="6" fill="currentColor" />
  </svg>
);

const meta = {
  title: "Components/Pill",
  component: Pill,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    children: "Default",
  },
} satisfies Meta<typeof Pill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Primary: Story = {
  args: {
    variant: EPillVariant.PRIMARY,
    children: "Primary",
  },
};

export const Success: Story = {
  args: {
    variant: EPillVariant.SUCCESS,
    children: "Success",
  },
};

export const Warning: Story = {
  args: {
    variant: EPillVariant.WARNING,
    children: "Warning",
  },
};

export const Error: Story = {
  args: {
    variant: EPillVariant.ERROR,
    children: "Error",
  },
};

export const Info: Story = {
  args: {
    variant: EPillVariant.INFO,
    children: "Info",
  },
};

export const Small: Story = {
  args: {
    size: EPillSize.SM,
    children: "Small",
  },
};

export const Medium: Story = {
  args: {
    size: EPillSize.MD,
    children: "Medium",
  },
};

export const Large: Story = {
  args: {
    size: EPillSize.LG,
    children: "Large",
  },
};

export const AllVariants: Story = {
  render() {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Pill variant={EPillVariant.DEFAULT}>Default</Pill>
          <Pill variant={EPillVariant.PRIMARY}>Primary</Pill>
          <Pill variant={EPillVariant.SUCCESS}>Success</Pill>
          <Pill variant={EPillVariant.WARNING}>Warning</Pill>
          <Pill variant={EPillVariant.ERROR}>Error</Pill>
          <Pill variant={EPillVariant.INFO}>Info</Pill>
        </div>
      </div>
    );
  },
};

export const AllSizes: Story = {
  render() {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Pill size={EPillSize.SM}>Small</Pill>
          <Pill size={EPillSize.MD}>Medium</Pill>
          <Pill size={EPillSize.LG}>Large</Pill>
        </div>
      </div>
    );
  },
};

export const WithNumbers: Story = {
  render() {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Pill variant={EPillVariant.PRIMARY}>3</Pill>
          <Pill variant={EPillVariant.SUCCESS}>12</Pill>
          <Pill variant={EPillVariant.WARNING}>99+</Pill>
          <Pill variant={EPillVariant.ERROR}>!</Pill>
        </div>
      </div>
    );
  },
};

export const StatusExamples: Story = {
  render() {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-13 font-medium">Task Status</h3>
          <div className="flex flex-wrap gap-2">
            <Pill variant={EPillVariant.DEFAULT}>Draft</Pill>
            <Pill variant={EPillVariant.WARNING}>In Progress</Pill>
            <Pill variant={EPillVariant.INFO}>In Review</Pill>
            <Pill variant={EPillVariant.SUCCESS}>Completed</Pill>
            <Pill variant={EPillVariant.ERROR}>Blocked</Pill>
          </div>
        </div>
      </div>
    );
  },
};

export const WithRemove: Story = {
  args: {
    variant: EPillVariant.WARNING,
    children: "In Progress",
    onRemove: () => alert("removed"),
  },
};

export const WithIcon: Story = {
  args: {
    variant: EPillVariant.PRIMARY,
    children: "Priority",
    icon: CircleIcon,
  },
};

export const WithCount: Story = {
  args: {
    variant: EPillVariant.ERROR,
    children: "Bugs",
    count: 12,
  },
};

export const Muted: Story = {
  args: {
    variant: EPillVariant.MUTED,
    children: "Optional",
  },
};

export const Disabled: Story = {
  args: {
    variant: EPillVariant.SUCCESS,
    children: "Completed",
    disabled: true,
  },
};

export const KitchenSink: Story = {
  render() {
    return (
      <div className="space-y-6">
        {/* Removable Pills */}
        <div className="space-y-2">
          <h3 className="text-13 font-medium text-secondary">Removable</h3>
          <div className="flex flex-wrap gap-2">
            <Pill variant={EPillVariant.DEFAULT} onRemove={() => {}}>
              Default
            </Pill>
            <Pill variant={EPillVariant.PRIMARY} onRemove={() => {}}>
              Primary
            </Pill>
            <Pill variant={EPillVariant.SUCCESS} onRemove={() => {}}>
              Success
            </Pill>
            <Pill variant={EPillVariant.WARNING} onRemove={() => {}}>
              Warning
            </Pill>
            <Pill variant={EPillVariant.ERROR} onRemove={() => {}}>
              Error
            </Pill>
            <Pill variant={EPillVariant.INFO} onRemove={() => {}}>
              Info
            </Pill>
          </div>
        </div>

        {/* With Icon */}
        <div className="space-y-2">
          <h3 className="text-13 font-medium text-secondary">With Icon</h3>
          <div className="flex flex-wrap gap-2">
            <Pill variant={EPillVariant.DEFAULT} icon={CircleIcon}>
              Default
            </Pill>
            <Pill variant={EPillVariant.PRIMARY} icon={CircleIcon}>
              Primary
            </Pill>
            <Pill variant={EPillVariant.SUCCESS} icon={CircleIcon}>
              Success
            </Pill>
          </div>
        </div>

        {/* With Count */}
        <div className="space-y-2">
          <h3 className="text-13 font-medium text-secondary">With Count</h3>
          <div className="flex flex-wrap gap-2">
            <Pill variant={EPillVariant.ERROR} count={12}>
              Bugs
            </Pill>
            <Pill variant={EPillVariant.WARNING} count={5}>
              Warnings
            </Pill>
            <Pill variant={EPillVariant.INFO} count={99}>
              Notifications
            </Pill>
          </div>
        </div>

        {/* Muted Variant */}
        <div className="space-y-2">
          <h3 className="text-13 font-medium text-secondary">Muted variant</h3>
          <div className="flex flex-wrap gap-2">
            <Pill variant={EPillVariant.MUTED}>Optional</Pill>
            <Pill variant={EPillVariant.MUTED}>Archived</Pill>
            <Pill variant={EPillVariant.MUTED}>Hidden</Pill>
            <Pill variant={EPillVariant.MUTED}>Inactive</Pill>
          </div>
        </div>

        {/* Disabled State */}
        <div className="space-y-2">
          <h3 className="text-13 font-medium text-secondary">Disabled</h3>
          <div className="flex flex-wrap gap-2">
            <Pill variant={EPillVariant.SUCCESS} disabled>
              Completed
            </Pill>
            <Pill variant={EPillVariant.WARNING} disabled>
              In Progress
            </Pill>
            <Pill variant={EPillVariant.ERROR} disabled>
              Blocked
            </Pill>
            <Pill variant={EPillVariant.PRIMARY} disabled>
              Active
            </Pill>
          </div>
        </div>

        {/* Combined Features */}
        <div className="space-y-2">
          <h3 className="text-13 font-medium text-secondary">Combined</h3>
          <div className="flex flex-wrap gap-2">
            <Pill variant={EPillVariant.ERROR} icon="🐛" count={12} onRemove={() => {}}>
              Bugs
            </Pill>
            <Pill variant={EPillVariant.WARNING} icon="⚡" count={3} onRemove={() => {}}>
              Priority
            </Pill>
            <Pill variant={EPillVariant.INFO} icon="👁" count={5} onRemove={() => {}}>
              In Review
            </Pill>
          </div>
        </div>
      </div>
    );
  },
};
