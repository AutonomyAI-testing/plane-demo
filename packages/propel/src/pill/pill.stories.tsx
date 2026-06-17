import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Pill, EPillVariant, EPillSize, ERadius } from "./pill";
import { Tag, Star, AlertCircle, CheckCircle2, Info as InfoIcon, Zap, Bug } from "lucide-react";

const meta = {
  title: "Components/Pill",
  component: Pill,
  parameters: {
    layout: "padded",
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
    // Track pills in state to demonstrate interactive removal
    const [pills, setPills] = React.useState([
      { id: 1, variant: EPillVariant.DEFAULT, label: "Default" },
      { id: 2, variant: EPillVariant.PRIMARY, label: "Primary" },
      { id: 3, variant: EPillVariant.SUCCESS, label: "Success" },
      { id: 4, variant: EPillVariant.WARNING, label: "Warning" },
      { id: 5, variant: EPillVariant.ERROR, label: "Error" },
      { id: 6, variant: EPillVariant.INFO, label: "Info" },
    ]);

    const handleRemove = (id: number) => {
      setPills(pills.filter((p) => p.id !== id));
    };

    const handleReset = () => {
      setPills([
        { id: 1, variant: EPillVariant.DEFAULT, label: "Default" },
        { id: 2, variant: EPillVariant.PRIMARY, label: "Primary" },
        { id: 3, variant: EPillVariant.SUCCESS, label: "Success" },
        { id: 4, variant: EPillVariant.WARNING, label: "Warning" },
        { id: 5, variant: EPillVariant.ERROR, label: "Error" },
        { id: 6, variant: EPillVariant.INFO, label: "Info" },
      ]);
    };

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {pills.map((pill) => (
            <Pill key={pill.id} variant={pill.variant} removable onRemove={() => handleRemove(pill.id)}>
              {pill.label}
            </Pill>
          ))}
        </div>
        {pills.length === 0 && <p className="text-13 text-secondary">(All pills removed)</p>}
        <button
          onClick={handleReset}
          className="px-3 py-1.5 text-13 font-medium bg-surface-2 border border-subtle-1 rounded hover:bg-surface-1"
        >
          Reset
        </button>
      </div>
    );
  },
};

export const WithIcon: Story = {
  render() {
    return (
      <div className="flex flex-wrap gap-2">
        <Pill variant={EPillVariant.DEFAULT} icon={<Tag size={12} />}>
          Tag
        </Pill>
        <Pill variant={EPillVariant.PRIMARY} icon={<Star size={12} />}>
          Favorite
        </Pill>
        <Pill variant={EPillVariant.SUCCESS} icon={<CheckCircle2 size={12} />}>
          Verified
        </Pill>
        <Pill variant={EPillVariant.WARNING} icon={<AlertCircle size={12} />}>
          Warning
        </Pill>
        <Pill variant={EPillVariant.ERROR} icon={<AlertCircle size={12} />}>
          Error
        </Pill>
        <Pill variant={EPillVariant.INFO} icon={<InfoIcon size={12} />}>
          Info
        </Pill>
        <Pill variant={EPillVariant.MUTED} icon={<Zap size={12} />}>
          Muted
        </Pill>
      </div>
    );
  },
};

export const WithCount: Story = {
  render() {
    return (
      <div className="flex flex-wrap gap-2">
        <Pill variant={EPillVariant.ERROR} count={12}>
          Bugs
        </Pill>
        <Pill variant={EPillVariant.SUCCESS} count={3}>
          Resolved
        </Pill>
        <Pill variant={EPillVariant.WARNING} count="99+">
          Open Issues
        </Pill>
        <Pill variant={EPillVariant.PRIMARY} count={5}>
          New
        </Pill>
        <Pill variant={EPillVariant.INFO} count={24}>
          Comments
        </Pill>
      </div>
    );
  },
};

export const MutedVariant: Story = {
  render() {
    return (
      <div className="flex flex-wrap gap-2">
        <Pill variant={EPillVariant.MUTED}>Archived</Pill>
        <Pill variant={EPillVariant.MUTED}>Inactive</Pill>
        <Pill variant={EPillVariant.MUTED}>Deprecated</Pill>
        <Pill variant={EPillVariant.MUTED}>Legacy</Pill>
        <Pill variant={EPillVariant.MUTED}>Hidden</Pill>
      </div>
    );
  },
};

export const DisabledState: Story = {
  render() {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-13 font-medium">Disabled Pills</h3>
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
      </div>
    );
  },
};

export const FullyComposed: Story = {
  name: "Everything Combined",
  render() {
    // Demonstrates all pill features working together: icons, counts, and removal
    const [pills, setPills] = React.useState([
      { id: 1, label: "Feature Request", variant: EPillVariant.PRIMARY, count: 8 },
      { id: 2, label: "Bug", variant: EPillVariant.ERROR, count: 3 },
      { id: 3, label: "Completed", variant: EPillVariant.SUCCESS, count: 24 },
    ]);

    const handleRemove = (id: number) => {
      setPills(pills.filter((p) => p.id !== id));
    };

    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-13 font-medium">Full Power: Icon + Count + Removable</h3>
          <div className="flex flex-wrap gap-2">
            {pills.map((pill) => (
              <Pill
                key={pill.id}
                variant={pill.variant}
                icon={<Tag size={12} />}
                count={pill.count}
                removable
                onRemove={() => handleRemove(pill.id)}
              >
                {pill.label}
              </Pill>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-13 font-medium">All Features Showcase</h3>
          <div className="flex flex-wrap gap-2">
            <Pill
              variant={EPillVariant.WARNING}
              icon={<AlertCircle size={12} />}
              count={5}
              removable
              onRemove={() => {}}
            >
              In Progress
            </Pill>
            <Pill variant={EPillVariant.SUCCESS} icon={<CheckCircle2 size={12} />} count={12} size={EPillSize.LG}>
              Done
            </Pill>
            <Pill
              variant={EPillVariant.ERROR}
              icon={<Bug size={10} />}
              count="99+"
              size={EPillSize.SM}
              removable
              onRemove={() => {}}
            >
              Bugs
            </Pill>
            <Pill
              variant={EPillVariant.PRIMARY}
              icon={<Star size={12} />}
              radius={ERadius.SQUARE}
              removable
              onRemove={() => {}}
            >
              Square Radius
            </Pill>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-13 font-medium">Disabled + All Features</h3>
          <div className="flex flex-wrap gap-2">
            <Pill
              variant={EPillVariant.PRIMARY}
              icon={<Tag size={12} />}
              count={5}
              removable
              onRemove={() => {}}
              disabled
            >
              Disabled Pill
            </Pill>
            <Pill variant={EPillVariant.ERROR} icon={<AlertCircle size={12} />} disabled>
              Disabled Icon
            </Pill>
            <Pill variant={EPillVariant.MUTED} disabled>
              Disabled Muted
            </Pill>
          </div>
        </div>
      </div>
    );
  },
};
