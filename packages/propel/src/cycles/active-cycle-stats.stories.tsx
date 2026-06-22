import type { Meta, StoryObj } from "@storybook/react-vite";
import { ActiveCycleStats } from "./active-cycle-stats";
import type { TPriorityIssue, TAssigneeDistribution, TLabelDistribution } from "./active-cycle-stats";
// Mock data for component testing - represents realistic data from API

const mockAssignees: TAssigneeDistribution[] = [
  {
    assigneeId: "1",
    displayName: "Alice Chen",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    completedIssues: 8,
    totalIssues: 12,
  },
  {
    assigneeId: "2",
    displayName: "Bob Kumar",
    avatarUrl: "https://i.pravatar.cc/150?img=2",
    completedIssues: 5,
    totalIssues: 10,
  },
  {
    assigneeId: "3",
    displayName: "Charlie Kim",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    completedIssues: 15,
    totalIssues: 15,
  },
  {
    assigneeId: "4",
    displayName: "Diana Lee",
    avatarUrl: "https://i.pravatar.cc/150?img=4",
    completedIssues: 3,
    totalIssues: 8,
  },
  {
    assigneeId: "5",
    displayName: "Evan Singh",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    completedIssues: 6,
    totalIssues: 11,
  },
];

const mockLabels: TLabelDistribution[] = [
  {
    labelId: "bug",
    labelName: "Bug",
    color: "#ef4444",
    completedIssues: 12,
    totalIssues: 18,
  },
  {
    labelId: "feature",
    labelName: "Feature",
    color: "#3b82f6",
    completedIssues: 7,
    totalIssues: 14,
  },
  {
    labelId: "design",
    labelName: "Design",
    color: "#ec4899",
    completedIssues: 4,
    totalIssues: 9,
  },
  {
    labelId: "backend",
    labelName: "Backend",
    color: "#8b5cf6",
    completedIssues: 9,
    totalIssues: 12,
  },
  {
    labelId: "frontend",
    labelName: "Frontend",
    color: "#10b981",
    completedIssues: 11,
    totalIssues: 16,
  },
];

const mockPriorityIssues: TPriorityIssue[] = [
  {
    id: "1",
    name: "Fix login page crash on mobile",
    priority: "urgent",
    stateName: "In Progress",
    stateColor: "#f59e0b",
    targetDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Update payment flow for new provider",
    priority: "high",
    stateName: "In Review",
    stateColor: "#3b82f6",
    targetDate: "2024-01-18",
  },
  {
    id: "3",
    name: "Optimize database queries for reports",
    priority: "high",
    stateName: "Todo",
    stateColor: "#9ca3af",
    targetDate: null,
  },
  {
    id: "4",
    name: "Design new dashboard layout",
    priority: "medium",
    stateName: "In Progress",
    stateColor: "#f59e0b",
    targetDate: "2024-01-20",
  },
  {
    id: "5",
    name: "Write API documentation",
    priority: "low",
    stateName: "Todo",
    stateColor: "#9ca3af",
    targetDate: null,
  },
];

const meta = {
  title: "Cycles/ActiveCycleStats",
  component: ActiveCycleStats,
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div className="flex justify-center w-full">
        <div className="w-[360px] p-4">
          <Story />
        </div>
      </div>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof ActiveCycleStats>;

export default meta;
type Story = StoryObj<typeof meta>;

// Test case: Shows assignees tab with full data available for all tabs
export const WithAssignees: Story = {
  args: {
    assignees: mockAssignees,
    labels: mockLabels,
    priorityIssues: mockPriorityIssues,
    defaultTab: "assignees",
  },
};

// Test case: Shows labels tab with full data available for all tabs
export const WithLabels: Story = {
  args: {
    assignees: mockAssignees,
    labels: mockLabels,
    priorityIssues: mockPriorityIssues,
    defaultTab: "labels",
  },
};

// Test case: Shows priority issues tab with full data available for all tabs
export const WithPriorityIssues: Story = {
  args: {
    assignees: mockAssignees,
    labels: mockLabels,
    priorityIssues: mockPriorityIssues,
    defaultTab: "priority-issues",
  },
};

// Test case: Shows empty state when assignees list is empty but other tabs have data
export const EmptyAssignees: Story = {
  args: {
    assignees: [],
    labels: mockLabels,
    priorityIssues: mockPriorityIssues,
    defaultTab: "assignees",
  },
};

// Test case: Shows loading skeleton state when all data is null/undefined
export const Loading: Story = {
  args: {
    assignees: null,
    labels: null,
    priorityIssues: null,
    defaultTab: "priority-issues",
  },
};

// Test case: Shows partial loading where only assignees is loading (null) but other tabs have data
export const LoadingAssignees: Story = {
  args: {
    assignees: null,
    labels: mockLabels,
    priorityIssues: mockPriorityIssues,
    defaultTab: "assignees",
  },
};
