import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlertCircle, ArrowUp, CalendarCheck } from "lucide-react";
import { Avatar } from "../avatar/avatar";
import { Tooltip } from "../tooltip/root";

// Types for mock data
type Priority = "urgent" | "high";
type PriorityIssue = {
  id: string;
  title: string;
  priority: Priority;
  state: string;
  date?: string;
};

type Assignee = {
  id: string;
  name: string;
  avatar: string;
  completed: number;
  total: number;
};

type Label = {
  id: string;
  name: string;
  color: string;
  completed: number;
  total: number;
};

// Mock data
const mockPriorityIssues: PriorityIssue[] = [
  {
    id: "PLANE-101",
    title: "Fix authentication flow on mobile devices",
    priority: "urgent",
    state: "In Progress",
    date: "Dec 15",
  },
  {
    id: "PLANE-98",
    title: "Performance regression in issue list view",
    priority: "high",
    state: "Todo",
    date: "Dec 18",
  },
  {
    id: "PLANE-95",
    title: "Notification emails not being sent",
    priority: "urgent",
    state: "In Progress",
    date: "Dec 12",
  },
  {
    id: "PLANE-87",
    title: "Kanban board drag and drop broken",
    priority: "high",
    state: "In Review",
    date: "Dec 20",
  },
];

const mockAssignees: Assignee[] = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "https://i.pravatar.cc/150?img=1",
    completed: 8,
    total: 12,
  },
  {
    id: "2",
    name: "Marcus Rivera",
    avatar: "https://i.pravatar.cc/150?img=2",
    completed: 5,
    total: 9,
  },
  {
    id: "3",
    name: "Priya Patel",
    avatar: "https://i.pravatar.cc/150?img=3",
    completed: 11,
    total: 11,
  },
  {
    id: "4",
    name: "Tom Nguyen",
    avatar: "https://i.pravatar.cc/150?img=4",
    completed: 2,
    total: 7,
  },
];

const mockLabels: Label[] = [
  { id: "1", name: "Frontend", color: "#3B82F6", completed: 6, total: 10 },
  { id: "2", name: "Backend", color: "#10B981", completed: 4, total: 8 },
  { id: "3", name: "Bug", color: "#EF4444", completed: 3, total: 5 },
  { id: "4", name: "Enhancement", color: "#F59E0B", completed: 7, total: 9 },
];

// Empty state component for when no data is available in a tab
const EmptyState = ({ title, assetAlt }: { title: string; assetAlt: string }) => (
  <div className="flex items-center justify-center h-full w-full">
    <div className="flex flex-col items-center justify-center gap-2 text-center">
      <div className="text-13 text-tertiary">{title}</div>
    </div>
  </div>
);

// Progress bar component showing completion status for assignees and labels
const ProgressBar = ({
  title,
  completed,
  total,
  onClick,
}: {
  title: React.ReactNode;
  completed: number;
  total: number;
  onClick?: () => void;
}) => {
  // Use fallback to 0 if division by zero occurs
  const percentage = Math.round((completed / total) * 100) || 0;
  return (
    <div
      className={`flex w-full items-center justify-between gap-4 rounded-xs p-1 text-11 ${
        onClick ? "cursor-pointer hover:bg-surface-2" : ""
      }`}
      onClick={onClick}
    >
      <div className="w-4/6 truncate">{title}</div>
      <div className="flex w-2/6 items-center justify-end gap-1 px-2">
        <div className="flex h-5 items-center justify-center gap-1">
          <span className="w-8 text-right">{percentage}%</span>
        </div>
        <span>of {total}</span>
      </div>
    </div>
  );
};

// Priority icon component
const PriorityIconComponent = ({ priority }: { priority: Priority }) => {
  if (priority === "urgent") {
    return (
      <div className="flex items-center justify-center h-5 w-5 rounded bg-danger-subtle">
        <AlertCircle className="h-3 w-3 text-danger" />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center h-5 w-5 rounded bg-warning-subtle">
      <ArrowUp className="h-3 w-3 text-warning" />
    </div>
  );
};

// State pill component with color-coded backgrounds for different issue states
const StatePill = ({ state }: { state: string }) => {
  const stateColors: Record<string, { bg: string; text: string }> = {
    Todo: { bg: "bg-layer-1", text: "text-tertiary" },
    "In Progress": { bg: "bg-primary-subtle", text: "text-primary" },
    "In Review": { bg: "bg-warning-subtle", text: "text-warning" },
    Done: { bg: "bg-success-subtle", text: "text-success" },
  };
  // Fall back to Todo styling for unknown states
  const colors = stateColors[state] || stateColors["Todo"];
  return (
    <div className={`flex items-center px-2 py-0.5 rounded-sm text-11 ${colors.bg} ${colors.text} truncate max-w-24`}>
      <span className="truncate">{state}</span>
    </div>
  );
};

// Main presentational component
type ActiveCycleStatsProps = {
  priorityIssues?: PriorityIssue[];
  assignees?: Assignee[];
  labels?: Label[];
  defaultTab?: "Priority-Issues" | "Assignees" | "Labels";
};

const ActiveCycleStatsComponent = ({
  priorityIssues = mockPriorityIssues,
  assignees = mockAssignees,
  labels = mockLabels,
  defaultTab = "Assignees",
}: ActiveCycleStatsProps) => {
  const [activeTab, setActiveTab] = useState<"Priority-Issues" | "Assignees" | "Labels">(defaultTab);

  const tabs = [
    { key: "Priority-Issues" as const, label: "Priority Issues" },
    { key: "Assignees" as const, label: "Assignees" },
    { key: "Labels" as const, label: "Labels" },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 min-h-[17rem] overflow-hidden bg-surface-1 border border-subtle rounded-lg w-full">
      {/* Tab navigation */}
      <div
        className="relative border-[0.5px] border-subtle rounded-sm bg-layer-1 p-[1px] grid"
        style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`relative z-[1] font-semibold text-11 rounded-[3px] py-1.5 focus:outline-none transition duration-500 ${
              activeTab === tab.key ? "text-tertiary bg-surface-1" : "text-placeholder hover:text-tertiary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="h-52 w-full overflow-y-auto text-secondary vertical-scrollbar scrollbar-sm">
        {activeTab === "Priority-Issues" && (
          <div className="flex flex-col gap-1">
            {priorityIssues.length > 0 ? (
              priorityIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="group flex cursor-pointer items-center justify-between gap-2 rounded-md hover:bg-surface-2 p-1"
                >
                  <div className="flex items-center gap-1.5 flex-grow w-full min-w-24 truncate">
                    <span className="flex-shrink-0 rounded bg-layer-1 px-1.5 py-0.5 text-11 text-secondary font-medium">
                      {issue.id}
                    </span>
                    <Tooltip content={issue.title}>
                      <span className="text-13 text-primary truncate">{issue.title}</span>
                    </Tooltip>
                  </div>
                  <PriorityIconComponent priority={issue.priority} />
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <StatePill state={issue.state} />
                    {issue.date && (
                      <Tooltip content={`Target Date: ${issue.date}`}>
                        <div className="h-full flex truncate items-center gap-1.5 rounded-sm text-11 px-2 py-0.5 bg-layer-1 group-hover:bg-surface-1 cursor-pointer">
                          <CalendarCheck className="h-3 w-3 flex-shrink-0" />
                          <span className="text-11 truncate">{issue.date}</span>
                        </div>
                      </Tooltip>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <EmptyState title="No priority issues found" assetAlt="Priority issues empty" />
            )}
          </div>
        )}

        {activeTab === "Assignees" && (
          <div className="flex flex-col gap-1">
            {assignees.length > 0 ? (
              assignees.map((assignee) => (
                <ProgressBar
                  key={assignee.id}
                  title={
                    <div className="flex items-center gap-2">
                      <Avatar name={assignee.name} src={assignee.avatar} size="sm" />
                      <span>{assignee.name}</span>
                    </div>
                  }
                  completed={assignee.completed}
                  total={assignee.total}
                />
              ))
            ) : (
              <EmptyState title="No assignees found" assetAlt="Assignees empty" />
            )}
          </div>
        )}

        {activeTab === "Labels" && (
          <div className="flex flex-col gap-1">
            {labels.length > 0 ? (
              labels.map((label) => (
                <ProgressBar
                  key={label.id}
                  title={
                    <div className="flex items-center gap-2 truncate">
                      <span
                        className="block h-3 w-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: label.color }}
                      />
                      <span className="text-11 truncate">{label.name}</span>
                    </div>
                  }
                  completed={label.completed}
                  total={label.total}
                />
              ))
            ) : (
              <EmptyState title="No labels found" assetAlt="Labels empty" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Story configuration
const meta = {
  title: "Cycles/ActiveCycleStats",
  component: ActiveCycleStatsComponent,
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-[20rem] w-full items-start justify-center p-4">
        <div className="w-full max-w-xl">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof ActiveCycleStatsComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story variants
export const AssigneeTab: Story = {
  args: {
    defaultTab: "Assignees",
  },
};

export const LabelTab: Story = {
  args: {
    defaultTab: "Labels",
  },
};

export const PriorityIssuesTab: Story = {
  args: {
    defaultTab: "Priority-Issues",
  },
};

export const EmptyAssignees: Story = {
  args: {
    defaultTab: "Assignees",
    assignees: [],
  },
};

export const EmptyLabels: Story = {
  args: {
    defaultTab: "Labels",
    labels: [],
  },
};

export const EmptyPriorityIssues: Story = {
  args: {
    defaultTab: "Priority-Issues",
    priorityIssues: [],
  },
};

export const AllEmpty: Story = {
  args: {
    defaultTab: "Assignees",
    assignees: [],
    labels: [],
    priorityIssues: [],
  },
};
