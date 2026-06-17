import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pill, EPillVariant, EPillSize } from "./pill";
import { Tag, Bug, Zap, AlertCircle, CheckCircle2, Circle } from "lucide-react";

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
  render() {
    return (
      <div className="space-y-4">
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
    );
  },
};

export const WithIcon: Story = {
  render() {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Pill variant={EPillVariant.DEFAULT} icon={<Tag className="h-3 w-3" />}>
            Tags
          </Pill>
          <Pill variant={EPillVariant.PRIMARY} icon={<Bug className="h-3 w-3" />}>
            Bugs
          </Pill>
          <Pill variant={EPillVariant.SUCCESS} icon={<CheckCircle2 className="h-3 w-3" />}>
            Done
          </Pill>
          <Pill variant={EPillVariant.WARNING} icon={<AlertCircle className="h-3 w-3" />}>
            Alert
          </Pill>
          <Pill variant={EPillVariant.ERROR} icon={<Circle className="h-3 w-3" />}>
            Blocked
          </Pill>
          <Pill variant={EPillVariant.INFO} icon={<Zap className="h-3 w-3" />}>
            Fast
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
            Open
          </Pill>
          <Pill variant={EPillVariant.WARNING} count={42}>
            Pending
          </Pill>
          <Pill variant={EPillVariant.ERROR} count={7}>
            Critical
          </Pill>
          <Pill variant={EPillVariant.INFO} count={99}>
            Tasks
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
          <Pill variant={EPillVariant.ERROR} disabled onRemove={() => {}}>
            With Remove
          </Pill>
          <Pill variant={EPillVariant.INFO} disabled icon={<Tag className="h-3 w-3" />}>
            With Icon
          </Pill>
        </div>
      </div>
    );
  },
};

export const FullGallery: Story = {
  render() {
    return (
      <div className="space-y-6">
        {/* Variants Section */}
        <div className="space-y-2">
          <h3 className="text-13 font-medium text-secondary mb-2">Variants</h3>
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

        {/* Sizes Section */}
        <div className="space-y-2">
          <h3 className="text-13 font-medium text-secondary mb-2">Sizes</h3>
          <div className="flex items-center gap-2">
            <Pill size={EPillSize.XS}>Extra Small</Pill>
            <Pill size={EPillSize.SM}>Small</Pill>
            <Pill size={EPillSize.MD}>Medium</Pill>
            <Pill size={EPillSize.LG}>Large</Pill>
          </div>
        </div>

        {/* With Icons Section */}
        <div className="space-y-2">
          <h3 className="text-13 font-medium text-secondary mb-2">With Icons</h3>
          <div className="flex flex-wrap gap-2">
            <Pill variant={EPillVariant.DEFAULT} icon={<Tag className="h-3 w-3" />}>
              Tags
            </Pill>
            <Pill variant={EPillVariant.PRIMARY} icon={<Bug className="h-3 w-3" />}>
              Bugs
            </Pill>
            <Pill variant={EPillVariant.SUCCESS} icon={<CheckCircle2 className="h-3 w-3" />}>
              Done
            </Pill>
            <Pill variant={EPillVariant.WARNING} icon={<AlertCircle className="h-3 w-3" />}>
              Alert
            </Pill>
          </div>
        </div>

        {/* With Count Section */}
        <div className="space-y-2">
          <h3 className="text-13 font-medium text-secondary mb-2">With Count</h3>
          <div className="flex flex-wrap gap-2">
            <Pill variant={EPillVariant.PRIMARY} count={12}>
              Bugs
            </Pill>
            <Pill variant={EPillVariant.SUCCESS} count={3}>
              Open
            </Pill>
            <Pill variant={EPillVariant.WARNING} count={42}>
              Pending
            </Pill>
            <Pill variant={EPillVariant.ERROR} count={7}>
              Critical
            </Pill>
          </div>
        </div>

        {/* With Remove Section */}
        <div className="space-y-2">
          <h3 className="text-13 font-medium text-secondary mb-2">With Remove</h3>
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
          </div>
        </div>

        {/* Disabled Section */}
        <div className="space-y-2">
          <h3 className="text-13 font-medium text-secondary mb-2">Disabled</h3>
          <div className="flex flex-wrap gap-2">
            <Pill variant={EPillVariant.DEFAULT} disabled>
              Default
            </Pill>
            <Pill variant={EPillVariant.PRIMARY} disabled>
              Primary
            </Pill>
            <Pill variant={EPillVariant.SUCCESS} disabled icon={<Tag className="h-3 w-3" />}>
              With Icon
            </Pill>
          </div>
        </div>

        {/* Combined Features Section */}
        <div className="space-y-2">
          <h3 className="text-13 font-medium text-secondary mb-2">Combined Features</h3>
          <div className="flex flex-wrap gap-2">
            <Pill variant={EPillVariant.PRIMARY} icon={<Bug className="h-3 w-3" />} count={12} onRemove={() => {}}>
              Bugs
            </Pill>
            <Pill
              variant={EPillVariant.SUCCESS}
              icon={<CheckCircle2 className="h-3 w-3" />}
              count={3}
              onRemove={() => {}}
            >
              Completed
            </Pill>
            <Pill
              variant={EPillVariant.WARNING}
              icon={<AlertCircle className="h-3 w-3" />}
              count={7}
              onRemove={() => {}}
            >
              Warnings
            </Pill>
          </div>
        </div>
      </div>
    );
  },
};
