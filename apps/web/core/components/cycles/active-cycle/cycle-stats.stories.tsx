import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ICycle } from "@plane/types";
// components
import { ActiveCycleStats } from "./cycle-stats";
// store context
import { StoreContext } from "@/lib/store-context";

// Mock store context - provides minimal stub implementations
const createMockStore = (issueMap: Record<string, any> = {}) =>
  ({
    issue: {
      // useIssues(EIssuesStoreType.CYCLE) reads context.issue.issues.issuesMap and context.issue.cycleIssues
      issues: {
        issuesMap: issueMap,
      },
      cycleIssues: {
        fetchNextActiveCycleIssues: async () => {},
      },
      cycleIssuesFilter: {},
      // useIssueDetail() reads context.issue.issueDetail
      issueDetail: {
        getIssueById: (id: string) => issueMap[id] ?? null,
        setPeekIssue: () => {},
        issue: {
          getIssueById: (id: string) => issueMap[id] ?? null,
        },
      },
      epicDetail: {
        getIssueById: () => null,
        setPeekIssue: () => {},
        issue: { getIssueById: () => null },
      },
    },
    // useProject() reads context.projectRoot.project
    projectRoot: {
      project: {
        getProjectIdentifierById: () => "DEMO",
      },
    },
    // useProjectState() reads context.state
    state: {
      getProjectStateIds: () => ["state-1", "state-2", "state-3"],
      fetchProjectStates: async () => {},
      getStateById: (id: string) => ({
        id,
        name: "In Progress",
        color: "#3b82f6",
        group: "started",
      }),
    },
  }) as any;

// Mock cycle data with distribution
const mockCycle: ICycle = {
  id: "cycle-1",
  name: "Sprint 42",
  description: "Current sprint cycle",
  start_date: "2024-01-15",
  end_date: "2024-01-31",
  project_id: "project-1",
  workspace_id: "workspace-1",
  owned_by_id: "user-1",
  sort_order: 0,
  archived_at: null,
  status: "current",
  total_issues: 24,
  completed_issues: 14,
  backlog_issues: 2,
  started_issues: 5,
  unstarted_issues: 3,
  cancelled_issues: 0,
  backlog_estimate_points: 0,
  started_estimate_points: 0,
  unstarted_estimate_points: 0,
  cancelled_estimate_points: 0,
  progress_snapshot: undefined,
  view_props: { filters: {} },
  project_detail: { id: "project-1" },
  progress: [],
  version: 1,
  distribution: {
    assignees: [
      {
        assignee_id: "u1",
        display_name: "Alice Johnson",
        avatar_url: "https://i.pravatar.cc/150?img=1",
        first_name: "Alice",
        last_name: "Johnson",
        total_issues: 8,
        completed_issues: 5,
        pending_issues: 3,
      },
      {
        assignee_id: "u2",
        display_name: "Bob Smith",
        avatar_url: "https://i.pravatar.cc/150?img=2",
        first_name: "Bob",
        last_name: "Smith",
        total_issues: 6,
        completed_issues: 4,
        pending_issues: 2,
      },
      {
        assignee_id: "u3",
        display_name: "Carol White",
        avatar_url: "https://i.pravatar.cc/150?img=3",
        first_name: "Carol",
        last_name: "White",
        total_issues: 5,
        completed_issues: 3,
        pending_issues: 2,
      },
      {
        assignee_id: null,
        display_name: "Unassigned",
        avatar_url: null,
        first_name: null,
        last_name: null,
        total_issues: 5,
        completed_issues: 2,
        pending_issues: 3,
      },
    ],
    labels: [
      {
        label_id: "l1",
        label_name: "bug",
        color: "#ef4444",
        total_issues: 7,
        completed_issues: 3,
        pending_issues: 4,
      },
      {
        label_id: "l2",
        label_name: "feature",
        color: "#3b82f6",
        total_issues: 9,
        completed_issues: 6,
        pending_issues: 3,
      },
      {
        label_id: "l3",
        label_name: "improvement",
        color: "#10b981",
        total_issues: 5,
        completed_issues: 4,
        pending_issues: 1,
      },
      {
        label_id: "l4",
        label_name: "documentation",
        color: "#f59e0b",
        total_issues: 3,
        completed_issues: 1,
        pending_issues: 2,
      },
    ],
    completion_chart: {},
  },
};

// Mock issue data for Priority Issues tab
const mockIssueMap: Record<string, any> = {
  "issue-1": {
    id: "issue-1",
    name: "Fix login page authentication bug",
    priority: "urgent",
    state_id: "state-1",
    target_date: "2024-01-25",
  },
  "issue-2": {
    id: "issue-2",
    name: "Implement dark mode toggle",
    priority: "high",
    state_id: "state-2",
    target_date: "2024-01-28",
  },
  "issue-3": {
    id: "issue-3",
    name: "Add CSV export functionality",
    priority: "high",
    state_id: "state-1",
    target_date: "2024-01-30",
  },
  "issue-4": {
    id: "issue-4",
    name: "Optimize database queries",
    priority: "urgent",
    state_id: "state-3",
    target_date: "2024-01-22",
  },
};

// Mock cycleIssueDetails for Priority Issues tab
const mockCycleIssueDetails = {
  issueIds: ["issue-1", "issue-2", "issue-3", "issue-4"],
  issueCount: 4,
  nextCursor: "",
  nextPageResults: false,
  perPageCount: 20,
};

// Mock store provider wrapper
const MockStoreProvider = ({
  children,
  issueMap = mockIssueMap,
}: {
  children: React.ReactNode;
  issueMap?: Record<string, any>;
}) => {
  const mockStore = createMockStore(issueMap);
  return <StoreContext.Provider value={mockStore as any}>{children}</StoreContext.Provider>;
};

const meta: Meta<typeof ActiveCycleStats> = {
  title: "Cycles/ActiveCycleStats",
  component: ActiveCycleStats,
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story, ctx) => {
      // The component persists the active tab in localStorage; force it per-story so
      // the Assignees/Labels stories open on the intended tab instead of a stale value.
      if (typeof window !== "undefined") {
        const tab = (ctx.parameters as any)?.activeTab;
        if (tab) window.localStorage.setItem("activeCycleTab", JSON.stringify(tab));
      }
      return (
        <MockStoreProvider>
          <div style={{ width: "100%", maxWidth: "640px" }}>
            <Story />
          </div>
        </MockStoreProvider>
      );
    },
  ],
  args: {
    workspaceSlug: "my-workspace",
    projectId: "project-1",
    cycleId: "cycle-1",
    cycle: mockCycle,
    handleFiltersUpdate: () => {},
    cycleIssueDetails: mockCycleIssueDetails,
  },
} satisfies Meta<typeof ActiveCycleStats>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Default (Priority Issues Tab)",
  parameters: {
    activeTab: "Priority-Issues",
  },
};

export const AssigneesTab: Story = {
  name: "Assignees Tab",
  parameters: {
    activeTab: "Assignees",
    docs: {
      description: {
        story: "Shows distribution of issues across team members with progress bars",
      },
    },
  },
};

export const LabelsTab: Story = {
  name: "Labels Tab",
  parameters: {
    activeTab: "Labels",
    docs: {
      description: {
        story: "Shows distribution of issues by labels with color indicators",
      },
    },
  },
};

export const EmptyPriorityIssues: Story = {
  name: "Empty Priority Issues",
  args: {
    cycleIssueDetails: {
      issueIds: [],
      issueCount: 0,
      nextCursor: "",
      nextPageResults: false,
      perPageCount: 20,
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Empty state when no high/urgent priority issues exist in the cycle",
      },
    },
  },
};

export const EmptyAssignees: Story = {
  name: "Empty Assignees",
  args: {
    cycle: {
      ...mockCycle,
      distribution: {
        assignees: [],
        labels: mockCycle.distribution?.labels || [],
        completion_chart: {},
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Empty state when no assignees are present in the cycle",
      },
    },
  },
};

export const EmptyLabels: Story = {
  name: "Empty Labels",
  args: {
    cycle: {
      ...mockCycle,
      distribution: {
        assignees: mockCycle.distribution?.assignees || [],
        labels: [],
        completion_chart: {},
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Empty state when no labels are present in the cycle",
      },
    },
  },
};

export const LoadingState: Story = {
  name: "Loading State",
  args: {
    cycle: { ...mockCycle, distribution: undefined },
    cycleIssueDetails: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: "Loading skeleton when cycle data is being fetched",
      },
    },
  },
};

export const NoActiveCycle: Story = {
  name: "No Active Cycle",
  args: {
    cycleId: null,
    cycle: null,
    cycleIssueDetails: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: "Loading state when no active cycle is set",
      },
    },
  },
};
