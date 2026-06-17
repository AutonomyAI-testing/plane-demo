import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { ActiveCycleStatsView } from "./cycle-stats-view";

const meta = {
  title: "Cycles/ActiveCycleStats",
  component: ActiveCycleStatsView,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof ActiveCycleStatsView>;

export default meta;
type Story = StoryObj<typeof meta>;

// Dark theme must be applied on the document ROOT — the dark color tokens are
// scoped to :root via an `@variant dark` block, so a nested `data-theme="dark"`
// wrapper does NOT pick up the dark token overrides.
const DarkRoot = ({ children }: { children: React.ReactNode }) => {
  React.useEffect(() => {
    const root = document.documentElement;
    const prev = root.getAttribute("data-theme");
    root.setAttribute("data-theme", "dark");
    return () => {
      if (prev === null) root.removeAttribute("data-theme");
      else root.setAttribute("data-theme", prev);
    };
  }, []);
  return <div className="bg-canvas p-4 rounded-lg">{children}</div>;
};

const withDarkRoot = (Story: () => React.ReactElement) => (
  <DarkRoot>
    <Story />
  </DarkRoot>
);

// === Mock data ===
const mockPriorityIssues = [
  {
    id: "1",
    name: "Fix authentication timeout issue",
    priority: "urgent",
    state_id: "In Progress",
    target_date: "2024-12-20",
    sequence_id: 42,
    project_identifier: "DEMO",
  },
  {
    id: "2",
    name: "Improve dashboard loading performance",
    priority: "high",
    state_id: "To Do",
    target_date: "2024-12-22",
    sequence_id: 43,
    project_identifier: "DEMO",
  },
  {
    id: "3",
    name: "Update onboarding flow copy",
    priority: "high",
    state_id: "In Progress",
    target_date: null,
    sequence_id: 44,
    project_identifier: "DEMO",
  },
  {
    id: "4",
    name: "Resolve data migration edge case",
    priority: "urgent",
    state_id: "In Review",
    target_date: "2024-12-18",
    sequence_id: 45,
    project_identifier: "DEMO",
  },
  {
    id: "5",
    name: "Add retry logic for failed API calls",
    priority: "high",
    state_id: "To Do",
    target_date: "2024-12-25",
    sequence_id: 46,
    project_identifier: "DEMO",
  },
];

const mockAssignees = [
  {
    assignee_id: "u1",
    display_name: "Alice Martin",
    avatar_url: "https://i.pravatar.cc/40?img=1",
    completed_issues: 8,
    total_issues: 12,
  },
  {
    assignee_id: "u2",
    display_name: "Bob Chen",
    avatar_url: "https://i.pravatar.cc/40?img=2",
    completed_issues: 5,
    total_issues: 9,
  },
  {
    assignee_id: "u3",
    display_name: "Carol Davis",
    avatar_url: "https://i.pravatar.cc/40?img=3",
    completed_issues: 11,
    total_issues: 14,
  },
  {
    assignee_id: "u4",
    display_name: "Dan Wilson",
    avatar_url: "https://i.pravatar.cc/40?img=4",
    completed_issues: 3,
    total_issues: 7,
  },
  {
    assignee_id: null,
    display_name: null,
    avatar_url: null,
    completed_issues: 2,
    total_issues: 4,
  },
];

const mockLabels = [
  { label_id: "l1", label_name: "Bug", color: "#ef4444", completed_issues: 6, total_issues: 10 },
  { label_id: "l2", label_name: "Feature", color: "#3b82f6", completed_issues: 9, total_issues: 15 },
  { label_id: "l3", label_name: "Improvement", color: "#10b981", completed_issues: 4, total_issues: 6 },
  { label_id: "l4", label_name: "Tech Debt", color: "#f59e0b", completed_issues: 2, total_issues: 8 },
  { label_id: null, label_name: null, color: null, completed_issues: 1, total_issues: 3 },
];

// === Populated states (primary first) ===
export const PopulatedPriorityIssues: Story = {
  name: "Populated – Priority Issues",
  args: {
    activeTab: 0,
    priorityIssues: mockPriorityIssues,
    assignees: mockAssignees,
    labels: mockLabels,
    theme: "light",
  },
};

// === Loading state ===
export const Loading: Story = {
  args: {
    activeTab: 1,
    assigneesLoading: true,
    labelsLoading: true,
    priorityIssuesLoading: true,
  },
};

// === Empty states ===
export const EmptyPriorityIssues: Story = {
  name: "Empty – Priority Issues",
  args: {
    activeTab: 0,
    priorityIssues: [],
    assignees: [],
    labels: [],
    theme: "light",
  },
};

export const EmptyAssignees: Story = {
  name: "Empty – Assignees",
  args: {
    activeTab: 1,
    priorityIssues: [],
    assignees: [],
    labels: [],
    theme: "light",
  },
};

export const EmptyLabels: Story = {
  name: "Empty – Labels",
  args: {
    activeTab: 2,
    priorityIssues: [],
    assignees: [],
    labels: [],
    theme: "light",
  },
};

export const PopulatedAssignees: Story = {
  name: "Populated – Assignees",
  args: {
    activeTab: 1,
    priorityIssues: mockPriorityIssues,
    assignees: mockAssignees,
    labels: mockLabels,
    theme: "light",
  },
};

export const PopulatedLabels: Story = {
  name: "Populated – Labels",
  args: {
    activeTab: 2,
    priorityIssues: mockPriorityIssues,
    assignees: mockAssignees,
    labels: mockLabels,
    theme: "light",
  },
};

// === Dark theme ===
export const DarkPopulatedAssignees: Story = {
  name: "Dark – Populated Assignees",
  args: {
    activeTab: 1,
    priorityIssues: mockPriorityIssues,
    assignees: mockAssignees,
    labels: mockLabels,
    theme: "dark",
  },
  decorators: [withDarkRoot],
};

export const DarkEmptyAssignees: Story = {
  name: "Dark – Empty Assignees",
  args: {
    activeTab: 1,
    priorityIssues: [],
    assignees: [],
    labels: [],
    theme: "dark",
  },
  decorators: [withDarkRoot],
};

export const DarkLoading: Story = {
  name: "Dark – Loading",
  args: {
    activeTab: 0,
    assigneesLoading: true,
    labelsLoading: true,
    priorityIssuesLoading: true,
    theme: "dark",
  },
  decorators: [withDarkRoot],
};

export const PriorityIssuesWithLoadMore: Story = {
  name: "Priority Issues – With Load More",
  args: {
    activeTab: 0,
    priorityIssues: mockPriorityIssues,
    hasMorePriorityIssues: true,
    assignees: mockAssignees,
    labels: mockLabels,
    theme: "light",
  },
};

export const InteractiveExample: Story = {
  name: "Interactive – With Callbacks",
  args: {
    activeTab: 0,
    priorityIssues: mockPriorityIssues,
    assignees: mockAssignees,
    labels: mockLabels,
    theme: "light",
    onIssueClick: (issueId: string) => {
      alert(`Issue clicked: ${issueId}`);
    },
    onAssigneeClick: (assigneeId: string) => {
      alert(`Assignee clicked: ${assigneeId}`);
    },
    onLabelClick: (labelId: string) => {
      alert(`Label clicked: ${labelId}`);
    },
    onTabChange: (index: number) => {
      // Tab switching callback - alerts are for demo purposes in Storybook
    },
  },
};
