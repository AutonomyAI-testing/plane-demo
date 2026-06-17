import { Fragment, useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tab } from "@headlessui/react";
import { CalendarCheck } from "lucide-react";
import { cn } from "../utils/classname";
import { Avatar } from "../avatar/avatar";
import { Skeleton } from "../skeleton/index";
import { PriorityIcon } from "../icons/priority-icon";

// ===========================
// Types
// ===========================

type Priority = "urgent" | "high" | "medium" | "low" | "none";

type PriorityIssue = {
  id: string;
  name: string;
  priority: Priority;
  state: string;
  date?: string;
};

type Assignee = {
  name: string;
  avatar: string | null;
  completed: number;
  total: number;
};

type Label = {
  name: string;
  color: string;
  completed: number;
  total: number;
};

type ActiveCycleStatsProps = {
  isLoading?: boolean;
  loadingTab?: "priority" | "assignees" | "labels" | null;
  defaultTab?: number;
  priorityIssues?: PriorityIssue[];
  assignees?: Assignee[];
  labels?: Label[];
};

// ===========================
// Helper Components
// ===========================

function StatePill({ state }: { state: string }) {
  return (
    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-layer-1 text-11 text-tertiary max-w-24 truncate">
      <span className="h-2 w-2 rounded-full bg-accent-primary flex-shrink-0" />
      <span className="truncate">{state}</span>
    </div>
  );
}

function SingleProgressStats({
  title,
  completed,
  total,
  onClick,
}: {
  title: React.ReactNode;
  completed: number;
  total: number;
  onClick?: () => void;
}) {
  // Round to whole percentage to avoid cluttering the UI with decimals
  const percentage = Math.round((completed / total) * 100);

  return (
    <div
      className={cn("flex w-full items-center justify-between gap-4 rounded-xs p-1 text-11", {
        "cursor-pointer hover:bg-surface-2": onClick,
      })}
      onClick={onClick}
    >
      <div className="w-4/6">{title}</div>
      <div className="flex w-2/6 items-center justify-end gap-1 px-2">
        <div className="flex h-5 items-center justify-center gap-1">
          {/* Guard against NaN when total is 0 */}
          <span className="w-8 text-right">{isNaN(percentage) ? "0" : percentage}%</span>
        </div>
        <span className="whitespace-nowrap">of {total}</span>
      </div>
    </div>
  );
}

function SimpleEmptyState({ title, svgPlaceholder }: { title: string; svgPlaceholder?: React.ReactNode }) {
  const defaultSvg = (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" opacity="0.3" />
      <circle cx="60" cy="60" r="4" fill="currentColor" opacity="0.3" />
    </svg>
  );

  return (
    <div className="flex flex-col items-center justify-center gap-3 text-center">
      {/* Low opacity for subtle visual indicator without drawing too much attention */}
      <div className="text-tertiary opacity-40">{svgPlaceholder || defaultSvg}</div>
      <p className="text-13 text-tertiary font-medium">{title}</p>
    </div>
  );
}

// ===========================
// Main Presentational Component
// ===========================

export function ActiveCycleStatsDisplay({
  isLoading = false,
  loadingTab = null,
  defaultTab = 1,
  priorityIssues = [],
  assignees = [],
  labels = [],
}: ActiveCycleStatsProps) {
  const [selectedIndex, setSelectedIndex] = useState(defaultTab);

  // Full card loading state - show skeleton when entire component is loading
  if (isLoading && !loadingTab) {
    return (
      <Skeleton className="flex flex-col gap-4 p-4 min-h-[17rem] overflow-hidden bg-surface-1 border border-subtle rounded-lg">
        <Skeleton.Item width="100%" height="17rem" />
      </Skeleton>
    );
  }

  const TabLoaders = () => (
    <Skeleton className="space-y-3">
      <Skeleton.Item height="30px" />
      <Skeleton.Item height="30px" />
      <Skeleton.Item height="30px" />
    </Skeleton>
  );

  // Shared tab styling - selected tabs get surface background and tertiary text
  const tabClassName = ({ selected }: { selected: boolean }) =>
    cn(
      "relative z-[1] font-semibold text-11 rounded-[3px] py-1.5 text-placeholder focus:outline-none transition duration-500",
      {
        "text-tertiary bg-surface-1": selected,
        "hover:text-tertiary": !selected,
      }
    );

  return (
    <div className="flex flex-col gap-4 p-4 min-h-[17rem] overflow-hidden bg-surface-1 border border-subtle rounded-lg">
      <Tab.Group as={Fragment} selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List
          as="div"
          className="relative border-[0.5px] border-subtle rounded-sm bg-layer-1 p-[1px] grid"
          style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
        >
          <Tab className={tabClassName}>Priority Issues</Tab>
          <Tab className={tabClassName}>Assignees</Tab>
          <Tab className={tabClassName}>Labels</Tab>
        </Tab.List>

        <Tab.Panels as={Fragment}>
          {/* Priority Issues Tab */}
          <Tab.Panel
            as="div"
            className="flex h-52 w-full flex-col gap-1 overflow-y-auto text-secondary vertical-scrollbar scrollbar-sm"
          >
            {loadingTab === "priority" ? (
              <TabLoaders />
            ) : priorityIssues.length === 0 ? (
              <div className="flex items-center justify-center h-full w-full">
                <SimpleEmptyState title="No priority issues" />
              </div>
            ) : (
              <div className="flex flex-col gap-1 h-full w-full overflow-y-auto vertical-scrollbar scrollbar-sm">
                {priorityIssues.map((issue) => (
                  <div
                    key={issue.id}
                    className="group flex cursor-pointer items-center justify-between gap-2 rounded-md hover:bg-surface-2 p-1"
                  >
                    <div className="flex items-center gap-1.5 flex-grow w-full min-w-24 truncate">
                      <span className="text-12 text-tertiary flex-shrink-0">{issue.id}</span>
                      <span className="text-13 text-primary truncate">{issue.name}</span>
                    </div>
                    <PriorityIcon priority={issue.priority} withContainer />
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <StatePill state={issue.state} />
                      {issue.date && (
                        <div className="h-full flex truncate items-center gap-1.5 rounded-sm text-11 px-2 py-0.5 bg-layer-1 group-hover:bg-surface-1 cursor-pointer">
                          <CalendarCheck className="h-3 w-3 flex-shrink-0" />
                          <span className="text-11 truncate">{issue.date}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Tab.Panel>

          {/* Assignees Tab */}
          <Tab.Panel
            as="div"
            className="flex h-52 w-full flex-col gap-1 overflow-y-auto text-secondary vertical-scrollbar scrollbar-sm"
          >
            {loadingTab === "assignees" ? (
              <TabLoaders />
            ) : assignees.length === 0 ? (
              <div className="flex items-center justify-center h-full w-full">
                <SimpleEmptyState title="No assignees" />
              </div>
            ) : (
              assignees.map((assignee, index) => (
                <SingleProgressStats
                  key={index}
                  title={
                    <div className="flex items-center gap-2">
                      {assignee.avatar ? (
                        <Avatar name={assignee.name} src={assignee.avatar} size="md" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-subtle bg-layer-1 flex items-center justify-center">
                          <span className="text-11 text-tertiary">?</span>
                        </div>
                      )}
                      <span>{assignee.name}</span>
                    </div>
                  }
                  completed={assignee.completed}
                  total={assignee.total}
                  // Empty onClick - interactivity is handled by parent in real usage
                  onClick={() => {}}
                />
              ))
            )}
          </Tab.Panel>

          {/* Labels Tab */}
          <Tab.Panel
            as="div"
            className="flex h-52 w-full flex-col gap-1 overflow-y-auto text-secondary vertical-scrollbar scrollbar-sm"
          >
            {loadingTab === "labels" ? (
              <TabLoaders />
            ) : labels.length === 0 ? (
              <div className="flex items-center justify-center h-full w-full">
                <SimpleEmptyState title="No labels" />
              </div>
            ) : (
              labels.map((label, index) => (
                <SingleProgressStats
                  key={index}
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
                  // Empty onClick - interactivity is handled by parent in real usage
                  onClick={() => {}}
                />
              ))
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

// ===========================
// Mock Data
// ===========================

const mockPriorityIssues: PriorityIssue[] = [
  {
    id: "DEMO-101",
    name: "Auth service crashes on token refresh",
    priority: "urgent",
    state: "In Progress",
    date: "Jun 30",
  },
  {
    id: "DEMO-97",
    name: "Dashboard chart renders blank on first load",
    priority: "high",
    state: "Todo",
    date: "Jun 28",
  },
  {
    id: "DEMO-88",
    name: "Export to CSV drops timezone offset",
    priority: "high",
    state: "In Progress",
    date: "Jun 25",
  },
  {
    id: "DEMO-76",
    name: "Notification emails not sending after deploy",
    priority: "urgent",
    state: "In Review",
    date: "Jun 22",
  },
  {
    id: "DEMO-65",
    name: "Search returns stale cache results",
    priority: "medium",
    state: "Todo",
    date: "Jun 20",
  },
];

const mockAssignees: Assignee[] = [
  { name: "Alice Nguyen", avatar: "https://i.pravatar.cc/150?img=1", completed: 8, total: 12 },
  { name: "Bob Torres", avatar: "https://i.pravatar.cc/150?img=2", completed: 5, total: 10 },
  { name: "Carol Smith", avatar: "https://i.pravatar.cc/150?img=5", completed: 3, total: 7 },
  { name: "Dana Lee", avatar: "https://i.pravatar.cc/150?img=8", completed: 2, total: 5 },
  { name: "Unassigned", avatar: null, completed: 1, total: 3 },
];

const mockLabels: Label[] = [
  { name: "bug", color: "#ef4444", completed: 6, total: 10 },
  { name: "feature", color: "#3b82f6", completed: 4, total: 8 },
  { name: "enhancement", color: "#8b5cf6", completed: 3, total: 5 },
  { name: "documentation", color: "#10b981", completed: 2, total: 4 },
  { name: "chore", color: "#f59e0b", completed: 1, total: 3 },
];

// ===========================
// Storybook Configuration
// ===========================

const meta = {
  title: "Cycles/ActiveCycleStats",
  component: ActiveCycleStatsDisplay,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The Active Cycle Stats panel displays cycle progress across three tabs: Priority Issues, Assignees, and Labels. Each tab shows relevant metrics and distributions.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-full max-w-[500px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ActiveCycleStatsDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

// ===========================
// Stories - Loading States
// ===========================

export const LoadingFullCard: Story = {
  args: {
    isLoading: true,
  },
};

export const LoadingPriorityTab: Story = {
  args: {
    loadingTab: "priority",
    defaultTab: 0,
  },
};

export const LoadingAssigneesTab: Story = {
  args: {
    loadingTab: "assignees",
    defaultTab: 1,
  },
};

export const LoadingLabelsTab: Story = {
  args: {
    loadingTab: "labels",
    defaultTab: 2,
  },
};

// ===========================
// Stories - Empty States
// ===========================

export const EmptyPriorityIssues: Story = {
  args: {
    defaultTab: 0,
    priorityIssues: [],
  },
};

export const EmptyAssignees: Story = {
  args: {
    defaultTab: 1,
    assignees: [],
  },
};

export const EmptyLabels: Story = {
  args: {
    defaultTab: 2,
    labels: [],
  },
};

// ===========================
// Stories - Populated States
// ===========================

export const PopulatedPriorityIssues: Story = {
  args: {
    defaultTab: 0,
    priorityIssues: mockPriorityIssues,
  },
};

export const PopulatedAssignees: Story = {
  args: {
    defaultTab: 1,
    assignees: mockAssignees,
  },
};

export const PopulatedLabels: Story = {
  args: {
    defaultTab: 2,
    labels: mockLabels,
  },
};

// ===========================
// Stories - Theme Variants
// ===========================

export const LightTheme: Story = {
  args: {
    defaultTab: 1,
    priorityIssues: mockPriorityIssues,
    assignees: mockAssignees,
    labels: mockLabels,
  },
  decorators: [
    (Story) => (
      <div className="bg-canvas p-4" data-theme="light">
        <Story />
      </div>
    ),
  ],
};

export const DarkTheme: Story = {
  args: {
    defaultTab: 1,
    priorityIssues: mockPriorityIssues,
    assignees: mockAssignees,
    labels: mockLabels,
  },
  decorators: [
    (Story) => {
      useEffect(() => {
        const prev = document.documentElement.getAttribute("data-theme");
        document.documentElement.setAttribute("data-theme", "dark");
        return () => {
          if (prev) document.documentElement.setAttribute("data-theme", prev);
          else document.documentElement.removeAttribute("data-theme");
        };
      }, []);
      return (
        <div className="bg-canvas p-4" data-theme="dark">
          <Story />
        </div>
      );
    },
  ],
};

export const AllTabs: Story = {
  render: () => (
    <div className="flex flex-row gap-4">
      <div className="w-[320px] flex-shrink-0">
        <div className="mb-2 text-13 font-medium text-primary">Priority Issues Tab</div>
        <ActiveCycleStatsDisplay
          defaultTab={0}
          priorityIssues={mockPriorityIssues}
          assignees={mockAssignees}
          labels={mockLabels}
        />
      </div>
      <div className="w-[320px] flex-shrink-0">
        <div className="mb-2 text-13 font-medium text-primary">Assignees Tab</div>
        <ActiveCycleStatsDisplay
          defaultTab={1}
          priorityIssues={mockPriorityIssues}
          assignees={mockAssignees}
          labels={mockLabels}
        />
      </div>
      <div className="w-[320px] flex-shrink-0">
        <div className="mb-2 text-13 font-medium text-primary">Labels Tab</div>
        <ActiveCycleStatsDisplay
          defaultTab={2}
          priorityIssues={mockPriorityIssues}
          assignees={mockAssignees}
          labels={mockLabels}
        />
      </div>
    </div>
  ),
  decorators: [],
};

// ===========================
// Stories - Interactive Demo
// ===========================

export const Interactive: Story = {
  render: () => {
    return (
      <ActiveCycleStatsDisplay priorityIssues={mockPriorityIssues} assignees={mockAssignees} labels={mockLabels} />
    );
  },
};
