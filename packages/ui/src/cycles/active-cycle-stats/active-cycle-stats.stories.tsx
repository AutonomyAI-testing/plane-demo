import type { Meta, StoryObj } from "@storybook/react";
import { ActiveCycleStats } from "./active-cycle-stats";

const meta: Meta<typeof ActiveCycleStats> = {
  title: "Cycles/ActiveCycleStats",
  component: ActiveCycleStats,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ActiveCycleStats>;

// Mock data
const mockAssignees = [
  {
    assignee_id: "1",
    display_name: "Alice Martin",
    avatar_url: null,
    completed_issues: 8,
    total_issues: 12,
  },
  {
    assignee_id: "2",
    display_name: "Bob Chen",
    avatar_url: null,
    completed_issues: 5,
    total_issues: 9,
  },
  {
    assignee_id: "3",
    display_name: "Carol Davis",
    avatar_url: null,
    completed_issues: 3,
    total_issues: 7,
  },
  {
    assignee_id: "4",
    display_name: "David Kim",
    avatar_url: null,
    completed_issues: 10,
    total_issues: 10,
  },
  {
    assignee_id: "5",
    display_name: "Eva Rodriguez",
    avatar_url: null,
    completed_issues: 1,
    total_issues: 6,
  },
];

const mockLabels = [
  {
    label_id: "l1",
    label_name: "Bug",
    color: "#ef4444",
    completed_issues: 4,
    total_issues: 6,
  },
  {
    label_id: "l2",
    label_name: "Feature",
    color: "#3b82f6",
    completed_issues: 7,
    total_issues: 11,
  },
  {
    label_id: "l3",
    label_name: "Improvement",
    color: "#10b981",
    completed_issues: 2,
    total_issues: 5,
  },
  {
    label_id: "l4",
    label_name: "Documentation",
    color: "#f59e0b",
    completed_issues: 1,
    total_issues: 3,
  },
  {
    label_id: "l5",
    label_name: "Tech Debt",
    color: "#8b5cf6",
    completed_issues: 3,
    total_issues: 4,
  },
];

const mockPriorityIssues = [
  {
    id: "i1",
    identifier: "PRJ-42",
    name: "Fix critical login timeout causing user session drops",
    priority: "urgent" as const,
    state: "In Progress",
    target_date: "2025-03-15",
  },
  {
    id: "i2",
    identifier: "PRJ-38",
    name: "API rate limiting not applied to bulk export endpoints",
    priority: "high" as const,
    state: "Todo",
    target_date: "2025-03-18",
  },
  {
    id: "i3",
    identifier: "PRJ-55",
    name: "Dashboard rendering performance regression on large projects",
    priority: "high" as const,
    state: "In Review",
    target_date: "2025-03-20",
  },
  {
    id: "i4",
    identifier: "PRJ-61",
    name: "Notification emails not delivered for @mentions in comments",
    priority: "urgent" as const,
    state: "Todo",
    target_date: "2025-03-14",
  },
  {
    id: "i5",
    identifier: "PRJ-29",
    name: "Drag-and-drop reorder breaks on mobile Safari browsers",
    priority: "high" as const,
    state: "Todo",
    target_date: null,
  },
];

/**
 * Default view showing the Assignees tab with distribution data
 */
export const WithAssignees: Story = {
  args: {
    defaultTab: 1,
    assignees: mockAssignees,
    labels: mockLabels,
    priorityIssues: mockPriorityIssues,
  },
};

/**
 * View showing the Labels tab with label distribution
 */
export const WithLabels: Story = {
  args: {
    defaultTab: 2,
    assignees: mockAssignees,
    labels: mockLabels,
    priorityIssues: mockPriorityIssues,
  },
};

/**
 * View showing the Priority Issues tab with high and urgent priority issues
 */
export const PriorityIssues: Story = {
  args: {
    defaultTab: 0,
    assignees: mockAssignees,
    labels: mockLabels,
    priorityIssues: mockPriorityIssues,
  },
};

/**
 * Empty state with no data in any tab
 */
export const EmptyState: Story = {
  args: {
    defaultTab: 1,
    assignees: [],
    labels: [],
    priorityIssues: [],
  },
};

/**
 * Loading state showing skeleton loaders
 */
export const Loading: Story = {
  args: {
    loading: true,
    assignees: [],
    labels: [],
    priorityIssues: [],
  },
};
