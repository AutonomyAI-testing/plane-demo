import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactElement } from "react";
import { ThemeProvider } from "next-themes";
import { TranslationProvider } from "@plane/i18n";
import type { ICycle, TIssue } from "@plane/types";
// real component + store context
import { StoreContext, store } from "@/lib/store-context";
import { ActiveCycleStats } from "./cycle-stats";
import type { ActiveCycleIssueDetails } from "@/store/issue/cycle";

const WORKSPACE_SLUG = "acme";
const PROJECT_ID = "project-1";
const PROJECT_IDENTIFIER = "PLAN";

// ---- Mock distribution data -------------------------------------------------
const baseDistribution: ICycle["distribution"] = {
  completion_chart: {},
  assignees: [
    {
      assignee_id: "user-1",
      display_name: "Alice Martin",
      first_name: "Alice",
      last_name: "Martin",
      avatar_url: "",
      total_issues: 12,
      pending_issues: 4,
      completed_issues: 8,
    },
    {
      assignee_id: "user-2",
      display_name: "Bob Chen",
      first_name: "Bob",
      last_name: "Chen",
      avatar_url: "",
      total_issues: 10,
      pending_issues: 7,
      completed_issues: 3,
    },
    {
      assignee_id: "user-3",
      display_name: "Carol White",
      first_name: "Carol",
      last_name: "White",
      avatar_url: "",
      total_issues: 11,
      pending_issues: 0,
      completed_issues: 11,
    },
    {
      assignee_id: "user-4",
      display_name: "David Kim",
      first_name: "David",
      last_name: "Kim",
      avatar_url: "",
      total_issues: 7,
      pending_issues: 6,
      completed_issues: 1,
    },
    {
      assignee_id: null,
      display_name: "No Assignee",
      first_name: null,
      last_name: null,
      avatar_url: "",
      total_issues: 5,
      pending_issues: 3,
      completed_issues: 2,
    },
  ],
  labels: [
    { label_id: "lbl-1", label_name: "Bug", color: "#ef4444", total_issues: 8, pending_issues: 3, completed_issues: 5 },
    {
      label_id: "lbl-2",
      label_name: "Feature",
      color: "#3b82f6",
      total_issues: 14,
      pending_issues: 5,
      completed_issues: 9,
    },
    {
      label_id: "lbl-3",
      label_name: "Improvement",
      color: "#10b981",
      total_issues: 6,
      pending_issues: 4,
      completed_issues: 2,
    },
    {
      label_id: "lbl-4",
      label_name: "Design",
      color: "#f59e0b",
      total_issues: 4,
      pending_issues: 0,
      completed_issues: 4,
    },
  ],
};

const emptyDistribution: ICycle["distribution"] = {
  completion_chart: {},
  assignees: [],
  labels: [],
};

function buildCycle(distribution: ICycle["distribution"]): ICycle {
  return {
    id: "cycle-1",
    name: "Sprint 24 — Q2 Delivery",
    description: "",
    start_date: "2024-05-01",
    end_date: "2024-05-15",
    owned_by_id: "user-1",
    project_id: PROJECT_ID,
    workspace_id: "workspace-1",
    sort_order: 1,
    archived_at: null,
    view_props: { filters: {} },
    project_detail: { id: PROJECT_ID },
    progress: [],
    version: 1,
    progress_snapshot: undefined,
    // progress snapshot fields
    total_issues: 37,
    completed_issues: 19,
    backlog_issues: 6,
    started_issues: 8,
    unstarted_issues: 4,
    cancelled_issues: 0,
    backlog_estimate_points: 0,
    started_estimate_points: 0,
    unstarted_estimate_points: 0,
    cancelled_estimate_points: 0,
    distribution,
  } as ICycle;
}

// ---- Mock issues for the Priority Issues tab --------------------------------
const mockIssues: Partial<TIssue>[] = [
  {
    id: "issue-1",
    name: "Login page crashes on Safari when password autofill is used",
    priority: "urgent",
    project_id: PROJECT_ID,
    sequence_id: 142,
    state_id: "state-progress",
    target_date: "2024-05-12",
    archived_at: null,
  },
  {
    id: "issue-2",
    name: "Dashboard widgets fail to refresh after websocket reconnect",
    priority: "high",
    project_id: PROJECT_ID,
    sequence_id: 138,
    state_id: "state-todo",
    target_date: "2024-05-14",
    archived_at: null,
  },
  {
    id: "issue-3",
    name: "Export to CSV drops the last column for large datasets",
    priority: "urgent",
    project_id: PROJECT_ID,
    sequence_id: 131,
    state_id: "state-progress",
    target_date: null,
    archived_at: null,
  },
  {
    id: "issue-4",
    name: "Notifications panel does not mark items read on click",
    priority: "high",
    project_id: PROJECT_ID,
    sequence_id: 125,
    state_id: "state-todo",
    target_date: "2024-05-18",
    archived_at: null,
  },
];

const mockStates = {
  "state-progress": {
    id: "state-progress",
    name: "In Progress",
    group: "started",
    color: "#f59e0b",
    default: false,
    order: 2,
    project_id: PROJECT_ID,
  },
  "state-todo": {
    id: "state-todo",
    name: "Todo",
    group: "unstarted",
    color: "#3b82f6",
    default: true,
    order: 1,
    project_id: PROJECT_ID,
  },
};

const priorityIssueDetails: ActiveCycleIssueDetails = {
  issueIds: mockIssues.map((i) => i.id as string),
  issueCount: mockIssues.length,
  nextCursor: "",
  nextPageResults: false,
  perPageCount: 30,
};

/**
 * Seed the global store with mock data so the component's hooks return our test data.
 * This allows the component to use real store hooks without making network requests.
 */
function seedStore() {
  // Populate issues map for getIssueById lookups in Priority Issues tab
  const issuesMap = store.issue.issues.issuesMap as Record<string, TIssue>;
  mockIssues.forEach((issue) => {
    issuesMap[issue.id as string] = issue as TIssue;
  });
  // Mock project identifier resolution for IssueIdentifier component
  store.projectRoot.project.getProjectIdentifierById = () => PROJECT_IDENTIFIER;
  // Mock state lookups for StateDropdown component
  store.state.stateMap = mockStates as never;
  store.state.getStateById = (id) => (id ? (mockStates as never)[id] : undefined);
  store.state.getProjectStateIds = () => Object.keys(mockStates);
  // Prevent infinite load-more triggered by intersection observer
  (store.issue.issues as any).fetchNextActiveCycleIssues = async () => undefined;
}
seedStore();

const StoryShell = ({ children }: { children: ReactElement }) => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
    <TranslationProvider>
      <StoreContext.Provider value={store}>
        <div className="bg-canvas p-6" style={{ maxWidth: 460 }}>
          {children}
        </div>
      </StoreContext.Provider>
    </TranslationProvider>
  </ThemeProvider>
);

const meta: Meta<typeof ActiveCycleStats> = {
  title: "Cycles/ActiveCycleStats",
  component: ActiveCycleStats,
  parameters: { layout: "padded" },
  decorators: [(Story: any) => <StoryShell>{<Story />}</StoryShell>],
};

export default meta;
type Story = StoryObj<typeof meta>;

// No-op handler for story props that expect callbacks
const noop = () => {};

export const AssigneesTab: Story = {
  args: {
    workspaceSlug: WORKSPACE_SLUG,
    projectId: PROJECT_ID,
    cycleId: "cycle-1",
    cycle: buildCycle(baseDistribution),
    handleFiltersUpdate: noop,
    cycleIssueDetails: priorityIssueDetails,
  },
  play: async () => {
    window.localStorage.setItem("activeCycleTab", JSON.stringify("Assignees"));
  },
};

export const LabelsTab: Story = {
  args: {
    ...AssigneesTab.args,
  },
  play: async () => {
    window.localStorage.setItem("activeCycleTab", JSON.stringify("Labels"));
  },
};

export const PriorityIssuesTab: Story = {
  args: {
    ...AssigneesTab.args,
  },
  play: async () => {
    window.localStorage.setItem("activeCycleTab", JSON.stringify("Priority-Issues"));
  },
};

export const EmptyState: Story = {
  args: {
    workspaceSlug: WORKSPACE_SLUG,
    projectId: PROJECT_ID,
    cycleId: "cycle-1",
    cycle: buildCycle(emptyDistribution),
    handleFiltersUpdate: noop,
    cycleIssueDetails: { issueIds: [], issueCount: 0, nextCursor: "", nextPageResults: false, perPageCount: 30 },
  },
  play: async () => {
    window.localStorage.setItem("activeCycleTab", JSON.stringify("Assignees"));
  },
};

export const LoadingState: Story = {
  args: {
    workspaceSlug: WORKSPACE_SLUG,
    projectId: PROJECT_ID,
    cycleId: "cycle-1",
    cycle: null,
    handleFiltersUpdate: noop,
    cycleIssueDetails: { nextPageResults: false },
  },
  play: async () => {
    window.localStorage.setItem("activeCycleTab", JSON.stringify("Assignees"));
  },
};
