import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bug, Tag, AlertCircle, CheckCircle2, Users, Folder } from "lucide-react";
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

export const Gallery: Story = {
  render() {
    return (
      <div className="space-y-8 p-4">
        {/* With Icon */}
        <div className="space-y-2">
          <h3 className="text-14 font-semibold">With Icon</h3>
          <div className="flex flex-wrap gap-2">
            <Pill variant={EPillVariant.DEFAULT} icon={<Tag size={14} />}>
              Tag
            </Pill>
            <Pill variant={EPillVariant.PRIMARY} icon={<Folder size={14} />}>
              Project
            </Pill>
            <Pill variant={EPillVariant.SUCCESS} icon={<CheckCircle2 size={14} />}>
              Success
            </Pill>
            <Pill variant={EPillVariant.WARNING} icon={<AlertCircle size={14} />}>
              Warning
            </Pill>
            <Pill variant={EPillVariant.ERROR} icon={<Bug size={14} />}>
              Bug
            </Pill>
            <Pill variant={EPillVariant.INFO} icon={<Users size={14} />}>
              Team
            </Pill>
          </div>
        </div>

        {/* With Count */}
        <div className="space-y-2">
          <h3 className="text-14 font-semibold">With Count</h3>
          <div className="flex flex-wrap gap-2">
            <Pill variant={EPillVariant.DEFAULT} count={5}>
              Tasks
            </Pill>
            <Pill variant={EPillVariant.PRIMARY} count={12}>
              Issues
            </Pill>
            <Pill variant={EPillVariant.SUCCESS} count={3}>
              Completed
            </Pill>
            <Pill variant={EPillVariant.WARNING} count="99+">
              Pending
            </Pill>
            <Pill variant={EPillVariant.ERROR} count={7}>
              Bugs
            </Pill>
          </div>
        </div>

        {/* Removable */}
        <div className="space-y-2">
          <h3 className="text-14 font-semibold">Removable</h3>
          <div className="flex flex-wrap gap-2">
            <Pill variant={EPillVariant.DEFAULT} onRemove={() => {}}>
              Removable
            </Pill>
            <Pill variant={EPillVariant.PRIMARY} onRemove={() => {}}>
              Click ×
            </Pill>
            <Pill variant={EPillVariant.SUCCESS} onRemove={() => {}}>
              Remove Me
            </Pill>
            <Pill variant={EPillVariant.WARNING} onRemove={() => {}}>
              Closeable
            </Pill>
            <Pill variant={EPillVariant.ERROR} onRemove={() => {}}>
              Delete
            </Pill>
          </div>
        </div>

        {/* Muted Variant */}
        <div className="space-y-2">
          <h3 className="text-14 font-semibold">Muted Variant</h3>
          <div className="flex flex-wrap gap-2">
            <Pill variant={EPillVariant.MUTED}>Archived</Pill>
            <Pill variant={EPillVariant.MUTED}>Inactive</Pill>
            <Pill variant={EPillVariant.MUTED}>Draft</Pill>
            <Pill variant={EPillVariant.MUTED}>Hidden</Pill>
          </div>
        </div>

        {/* Disabled */}
        <div className="space-y-2">
          <h3 className="text-14 font-semibold">Disabled</h3>
          <div className="flex flex-wrap gap-2">
            <Pill variant={EPillVariant.DEFAULT} disabled>
              Disabled
            </Pill>
            <Pill variant={EPillVariant.PRIMARY} disabled>
              Disabled
            </Pill>
            <Pill variant={EPillVariant.SUCCESS} disabled>
              Disabled
            </Pill>
            <Pill variant={EPillVariant.WARNING} disabled onRemove={() => {}}>
              Disabled (× hidden)
            </Pill>
            <Pill variant={EPillVariant.ERROR} disabled onRemove={() => {}}>
              Disabled (× hidden)
            </Pill>
          </div>
        </div>

        {/* Fully Combined */}
        <div className="space-y-2">
          <h3 className="text-14 font-semibold">Fully Combined</h3>
          <div className="flex flex-wrap gap-2">
            <Pill variant={EPillVariant.DEFAULT} icon={<Tag size={14} />} count={5} onRemove={() => {}}>
              All Features
            </Pill>
            <Pill variant={EPillVariant.PRIMARY} icon={<Folder size={14} />} count={12} onRemove={() => {}}>
              Project
            </Pill>
            <Pill variant={EPillVariant.SUCCESS} icon={<CheckCircle2 size={14} />} count={3} onRemove={() => {}}>
              Done
            </Pill>
            <Pill variant={EPillVariant.WARNING} icon={<AlertCircle size={14} />} count="99+" onRemove={() => {}}>
              Alerts
            </Pill>
            <Pill variant={EPillVariant.ERROR} icon={<Bug size={14} />} count={7} onRemove={() => {}}>
              Bugs
            </Pill>
            <Pill variant={EPillVariant.MUTED} icon={<Users size={14} />} count={2} onRemove={() => {}}>
              Team
            </Pill>
          </div>
        </div>
      </div>
    );
  },
};
