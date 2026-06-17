import type { Meta, StoryObj } from "@storybook/react-vite";
import { BrowserRouter } from "react-router";
import type { ICycle, TIssue, IState, TIssuePriorities } from "@plane/types";
import { TranslationProvider } from "@plane/i18n";
import type { TWorkItemFilterCondition } from "@plane/shared-state";
import { StoreContext } from "@/lib/store-context";
import type { ActiveCycleIssueDetails } from "@/store/issue/cycle";
import { ActiveCycleStats } from "./cycle-stats";

// ==================== Mock Data ====================

// Mock States
const MOCK_STATES: Record<string, IState> = {
  "state-backlog": {
    id: "state-backlog",
    name: "Backlog",
    color: "#94a3b8",
    group: "backlog",
    default: false,
    description: "",
    project_id: "proj-1",
    sequence: 0,
    workspace_id: "ws-1",
    order: 0,
  },
  "state-todo": {
    id: "state-todo",
    name: "Todo",
    color: "#9ca3af",
    group: "unstarted",
    default: true,
    description: "",
    project_id: "proj-1",
    sequence: 1,
    workspace_id: "ws-1",
    order: 1,
  },
  "state-inprogress": {
    id: "state-inprogress",
    name: "In Progress",
    color: "#3b82f6",
    group: "started",
    default: false,
    description: "",
    project_id: "proj-1",
    sequence: 2,
    workspace_id: "ws-1",
    order: 2,
  },
  "state-done": {
    id: "state-done",
    name: "Done",
    color: "#10b981",
    group: "completed",
    default: false,
    description: "",
    project_id: "proj-1",
    sequence: 3,
    workspace_id: "ws-1",
    order: 3,
  },
  "state-cancelled": {
    id: "state-cancelled",
    name: "Cancelled",
    color: "#ef4444",
    group: "cancelled",
    default: false,
    description: "",
    project_id: "proj-1",
    sequence: 4,
    workspace_id: "ws-1",
    order: 4,
  },
};

// Mock Issues (for Priority Issues tab)
const createMockIssue = (
  id: string,
  sequenceId: number,
  name: string,
  priority: TIssuePriorities | null,
  stateId: string,
  targetDate: string | null
): TIssue => ({
  id,
  sequence_id: sequenceId,
  name,
  sort_order: sequenceId * 1000,
  state_id: stateId,
  priority,
  label_ids: [],
  assignee_ids: [],
  estimate_point: null,
  sub_issues_count: 0,
  attachment_count: 0,
  link_count: 0,
  project_id: "proj-1",
  parent_id: null,
  cycle_id: "cycle-1",
  module_ids: null,
  type_id: null,
  created_at: "2025-07-21T10:00:00Z",
  updated_at: "2025-07-21T10:00:00Z",
  start_date: null,
  target_date: targetDate,
  completed_at: null,
  archived_at: null,
  created_by: "user-1",
  updated_by: "user-1",
  is_draft: false,
});

const MOCK_ISSUES: Record<string, TIssue> = {
  "issue-1": createMockIssue(
    "issue-1",
    101,
    "Fix authentication token expiry on mobile Safari",
    "urgent",
    "state-inprogress",
    "2025-08-15"
  ),
  "issue-2": createMockIssue(
    "issue-2",
    102,
    "Resolve race condition in background sync worker",
    "high",
    "state-todo",
    "2025-08-20"
  ),
  "issue-3": createMockIssue(
    "issue-3",
    103,
    "Update dependency versions for security patches",
    "high",
    "state-inprogress",
    "2025-08-18"
  ),
  "issue-4": createMockIssue(
    "issue-4",
    104,
    "Implement rate limiting for API endpoints",
    "urgent",
    "state-todo",
    "2025-08-17"
  ),
  "issue-5": createMockIssue(
    "issue-5",
    105,
    "Fix memory leak in WebSocket connection handler",
    "high",
    "state-done",
    "2025-08-14"
  ),
};

// Mock Cycle Distribution - Assignees
const MOCK_CYCLE_ASSIGNEES = [
  {
    assignee_id: "user-1",
    avatar_url: "https://i.pravatar.cc/32?img=1",
    first_name: "Alice",
    last_name: "Chen",
    display_name: "Alice Chen",
    total_issues: 12,
    completed_issues: 8,
    pending_issues: 4,
  },
  {
    assignee_id: "user-2",
    avatar_url: "https://i.pravatar.cc/32?img=2",
    first_name: "Bob",
    last_name: "Martinez",
    display_name: "Bob Martinez",
    total_issues: 9,
    completed_issues: 3,
    pending_issues: 6,
  },
  {
    assignee_id: "user-3",
    avatar_url: "https://i.pravatar.cc/32?img=3",
    first_name: "Carol",
    last_name: "Kim",
    display_name: "Carol Kim",
    total_issues: 15,
    completed_issues: 11,
    pending_issues: 4,
  },
  {
    assignee_id: "user-4",
    avatar_url: "https://i.pravatar.cc/32?img=4",
    first_name: "David",
    last_name: "Patel",
    display_name: "David Patel",
    total_issues: 7,
    completed_issues: 5,
    pending_issues: 2,
  },
  {
    assignee_id: "user-5",
    avatar_url: "https://i.pravatar.cc/32?img=5",
    first_name: "Eva",
    last_name: "Schmidt",
    display_name: "Eva Schmidt",
    total_issues: 11,
    completed_issues: 7,
    pending_issues: 4,
  },
];

// Mock Cycle Distribution - Labels
const MOCK_CYCLE_LABELS = [
  {
    label_id: "label-1",
    label_name: "Bug",
    color: "#ef4444",
    total_issues: 15,
    completed_issues: 9,
    pending_issues: 6,
  },
  {
    label_id: "label-2",
    label_name: "Feature",
    color: "#3b82f6",
    total_issues: 10,
    completed_issues: 7,
    pending_issues: 3,
  },
  {
    label_id: "label-3",
    label_name: "Enhancement",
    color: "#8b5cf6",
    total_issues: 8,
    completed_issues: 5,
    pending_issues: 3,
  },
  {
    label_id: "label-4",
    label_name: "Documentation",
    color: "#10b981",
    total_issues: 6,
    completed_issues: 4,
    pending_issues: 2,
  },
  {
    label_id: "label-5",
    label_name: "Performance",
    color: "#f59e0b",
    total_issues: 5,
    completed_issues: 3,
    pending_issues: 2,
  },
];

// Mock Cycle
const createMockCycle = (
  assignees: typeof MOCK_CYCLE_ASSIGNEES = [],
  labels: typeof MOCK_CYCLE_LABELS = []
): ICycle => ({
  id: "cycle-1",
  name: "Sprint 23 — Core Platform",
  description: "Focus on platform stability and performance improvements",
  project_id: "proj-1",
  workspace_id: "ws-1",
  start_date: "2025-07-21",
  end_date: "2025-08-04",
  owned_by_id: "user-1",
  sort_order: 1,
  archived_at: null,
  total_issues: 40,
  completed_issues: 24,
  backlog_issues: 2,
  started_issues: 10,
  unstarted_issues: 4,
  cancelled_issues: 0,
  backlog_estimate_points: 0,
  started_estimate_points: 0,
  unstarted_estimate_points: 0,
  cancelled_estimate_points: 0,
  view_props: {
    filters: {},
  },
  project_detail: {
    id: "proj-1",
  },
  progress: [],
  version: 1,
  distribution: {
    assignees,
    labels,
    completion_chart: {},
  },
  progress_snapshot: undefined,
});

// Mock Store Context
const createMockStore = (issuesMap: Record<string, TIssue> = {}) => {
  const mockStore = {
    issue: {
      issueDetail: {
        issue: {
          getIssueById: (id: string) => issuesMap[id] || null,
        },
        setPeekIssue: () => {},
      },
      cycleIssues: {
        fetchNextActiveCycleIssues: async () => {},
      },
      issues: {
        issuesMap,
      },
      cycleIssuesFilter: {},
    },
    projectRoot: {
      project: {
        getProjectIdentifierById: () => "WEB",
      },
    },
    state: {
      getProjectStateIds: () => Object.keys(MOCK_STATES),
      getStateById: (id: string) => MOCK_STATES[id] || null,
      fetchProjectStates: async () => {},
    },
  } as any;

  return mockStore;
};

// ==================== Story Wrapper ====================

interface StoryWrapperProps {
  workspaceSlug?: string;
  projectId?: string;
  cycle: ICycle | null;
  cycleId?: string | null;
  cycleIssueDetails?: ActiveCycleIssueDetails | { nextPageResults: boolean };
  issuesMap?: Record<string, TIssue>;
  activeTab?: "Priority-Issues" | "Assignees" | "Labels";
  theme?: "light" | "dark";
}

const StoryWrapper = ({
  workspaceSlug = "workspace-1",
  projectId = "proj-1",
  cycle,
  cycleId = "cycle-1",
  cycleIssueDetails,
  issuesMap = {},
  activeTab,
  theme,
}: StoryWrapperProps) => {
  const mockStore = createMockStore(issuesMap);

  // Set active tab in localStorage before render
  if (activeTab) {
    localStorage.setItem("activeCycleTab", JSON.stringify(activeTab));
  }

  const handleFiltersUpdate = (conditions: TWorkItemFilterCondition[]) => {
    // Handler for filter updates triggered by user interaction with cycle stats
  };

  const content = (
    <TranslationProvider>
      <StoreContext.Provider value={mockStore}>
        <BrowserRouter>
          <div className="p-8 bg-canvas">
            <ActiveCycleStats
              workspaceSlug={workspaceSlug}
              projectId={projectId}
              cycle={cycle}
              cycleId={cycleId}
              handleFiltersUpdate={handleFiltersUpdate}
              cycleIssueDetails={cycleIssueDetails}
            />
          </div>
        </BrowserRouter>
      </StoreContext.Provider>
    </TranslationProvider>
  );

  // The design system's dark tokens are scoped to the root element
  // ([data-theme*="dark"] on :root), so set it on <html> rather than a child div.
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-theme", theme === "dark" ? "dark" : "light");
  }

  return content;
};

// ==================== Storybook Meta ====================

const meta: Meta<typeof ActiveCycleStats> = {
  title: "Components/Cycles/ActiveCycleStats",
  component: ActiveCycleStats,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

// ==================== Stories ====================

// Loading State
export const Loading: Story = {
  render: () => <StoryWrapper cycle={null} cycleId={null} cycleIssueDetails={undefined} issuesMap={{}} />,
};

// Empty State - Priority Issues Tab
export const EmptyPriorityIssues: Story = {
  render: () => {
    const emptyIssueDetails: ActiveCycleIssueDetails = {
      issueIds: [],
      issueCount: 0,
      nextCursor: "",
      nextPageResults: false,
      perPageCount: 0,
    };

    const emptyDistributionCycle = createMockCycle([], []);

    return (
      <StoryWrapper
        cycle={emptyDistributionCycle}
        cycleId="cycle-1"
        cycleIssueDetails={emptyIssueDetails}
        issuesMap={{}}
        activeTab="Priority-Issues"
      />
    );
  },
};

// Empty State - Assignees Tab
export const EmptyAssignees: Story = {
  render: () => {
    const emptyIssueDetails: ActiveCycleIssueDetails = {
      issueIds: [],
      issueCount: 0,
      nextCursor: "",
      nextPageResults: false,
      perPageCount: 0,
    };

    const emptyAssigneesCycle = createMockCycle([], MOCK_CYCLE_LABELS);

    return (
      <StoryWrapper
        cycle={emptyAssigneesCycle}
        cycleId="cycle-1"
        cycleIssueDetails={emptyIssueDetails}
        issuesMap={{}}
        activeTab="Assignees"
      />
    );
  },
};

// Empty State - Labels Tab
export const EmptyLabels: Story = {
  render: () => {
    const emptyIssueDetails: ActiveCycleIssueDetails = {
      issueIds: [],
      issueCount: 0,
      nextCursor: "",
      nextPageResults: false,
      perPageCount: 0,
    };

    const emptyLabelsCycle = createMockCycle(MOCK_CYCLE_ASSIGNEES, []);

    return (
      <StoryWrapper
        cycle={emptyLabelsCycle}
        cycleId="cycle-1"
        cycleIssueDetails={emptyIssueDetails}
        issuesMap={{}}
        activeTab="Labels"
      />
    );
  },
};

// Populated - Priority Issues Tab
export const PopulatedPriorityIssues: Story = {
  render: () => {
    const populatedIssueDetails: ActiveCycleIssueDetails = {
      issueIds: Object.keys(MOCK_ISSUES),
      issueCount: Object.keys(MOCK_ISSUES).length,
      nextCursor: "",
      nextPageResults: false,
      perPageCount: 25,
    };

    const populatedCycle = createMockCycle(MOCK_CYCLE_ASSIGNEES, MOCK_CYCLE_LABELS);

    return (
      <StoryWrapper
        cycle={populatedCycle}
        cycleId="cycle-1"
        cycleIssueDetails={populatedIssueDetails}
        issuesMap={MOCK_ISSUES}
        activeTab="Priority-Issues"
      />
    );
  },
};

// Populated - Assignees Tab
export const PopulatedAssignees: Story = {
  render: () => {
    const populatedIssueDetails: ActiveCycleIssueDetails = {
      issueIds: Object.keys(MOCK_ISSUES),
      issueCount: Object.keys(MOCK_ISSUES).length,
      nextCursor: "",
      nextPageResults: false,
      perPageCount: 25,
    };

    const populatedCycle = createMockCycle(MOCK_CYCLE_ASSIGNEES, MOCK_CYCLE_LABELS);

    return (
      <StoryWrapper
        cycle={populatedCycle}
        cycleId="cycle-1"
        cycleIssueDetails={populatedIssueDetails}
        issuesMap={MOCK_ISSUES}
        activeTab="Assignees"
      />
    );
  },
};

// Populated - Labels Tab
export const PopulatedLabels: Story = {
  render: () => {
    const populatedIssueDetails: ActiveCycleIssueDetails = {
      issueIds: Object.keys(MOCK_ISSUES),
      issueCount: Object.keys(MOCK_ISSUES).length,
      nextCursor: "",
      nextPageResults: false,
      perPageCount: 25,
    };

    const populatedCycle = createMockCycle(MOCK_CYCLE_ASSIGNEES, MOCK_CYCLE_LABELS);

    return (
      <StoryWrapper
        cycle={populatedCycle}
        cycleId="cycle-1"
        cycleIssueDetails={populatedIssueDetails}
        issuesMap={MOCK_ISSUES}
        activeTab="Labels"
      />
    );
  },
};

// Light Theme - Populated Assignees
export const LightTheme: Story = {
  render: () => {
    const populatedIssueDetails: ActiveCycleIssueDetails = {
      issueIds: Object.keys(MOCK_ISSUES),
      issueCount: Object.keys(MOCK_ISSUES).length,
      nextCursor: "",
      nextPageResults: false,
      perPageCount: 25,
    };

    const populatedCycle = createMockCycle(MOCK_CYCLE_ASSIGNEES, MOCK_CYCLE_LABELS);

    return (
      <StoryWrapper
        cycle={populatedCycle}
        cycleId="cycle-1"
        cycleIssueDetails={populatedIssueDetails}
        issuesMap={MOCK_ISSUES}
        activeTab="Assignees"
        theme="light"
      />
    );
  },
};

// Dark Theme - Populated Assignees
export const DarkTheme: Story = {
  render: () => {
    const populatedIssueDetails: ActiveCycleIssueDetails = {
      issueIds: Object.keys(MOCK_ISSUES),
      issueCount: Object.keys(MOCK_ISSUES).length,
      nextCursor: "",
      nextPageResults: false,
      perPageCount: 25,
    };

    const populatedCycle = createMockCycle(MOCK_CYCLE_ASSIGNEES, MOCK_CYCLE_LABELS);

    return (
      <StoryWrapper
        cycle={populatedCycle}
        cycleId="cycle-1"
        cycleIssueDetails={populatedIssueDetails}
        issuesMap={MOCK_ISSUES}
        activeTab="Assignees"
        theme="dark"
      />
    );
  },
};
