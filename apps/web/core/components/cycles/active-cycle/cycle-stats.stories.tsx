import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect } from "react";
import { ActiveCycleStatsView } from "./cycle-stats-view";
import type { ICycle } from "@plane/types";

const meta: Meta<typeof ActiveCycleStatsView> = {
  title: "Cycles/ActiveCycleStats",
  component: ActiveCycleStatsView,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof ActiveCycleStatsView>;

/**
 * Mock cycle data with assignee distribution for testing populated assignee states.
 * Includes mix of assigned and unassigned work items.
 */
const mockCycleWithAssignees: ICycle = {
  id: "cycle-1",
  name: "Sprint 24",
  description: "",
  start_date: "2025-01-01",
  end_date: "2025-01-15",
  distribution: {
    assignees: [
      {
        assignee_id: "u1",
        display_name: "Alex Kim",
        avatar_url: "https://i.pravatar.cc/40?img=1",
        first_name: "Alex",
        last_name: "Kim",
        completed_issues: 8,
        total_issues: 10,
        pending_issues: 2,
      },
      {
        assignee_id: "u2",
        display_name: "Jordan Lee",
        avatar_url: "https://i.pravatar.cc/40?img=5",
        first_name: "Jordan",
        last_name: "Lee",
        completed_issues: 5,
        total_issues: 12,
        pending_issues: 7,
      },
      {
        assignee_id: "u3",
        display_name: "Sam Rivera",
        avatar_url: "https://i.pravatar.cc/40?img=9",
        first_name: "Sam",
        last_name: "Rivera",
        completed_issues: 11,
        total_issues: 11,
        pending_issues: 0,
      },
      {
        assignee_id: "u4",
        display_name: "Taylor Brooks",
        avatar_url: "https://i.pravatar.cc/40?img=12",
        first_name: "Taylor",
        last_name: "Brooks",
        completed_issues: 3,
        total_issues: 8,
        pending_issues: 5,
      },
      {
        assignee_id: null,
        display_name: null,
        avatar_url: null,
        first_name: null,
        last_name: null,
        completed_issues: 2,
        total_issues: 4,
        pending_issues: 2,
      },
    ],
    labels: [],
    completion_chart: {},
  },
} as ICycle;

/**
 * Mock cycle data with label distribution for testing populated label states.
 * Includes mix of labeled and unlabeled work items.
 */
const mockCycleWithLabels: ICycle = {
  id: "cycle-1",
  name: "Sprint 24",
  description: "",
  start_date: "2025-01-01",
  end_date: "2025-01-15",
  distribution: {
    assignees: [],
    labels: [
      {
        label_id: "l1",
        label_name: "bug",
        color: "#ef4444",
        completed_issues: 4,
        total_issues: 6,
        pending_issues: 2,
      },
      {
        label_id: "l2",
        label_name: "feature",
        color: "#3b82f6",
        completed_issues: 7,
        total_issues: 9,
        pending_issues: 2,
      },
      {
        label_id: "l3",
        label_name: "improvement",
        color: "#a855f7",
        completed_issues: 3,
        total_issues: 5,
        pending_issues: 2,
      },
      {
        label_id: "l4",
        label_name: "documentation",
        color: "#f59e0b",
        completed_issues: 2,
        total_issues: 3,
        pending_issues: 1,
      },
      {
        label_id: null,
        label_name: null,
        color: null,
        completed_issues: 1,
        total_issues: 2,
        pending_issues: 1,
      },
    ],
    completion_chart: {},
  },
} as ICycle;

/**
 * Mock cycle data combining both assignees and labels for comprehensive testing.
 */
const mockCycleWithBoth: ICycle = {
  id: "cycle-1",
  name: "Sprint 24",
  description: "",
  start_date: "2025-01-01",
  end_date: "2025-01-15",
  distribution: {
    assignees: mockCycleWithAssignees.distribution!.assignees,
    labels: mockCycleWithLabels.distribution!.labels,
    completion_chart: {},
  },
} as ICycle;

/**
 * Mock cycle with no assignee or label data for testing empty states.
 */
const mockCycleEmpty: ICycle = {
  id: "cycle-1",
  name: "Sprint 24",
  description: "",
  start_date: "2025-01-01",
  end_date: "2025-01-15",
  distribution: {
    assignees: [],
    labels: [],
    completion_chart: {},
  },
} as ICycle;

/**
 * Wrapper component that applies the specified theme to story content.
 * Sets data-theme attribute on document root to enable theme-specific styling.
 */
const ThemedWrapper = ({ theme, children }: { theme: 'light' | 'dark'; children: React.ReactNode }) => {
  useEffect(() => {
    const prev = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', theme);
    return () => {
      if (prev) document.documentElement.setAttribute('data-theme', prev);
      else document.documentElement.removeAttribute('data-theme');
    };
  }, [theme]);
  return <div className="bg-canvas p-4">{children}</div>;
};

/**
 * Mock priority issues for testing the Priority Issues tab.
 * Covers all priority levels and various metadata combinations.
 */
const mockPriorityIssues = [
  {
    id: "PROJ-101",
    name: "Fix authentication timeout on mobile devices",
    priority: "urgent" as const,
    targetDate: "2025-01-15",
    state: "In Progress",
  },
  {
    id: "PROJ-98",
    name: "API rate limiting causes 429 errors in bulk export",
    priority: "high" as const,
    targetDate: "2025-01-20",
    state: "To Do",
  },
  {
    id: "PROJ-87",
    name: "Dashboard charts not rendering in Safari 17",
    priority: "high" as const,
    targetDate: null,
    state: "In Progress",
  },
  {
    id: "PROJ-79",
    name: "Improve onboarding flow for enterprise users",
    priority: "medium" as const,
    targetDate: "2025-02-01",
    state: "In Review",
  },
  {
    id: "PROJ-65",
    name: "Update dependency versions for security patches",
    priority: "low" as const,
    targetDate: "2025-02-10",
    state: "Backlog",
  },
];

// Loading States
export const LoadingLight: Story = {
  args: {
    cycle: null,
    resolvedTheme: "light",
    isLoading: true,
  },
  render: (args) => (
    <ThemedWrapper theme="light">
      <ActiveCycleStatsView {...args} />
    </ThemedWrapper>
  ),
};

export const LoadingDark: Story = {
  args: {
    cycle: null,
    resolvedTheme: "dark",
    isLoading: true,
  },
  render: (args) => (
    <ThemedWrapper theme="dark">
      <ActiveCycleStatsView {...args} />
    </ThemedWrapper>
  ),
};

// Panel Loading States
export const PanelLoadingLight: Story = {
  args: {
    cycle: mockCycleEmpty,
    resolvedTheme: "light",
    currentTab: "Priority-Issues",
    isPanelLoading: true,
  },
  render: (args) => (
    <ThemedWrapper theme="light">
      <ActiveCycleStatsView {...args} />
    </ThemedWrapper>
  ),
};

export const PanelLoadingDark: Story = {
  args: {
    cycle: mockCycleEmpty,
    resolvedTheme: "dark",
    currentTab: "Priority-Issues",
    isPanelLoading: true,
  },
  render: (args) => (
    <ThemedWrapper theme="dark">
      <ActiveCycleStatsView {...args} />
    </ThemedWrapper>
  ),
};

// Empty States - Priority Issues
export const EmptyPriorityIssuesLight: Story = {
  args: {
    cycle: mockCycleEmpty,
    resolvedTheme: "light",
    currentTab: "Priority-Issues",
    priorityIssues: [],
  },
  render: (args) => (
    <ThemedWrapper theme="light">
      <ActiveCycleStatsView {...args} />
    </ThemedWrapper>
  ),
};

export const EmptyPriorityIssuesDark: Story = {
  args: {
    cycle: mockCycleEmpty,
    resolvedTheme: "dark",
    currentTab: "Priority-Issues",
    priorityIssues: [],
  },
  render: (args) => (
    <ThemedWrapper theme="dark">
      <ActiveCycleStatsView {...args} />
    </ThemedWrapper>
  ),
};

// Empty States - Assignees
export const EmptyAssigneesLight: Story = {
  args: {
    cycle: mockCycleEmpty,
    resolvedTheme: "light",
    currentTab: "Assignees",
  },
  render: (args) => (
    <ThemedWrapper theme="light">
      <ActiveCycleStatsView {...args} />
    </ThemedWrapper>
  ),
};

export const EmptyAssigneesDark: Story = {
  args: {
    cycle: mockCycleEmpty,
    resolvedTheme: "dark",
    currentTab: "Assignees",
  },
  render: (args) => (
    <ThemedWrapper theme="dark">
      <ActiveCycleStatsView {...args} />
    </ThemedWrapper>
  ),
};

// Empty States - Labels
export const EmptyLabelsLight: Story = {
  args: {
    cycle: mockCycleEmpty,
    resolvedTheme: "light",
    currentTab: "Labels",
  },
  render: (args) => (
    <ThemedWrapper theme="light">
      <ActiveCycleStatsView {...args} />
    </ThemedWrapper>
  ),
};

export const EmptyLabelsDark: Story = {
  args: {
    cycle: mockCycleEmpty,
    resolvedTheme: "dark",
    currentTab: "Labels",
  },
  render: (args) => (
    <ThemedWrapper theme="dark">
      <ActiveCycleStatsView {...args} />
    </ThemedWrapper>
  ),
};

// Populated States - Priority Issues
export const PopulatedPriorityIssuesLight: Story = {
  args: {
    cycle: mockCycleWithBoth,
    resolvedTheme: "light",
    currentTab: "Priority-Issues",
    priorityIssues: mockPriorityIssues,
  },
  render: (args) => (
    <ThemedWrapper theme="light">
      <ActiveCycleStatsView {...args} />
    </ThemedWrapper>
  ),
};

export const PopulatedPriorityIssuesDark: Story = {
  args: {
    cycle: mockCycleWithBoth,
    resolvedTheme: "dark",
    currentTab: "Priority-Issues",
    priorityIssues: mockPriorityIssues,
  },
  render: (args) => (
    <ThemedWrapper theme="dark">
      <ActiveCycleStatsView {...args} />
    </ThemedWrapper>
  ),
};

// Populated States - Assignees
export const PopulatedAssigneesLight: Story = {
  args: {
    cycle: mockCycleWithAssignees,
    resolvedTheme: "light",
    currentTab: "Assignees",
  },
  render: (args) => (
    <ThemedWrapper theme="light">
      <ActiveCycleStatsView {...args} />
    </ThemedWrapper>
  ),
};

export const PopulatedAssigneesDark: Story = {
  args: {
    cycle: mockCycleWithAssignees,
    resolvedTheme: "dark",
    currentTab: "Assignees",
  },
  render: (args) => (
    <ThemedWrapper theme="dark">
      <ActiveCycleStatsView {...args} />
    </ThemedWrapper>
  ),
};

// Populated States - Labels
export const PopulatedLabelsLight: Story = {
  args: {
    cycle: mockCycleWithLabels,
    resolvedTheme: "light",
    currentTab: "Labels",
  },
  render: (args) => (
    <ThemedWrapper theme="light">
      <ActiveCycleStatsView {...args} />
    </ThemedWrapper>
  ),
};

export const PopulatedLabelsDark: Story = {
  args: {
    cycle: mockCycleWithLabels,
    resolvedTheme: "dark",
    currentTab: "Labels",
  },
  render: (args) => (
    <ThemedWrapper theme="dark">
      <ActiveCycleStatsView {...args} />
    </ThemedWrapper>
  ),
};
