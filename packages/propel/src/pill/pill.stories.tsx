import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pill, EPillVariant, EPillSize } from "./pill";

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

// Helper icons for story demonstrations - these inherit the pill's text color via currentColor
const CircleIcon = () => (
  <svg viewBox="0 0 16 16" className="size-3" fill="currentColor">
    <circle cx="8" cy="8" r="4" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 16 16" className="size-3" fill="currentColor">
    <path d="M8 2l1.5 4.5h4.5l-3.5 2.5 1.5 4.5L8 11l-3.5 2.5 1.5-4.5-3.5-2.5h4.5z" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 16 16" className="size-3" fill="currentColor">
    <path
      d="M13 4L6 11 3 8"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const WithIcon: Story = {
  render() {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Pill variant={EPillVariant.DEFAULT} icon={<CircleIcon />}>
            Default
          </Pill>
          <Pill variant={EPillVariant.PRIMARY} icon={<StarIcon />}>
            Primary
          </Pill>
          <Pill variant={EPillVariant.SUCCESS} icon={<CheckIcon />}>
            Success
          </Pill>
          <Pill variant={EPillVariant.WARNING} icon={<CircleIcon />}>
            Warning
          </Pill>
          <Pill variant={EPillVariant.ERROR} icon={<StarIcon />}>
            Error
          </Pill>
          <Pill variant={EPillVariant.INFO} icon={<CheckIcon />}>
            Info
          </Pill>
        </div>
      </div>
    );
  },
};

export const WithCount: Story = {
  render() {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Pill variant={EPillVariant.PRIMARY} count={12}>
            Bugs
          </Pill>
          <Pill variant={EPillVariant.SUCCESS} count={3}>
            PRs
          </Pill>
          <Pill variant={EPillVariant.INFO} count="99+">
            Comments
          </Pill>
          <Pill variant={EPillVariant.ERROR} count={5}>
            Issues
          </Pill>
          <Pill variant={EPillVariant.WARNING} count={7}>
            Pending
          </Pill>
        </div>
      </div>
    );
  },
};

export const Removable: Story = {
  render() {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {/* Empty onRemove handlers for demonstration - in production these would update state */}
          <Pill variant={EPillVariant.DEFAULT} removable onRemove={() => {}}>
            Default
          </Pill>
          <Pill variant={EPillVariant.PRIMARY} removable onRemove={() => {}}>
            Primary
          </Pill>
          <Pill variant={EPillVariant.SUCCESS} removable onRemove={() => {}}>
            Success
          </Pill>
          <Pill variant={EPillVariant.WARNING} removable onRemove={() => {}}>
            Warning
          </Pill>
          <Pill variant={EPillVariant.ERROR} removable onRemove={() => {}}>
            Error
          </Pill>
        </div>
      </div>
    );
  },
};

export const Muted: Story = {
  render() {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Pill variant={EPillVariant.MUTED}>Muted</Pill>
          <Pill variant={EPillVariant.MUTED} size={EPillSize.SM}>
            Small Muted
          </Pill>
          <Pill variant={EPillVariant.MUTED} size={EPillSize.LG}>
            Large Muted
          </Pill>
          <Pill variant={EPillVariant.MUTED} icon={<CircleIcon />}>
            With Icon
          </Pill>
        </div>
      </div>
    );
  },
};

export const Disabled: Story = {
  render() {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Pill variant={EPillVariant.DEFAULT} disabled>
            Default
          </Pill>
          <Pill variant={EPillVariant.PRIMARY} disabled>
            Primary
          </Pill>
          <Pill variant={EPillVariant.SUCCESS} disabled>
            Success
          </Pill>
          <Pill variant={EPillVariant.WARNING} disabled>
            Warning
          </Pill>
          <Pill variant={EPillVariant.ERROR} disabled>
            Error
          </Pill>
          <Pill variant={EPillVariant.INFO} disabled>
            Info
          </Pill>
        </div>
      </div>
    );
  },
};

export const FullCombination: Story = {
  render() {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-13 font-semibold">All Features Combined</h3>
          <div className="flex flex-wrap gap-2">
            {/* Demonstrates icon, count, and removable features together */}
            <Pill variant={EPillVariant.PRIMARY} icon={<StarIcon />} count={12} removable onRemove={() => {}}>
              Bugs
            </Pill>
            <Pill variant={EPillVariant.SUCCESS} icon={<CheckIcon />} count={3} removable onRemove={() => {}}>
              PRs
            </Pill>
            <Pill variant={EPillVariant.ERROR} icon={<CircleIcon />} count="99+">
              Comments
            </Pill>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-13 font-semibold">Muted + Removable</h3>
          <div className="flex flex-wrap gap-2">
            {/* Muted variant useful for tag lists and low-emphasis categorization */}
            <Pill variant={EPillVariant.MUTED} removable onRemove={() => {}}>
              Tag 1
            </Pill>
            <Pill variant={EPillVariant.MUTED} removable onRemove={() => {}}>
              Tag 2
            </Pill>
            <Pill variant={EPillVariant.MUTED} icon={<CircleIcon />} removable onRemove={() => {}}>
              Tag 3
            </Pill>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-13 font-semibold">Disabled + Icon</h3>
          <div className="flex flex-wrap gap-2">
            <Pill variant={EPillVariant.PRIMARY} icon={<StarIcon />} disabled>
              Disabled
            </Pill>
            <Pill variant={EPillVariant.SUCCESS} icon={<CheckIcon />} disabled>
              Disabled
            </Pill>
            <Pill variant={EPillVariant.ERROR} icon={<CircleIcon />} count={5} disabled>
              Disabled
            </Pill>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-13 font-semibold">Success + Icon + Count</h3>
          <div className="flex flex-wrap gap-2">
            <Pill variant={EPillVariant.SUCCESS} icon={<CheckIcon />} count={8}>
              Completed
            </Pill>
            <Pill variant={EPillVariant.SUCCESS} icon={<CheckIcon />} count={15}>
              Resolved
            </Pill>
            <Pill variant={EPillVariant.SUCCESS} icon={<CheckIcon />} count="25+">
              Merged
            </Pill>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-13 font-semibold">All Variants</h3>
          <div className="flex flex-wrap gap-2">
            <Pill variant={EPillVariant.DEFAULT}>Default</Pill>
            <Pill variant={EPillVariant.PRIMARY}>Primary</Pill>
            <Pill variant={EPillVariant.SUCCESS}>Success</Pill>
            <Pill variant={EPillVariant.WARNING}>Warning</Pill>
            <Pill variant={EPillVariant.ERROR}>Error</Pill>
            <Pill variant={EPillVariant.INFO}>Info</Pill>
            <Pill variant={EPillVariant.MUTED}>Muted</Pill>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-13 font-semibold">All Sizes</h3>
          <div className="flex items-center gap-2">
            <Pill size={EPillSize.XS}>Extra Small</Pill>
            <Pill size={EPillSize.SM}>Small</Pill>
            <Pill size={EPillSize.MD}>Medium</Pill>
            <Pill size={EPillSize.LG}>Large</Pill>
          </div>
        </div>
      </div>
    );
  },
};
