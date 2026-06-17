import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ICycle } from "@plane/types";
import { ActiveCycleStats } from "./cycle-stats";

// Mock cycle data with comprehensive distribution
const mockCycle: ICycle = {
  id: "cycle-1",
  name: "Sprint 14",
  description: "Q1 2025 Sprint focusing on core features",
  start_date: "2025-01-01",
  end_date: "2025-01-31",
  project_id: "proj-1",
  workspace_id: "ws-1",
  owned_by_id: "user-1",
  archived_at: null,
  sort_order: 1,
  version: 1,
  total_issues: 24,
  completed_issues: 14,
  backlog_issues: 3,
  started_issues: 5,
  unstarted_issues: 2,
  cancelled_issues: 0,
  backlog_estimate_points: 0,
  started_estimate_points: 0,
  unstarted_estimate_points: 0,
  cancelled_estimate_points: 0,
  progress_snapshot: undefined,
  progress: [],
  view_props: { filters: {} },
  project_detail: { id: "proj-1" },
  distribution: {
    assignees: [
      {
        assignee_id: "u1",
        display_name: "Alice Chen",
        avatar_url: "https://i.pravatar.cc/150?img=1",
        first_name: "Alice",
        last_name: "Chen",
        total_issues: 8,
        completed_issues: 6,
        pending_issues: 2,
      },
      {
        assignee_id: "u2",
        display_name: "Bob Smith",
        avatar_url: "https://i.pravatar.cc/150?img=2",
        first_name: "Bob",
        last_name: "Smith",
        total_issues: 7,
        completed_issues: 4,
        pending_issues: 3,
      },
      {
        assignee_id: "u3",
        display_name: "Carol Davis",
        avatar_url: "https://i.pravatar.cc/150?img=3",
        first_name: "Carol",
        last_name: "Davis",
        total_issues: 5,
        completed_issues: 2,
        pending_issues: 3,
      },
      {
        assignee_id: null,
        display_name: null,
        avatar_url: null,
        first_name: null,
        last_name: null,
        total_issues: 4,
        completed_issues: 2,
        pending_issues: 2,
      },
    ],
    labels: [
      {
        label_id: "l1",
        label_name: "Feature",
        color: "#3f76ff",
        total_issues: 10,
        completed_issues: 7,
        pending_issues: 3,
      },
      {
        label_id: "l2",
        label_name: "Bug",
        color: "#f84c4c",
        total_issues: 6,
        completed_issues: 5,
        pending_issues: 1,
      },
      {
        label_id: "l3",
        label_name: "Improvement",
        color: "#18914f",
        total_issues: 5,
        completed_issues: 2,
        pending_issues: 3,
      },
      {
        label_id: null,
        label_name: null,
        color: null,
        total_issues: 3,
        completed_issues: 0,
        pending_issues: 3,
      },
    ],
    completion_chart: {},
  },
};

const meta = {
  title: "Cycles/ActiveCycleStats",
  component: ActiveCycleStats,
  parameters: {
    layout: "padded",
  },
  args: {
    workspaceSlug: "my-workspace",
    projectId: "proj-1",
    cycleId: "cycle-1",
    cycle: mockCycle,
    handleFiltersUpdate: () => {},
    cycleIssueDetails: {
      issueIds: [],
      issueCount: 0,
      nextCursor: "",
      nextPageResults: false,
      perPageCount: 30,
    },
  },
} satisfies Meta<typeof ActiveCycleStats>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default story showing the stats panel with assignees and labels data.
 * Priority issues tab shows empty state since no issues are provided to the store.
 */
export const WithAssigneesAndLabels: Story = {};

/**
 * Loading state when cycle data is not yet available.
 * Shows loader skeletons in all tabs.
 */
export const Loading: Story = {
  args: {
    cycle: null,
    cycleIssueDetails: undefined,
    cycleId: "cycle-1",
  },
};

/**
 * Empty state when cycle has no distribution data (no assignees or labels).
 * Shows empty state illustrations in assignees and labels tabs.
 */
export const EmptyState: Story = {
  args: {
    cycle: {
      ...mockCycle,
      distribution: {
        assignees: [],
        labels: [],
        completion_chart: {},
      },
    },
    cycleIssueDetails: {
      issueIds: [],
      issueCount: 0,
      nextCursor: "",
      nextPageResults: false,
      perPageCount: 30,
    },
  },
};

/**
 * Shows the loader skeleton when no cycleId is provided.
 * The component renders a full-height loader in this case.
 */
export const NoCycleId: Story = {
  args: {
    cycleId: null,
  },
};

/**
 * Cycle with only assignees, no labels.
 */
export const OnlyAssignees: Story = {
  args: {
    cycle: {
      ...mockCycle,
      distribution: {
        assignees: mockCycle.distribution?.assignees ?? [],
        labels: [],
        completion_chart: {},
      },
    },
  },
};

/**
 * Cycle with only labels, no assignees.
 */
export const OnlyLabels: Story = {
  args: {
    cycle: {
      ...mockCycle,
      distribution: {
        assignees: [],
        labels: mockCycle.distribution?.labels ?? [],
        completion_chart: {},
      },
    },
  },
};
