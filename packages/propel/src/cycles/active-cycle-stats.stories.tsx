import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CheckCircle2, Clock, Trophy } from "lucide-react";
import { Tabs } from "../tabs/tabs";
import { Avatar } from "../avatar/avatar";
import { Skeleton } from "../skeleton/root";
import { cn } from "../utils/classname";

type ProgressStatItem = {
  id: string;
  name: string;
  completed: number;
  total: number;
  avatarSrc?: string;
  color?: string; // for label dots
};

type PriorityIssue = {
  id: string;
  title: string;
  priority: "urgent" | "high" | "medium" | "low";
  status: "todo" | "in_progress" | "in_review" | "done";
  targetDate?: string;
};

// Priority colors for visual indicators
const PRIORITY_COLORS = {
  urgent: "#ef4444",
  high: "#f59e0b",
  medium: "#3b82f6",
  low: "#10b981",
} as const;

// Status display labels
const STATUS_LABELS = {
  todo: "Todo",
  in_progress: "In Progress",
  in_review: "In Review",
  done: "Done",
} as const;

// Status badge styling for visual distinction
const STATUS_COLORS = {
  todo: "bg-layer-2 text-tertiary",
  in_progress: "bg-blue-100 text-blue-900",
  in_review: "bg-purple-100 text-purple-900",
  done: "bg-green-100 text-green-900",
} as const;

// Progress bar color for assignee/label completion
const PROGRESS_COLOR = "rgb(59, 130, 246)";

// Mock data for assignees
const mockAssignees: ProgressStatItem[] = [
  {
    id: "alice",
    name: "Alice Chen",
    completed: 12,
    total: 18,
    avatarSrc: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "bob",
    name: "Bob Martin",
    completed: 8,
    total: 15,
    avatarSrc: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: "carol",
    name: "Carol White",
    completed: 5,
    total: 9,
    avatarSrc: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: "david",
    name: "David Kim",
    completed: 3,
    total: 7,
    avatarSrc: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: "unassigned",
    name: "Unassigned",
    completed: 2,
    total: 5,
  },
];

// Mock data for labels
const mockLabels: ProgressStatItem[] = [
  {
    id: "bug",
    name: "Bug",
    completed: 7,
    total: 11,
    color: "#ef4444", // red
  },
  {
    id: "feature",
    name: "Feature",
    completed: 10,
    total: 14,
    color: "#3b82f6", // blue
  },
  {
    id: "improvement",
    name: "Improvement",
    completed: 5,
    total: 8,
    color: "#10b981", // green
  },
  {
    id: "documentation",
    name: "Documentation",
    completed: 2,
    total: 4,
    color: "#f59e0b", // amber
  },
  {
    id: "no-label",
    name: "No label",
    completed: 1,
    total: 3,
    color: "#9ca3af", // gray
  },
];

// Mock data for priority issues
const mockPriorityIssues: PriorityIssue[] = [
  {
    id: "1",
    title: "Fix critical authentication bypass",
    priority: "urgent",
    status: "in_progress",
    targetDate: "Dec 15, 2024",
  },
  {
    id: "2",
    title: "Payment gateway timeout on checkout",
    priority: "urgent",
    status: "todo",
    targetDate: "Dec 12, 2024",
  },
  {
    id: "3",
    title: "Dashboard crashes on mobile Safari",
    priority: "high",
    status: "in_progress",
    targetDate: "Dec 18, 2024",
  },
  {
    id: "4",
    title: "Slow API response on search",
    priority: "high",
    status: "todo",
    targetDate: "Dec 20, 2024",
  },
];

/**
 * ProgressStatRow: Renders a single progress stat with avatar/indicator and completion percentage.
 * Used in assignees and labels tabs to display task completion across team members or categories.
 */
function ProgressStatRow({
  item,
  renderIcon,
}: {
  item: ProgressStatItem;
  renderIcon: (item: ProgressStatItem) => React.ReactNode;
}) {
  // Calculate percentage; default to 0 for empty states to prevent division by zero
  const percentage = item.total > 0 ? Math.round((item.completed / item.total) * 100) : 0;

  return (
    <div className="flex flex-col gap-1.5 px-1.5 py-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {renderIcon(item)}
          <span className="text-secondary truncate text-12">{item.name}</span>
        </div>
        <span className="text-tertiary whitespace-nowrap text-11">{percentage}%</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-layer-2 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-300"
            style={{ width: `${percentage}%`, backgroundColor: PROGRESS_COLOR }}
          />
        </div>
        <span className="text-tertiary whitespace-nowrap text-10">
          {item.completed}/{item.total}
        </span>
      </div>
    </div>
  );
}

/**
 * PriorityIssueRow: Renders a single priority issue with visual priority indicator,
 * status badge, and optional target date. Used to surface high-priority items in the cycle.
 */
function PriorityIssueRow({ issue }: { issue: PriorityIssue }) {
  return (
    <div className="flex flex-col gap-1 px-1.5 py-2 border-b border-subtle last:border-b-0">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 min-w-0 flex-1">
          {/* Priority indicator dot - colored by priority level */}
          <div
            className="w-2 h-2 rounded-full mt-1 flex-shrink-0"
            style={{ backgroundColor: PRIORITY_COLORS[issue.priority] }}
          />
          <span className="text-12 text-secondary truncate font-medium">{issue.title}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 ml-4">
        <span className={cn("text-10 px-1.5 py-0.5 rounded-sm", STATUS_COLORS[issue.status])}>
          {STATUS_LABELS[issue.status]}
        </span>
        {issue.targetDate && (
          <span className="text-10 text-tertiary flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {issue.targetDate}
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * ActiveCycleStatsPanel: Main component displaying cycle statistics in three tabs:
 * - Assignees: Shows task completion by team member
 * - Labels: Shows task completion by category/label
 * - Priority Issues: Shows high-priority items requiring attention
 *
 * Supports loading states and empty states for each tab.
 */
function ActiveCycleStatsPanel({
  tabContent = "assignees",
  isLoading = false,
}: {
  tabContent?: "assignees" | "labels" | "priority_issues";
  isLoading?: boolean;
}) {
  // Track the currently active tab
  const [activeTab, setActiveTab] = useState(tabContent);

  return (
    <div className="flex flex-col gap-4 p-4 min-h-[17rem] overflow-hidden bg-surface-1 col-span-1 border border-subtle rounded-lg w-[400px] h-fit">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <Tabs.List className="border-[0.5px] border-subtle rounded-sm bg-layer-1 p-[1px] grid grid-cols-3 h-auto">
          <Tabs.Trigger
            value="assignees"
            className="font-semibold text-11 rounded-[3px] py-1.5 text-placeholder data-[selected]:text-tertiary data-[selected]:bg-surface-1"
          >
            Assignees
          </Tabs.Trigger>
          <Tabs.Trigger
            value="labels"
            className="font-semibold text-11 rounded-[3px] py-1.5 text-placeholder data-[selected]:text-tertiary data-[selected]:bg-surface-1"
          >
            Labels
          </Tabs.Trigger>
          <Tabs.Trigger
            value="priority_issues"
            className="font-semibold text-11 rounded-[3px] py-1.5 text-placeholder data-[selected]:text-tertiary data-[selected]:bg-surface-1"
          >
            Priority Issues
          </Tabs.Trigger>
        </Tabs.List>

        {/* Assignees tab: shows task completion by team member */}
        <Tabs.Content value="assignees" className="flex h-96 w-full flex-col gap-1 overflow-y-auto text-secondary">
          {isLoading ? (
            <div className="flex flex-col gap-2">
              <Skeleton>
                <Skeleton.Item height="24px" className="w-full" />
              </Skeleton>
              <Skeleton>
                <Skeleton.Item height="24px" className="w-full" />
              </Skeleton>
              <Skeleton>
                <Skeleton.Item height="24px" className="w-full" />
              </Skeleton>
            </div>
          ) : mockAssignees.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-2">
              <Trophy className="w-5 h-5 text-tertiary" />
              <span className="text-12 text-tertiary">No assignees yet</span>
            </div>
          ) : (
            mockAssignees.map((assignee) => (
              <ProgressStatRow
                key={assignee.id}
                item={assignee}
                renderIcon={(item) => (
                  <Avatar
                    name={item.name}
                    src={item.avatarSrc}
                    size="sm"
                    fallbackBackgroundColor={item.id === "unassigned" ? "#d1d5db" : undefined}
                  />
                )}
              />
            ))
          )}
        </Tabs.Content>

        {/* Labels tab: shows task completion by category/label */}
        <Tabs.Content value="labels" className="flex h-96 w-full flex-col gap-1 overflow-y-auto text-secondary">
          {isLoading ? (
            <div className="flex flex-col gap-2">
              <Skeleton>
                <Skeleton.Item height="24px" className="w-full" />
              </Skeleton>
              <Skeleton>
                <Skeleton.Item height="24px" className="w-full" />
              </Skeleton>
              <Skeleton>
                <Skeleton.Item height="24px" className="w-full" />
              </Skeleton>
            </div>
          ) : mockLabels.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-2">
              <Trophy className="w-5 h-5 text-tertiary" />
              <span className="text-12 text-tertiary">No labels yet</span>
            </div>
          ) : (
            mockLabels.map((label) => (
              <ProgressStatRow
                key={label.id}
                item={label}
                renderIcon={(item) => (
                  <div
                    className="h-3 w-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color || "#d1d5db" }}
                  />
                )}
              />
            ))
          )}
        </Tabs.Content>

        {/* Priority Issues tab: shows high-priority items requiring attention */}
        <Tabs.Content
          value="priority_issues"
          className="flex h-96 w-full flex-col gap-0 overflow-y-auto text-secondary"
        >
          {isLoading ? (
            <div className="flex flex-col gap-2 p-1.5">
              <Skeleton>
                <Skeleton.Item height="20px" className="w-full" />
              </Skeleton>
              <Skeleton>
                <Skeleton.Item height="20px" className="w-full" />
              </Skeleton>
              <Skeleton>
                <Skeleton.Item height="20px" className="w-full" />
              </Skeleton>
            </div>
          ) : mockPriorityIssues.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-2">
              <CheckCircle2 className="w-5 h-5 text-tertiary" />
              <span className="text-12 text-tertiary">No priority issues</span>
            </div>
          ) : (
            mockPriorityIssues.map((issue) => <PriorityIssueRow key={issue.id} issue={issue} />)
          )}
        </Tabs.Content>
      </Tabs>
    </div>
  );
}

// Storybook configuration
const meta = {
  title: "Cycles/Active Cycle Stats",
  component: ActiveCycleStatsPanel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ActiveCycleStatsPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithAssignees: Story = {
  args: {
    tabContent: "assignees",
    isLoading: false,
  },
};

export const WithLabels: Story = {
  args: {
    tabContent: "labels",
    isLoading: false,
  },
};

export const WithPriorityIssues: Story = {
  args: {
    tabContent: "priority_issues",
    isLoading: false,
  },
};

export const EmptyAssignees: Story = {
  args: {
    tabContent: "assignees",
    isLoading: false,
  },
  render() {
    // Override to show empty state
    return (
      <div className="flex flex-col gap-4 p-4 min-h-[17rem] overflow-hidden bg-surface-1 col-span-1 border border-subtle rounded-lg w-[400px]">
        <Tabs defaultValue="assignees">
          <Tabs.List className="border-[0.5px] border-subtle rounded-sm bg-layer-1 p-[1px] grid grid-cols-3 h-auto">
            <Tabs.Trigger
              value="assignees"
              className="font-semibold text-11 rounded-[3px] py-1.5 text-placeholder data-[selected]:text-tertiary data-[selected]:bg-surface-1"
            >
              Assignees
            </Tabs.Trigger>
            <Tabs.Trigger
              value="labels"
              className="font-semibold text-11 rounded-[3px] py-1.5 text-placeholder data-[selected]:text-tertiary data-[selected]:bg-surface-1"
            >
              Labels
            </Tabs.Trigger>
            <Tabs.Trigger
              value="priority_issues"
              className="font-semibold text-11 rounded-[3px] py-1.5 text-placeholder data-[selected]:text-tertiary data-[selected]:bg-surface-1"
            >
              Priority Issues
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="assignees" className="flex h-52 w-full flex-col gap-1 overflow-y-auto text-secondary">
            <div className="flex flex-col items-center justify-center h-full gap-2">
              <Trophy className="w-5 h-5 text-tertiary" />
              <span className="text-12 text-tertiary">No assignees yet</span>
            </div>
          </Tabs.Content>

          <Tabs.Content value="labels" className="flex h-52 w-full flex-col gap-1 overflow-y-auto text-secondary">
            <div className="text-12 text-tertiary text-center py-8">Select a tab</div>
          </Tabs.Content>

          <Tabs.Content
            value="priority_issues"
            className="flex h-52 w-full flex-col gap-0 overflow-y-auto text-secondary"
          >
            <div className="text-12 text-tertiary text-center py-8">Select a tab</div>
          </Tabs.Content>
        </Tabs>
      </div>
    );
  },
};

export const Loading: Story = {
  args: {
    tabContent: "assignees",
    isLoading: true,
  },
};
