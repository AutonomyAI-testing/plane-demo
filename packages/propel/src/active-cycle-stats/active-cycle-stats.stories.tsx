import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { CalendarCheck } from "lucide-react";
import { Avatar } from "../avatar/avatar";
import { Skeleton } from "../skeleton/root";
import { Tabs } from "../tabs/tabs";
import { Tooltip } from "../tooltip/root";
import { PriorityIcon } from "../icons/priority-icon";
import { EmptyStateCompact } from "../empty-state/compact-empty-state";
import { cn } from "../utils/classname";

// ========== Types ==========

type TIssuePriorities = "urgent" | "high" | "medium" | "low" | "none";

type MockIssue = {
  id: string;
  sequence_id: number;
  name: string;
  priority: TIssuePriorities;
  state_name: string;
  state_color: string;
  target_date?: string;
};

type MockAssignee = {
  assignee_id: string | null;
  display_name: string | null;
  avatar_url: string | null;
  first_name: string | null;
  last_name: string | null;
  completed_issues: number;
  total_issues: number;
  pending_issues: number;
};

type MockLabel = {
  label_id: string | null;
  label_name: string | null;
  color: string | null;
  completed_issues: number;
  total_issues: number;
  pending_issues: number;
};

type ActiveCycleStatsProps = {
  loading?: boolean;
  loadingTabs?: boolean;
  issues?: MockIssue[];
  assignees?: MockAssignee[];
  labels?: MockLabel[];
  onIssueClick?: (issueId: string) => void;
  onAssigneeClick?: (assigneeId: string) => void;
  onLabelClick?: (labelId: string) => void;
  defaultTab?: string;
};

// ========== Helper Functions ==========

/**
 * Calculate completion percentage, returning 0 for invalid calculations (e.g., division by zero)
 * @param completed Number of completed items
 * @param total Total number of items
 * @returns Completion percentage as an integer (0-100)
 */
function calculateCompletionPercent(completed: number, total: number): number {
  const rawPercent = Math.round((completed / total) * 100);
  return isNaN(rawPercent) ? 0 : rawPercent;
}

// ========== SingleProgressStats Component ==========

type TSingleProgressStatsProps = {
  title: React.ReactNode;
  completed: number;
  total: number;
  onClick?: () => void;
  selected?: boolean;
};

/**
 * Display a progress bar with title, completion percentage, and count
 * Used for assignee and label distribution stats
 */
function SingleProgressStats({ title, completed, total, onClick, selected = false }: TSingleProgressStatsProps) {
  const percent = calculateCompletionPercent(completed, total);
  return (
    <div
      className={cn(
        "flex w-full items-center justify-between gap-4 rounded-xs p-1 text-11",
        onClick ? "cursor-pointer hover:bg-surface-2" : "",
        selected ? "bg-layer-1" : ""
      )}
      onClick={onClick}
    >
      <div className="w-4/6">{title}</div>
      <div className="flex w-2/6 items-center justify-end gap-2 px-2">
        <div className="flex h-2 w-full max-w-[3.5rem] items-center overflow-hidden rounded-xs bg-surface-2">
          <div className="h-full rounded-xs bg-success-primary" style={{ width: `${percent}%` }} />
        </div>
        <div className="flex h-5 items-center justify-center gap-1">
          <span className="w-8 text-right">{percent}%</span>
        </div>
        <span className="whitespace-nowrap">of {total}</span>
      </div>
    </div>
  );
}

// ========== Presentational Wrapper Component ==========

/**
 * Main component displaying active cycle statistics in a tabbed interface
 * Shows priority issues, assignee distribution, and label distribution
 */
function ActiveCycleStatsPresentation({
  loading = false,
  loadingTabs = false,
  issues = [],
  assignees = [],
  labels = [],
  onIssueClick,
  onAssigneeClick,
  onLabelClick,
  defaultTab = "assignees",
}: ActiveCycleStatsProps) {
  const [selectedTab, setSelectedTab] = useState(defaultTab);

  // Skeleton loader for tab content while distribution data is loading
  const loaders = (
    <Skeleton className="space-y-3">
      <Skeleton.Item height="30px" />
      <Skeleton.Item height="30px" />
      <Skeleton.Item height="30px" />
    </Skeleton>
  );

  if (loading) {
    return (
      <Skeleton className="flex flex-col gap-4 min-h-[17rem] overflow-hidden bg-surface-1 col-span-1 lg:col-span-2 xl:col-span-1">
        <Skeleton.Item width="100%" height="17rem" />
      </Skeleton>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4 min-h-[17rem] overflow-hidden bg-surface-1 col-span-1 lg:col-span-2 xl:col-span-1 border border-subtle rounded-lg w-full max-w-md">
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <Tabs.List
          className="relative border-[0.5px] border-subtle rounded-sm bg-layer-1 p-[1px] grid"
          style={{
            gridTemplateColumns: "repeat(3, 1fr)",
          }}
        >
          <Tabs.Trigger
            value="priority-issues"
            className={cn(
              "relative z-[1] font-semibold text-11 rounded-[3px] py-1.5 text-placeholder focus:outline-none transition duration-500",
              selectedTab === "priority-issues" ? "text-tertiary bg-surface-1" : "hover:text-tertiary"
            )}
          >
            Priority Issues
          </Tabs.Trigger>
          <Tabs.Trigger
            value="assignees"
            className={cn(
              "relative z-[1] font-semibold text-11 rounded-[3px] py-1.5 text-placeholder focus:outline-none transition duration-500",
              selectedTab === "assignees" ? "text-tertiary bg-surface-1" : "hover:text-tertiary"
            )}
          >
            Assignees
          </Tabs.Trigger>
          <Tabs.Trigger
            value="labels"
            className={cn(
              "relative z-[1] font-semibold text-11 rounded-[3px] py-1.5 text-placeholder focus:outline-none transition duration-500",
              selectedTab === "labels" ? "text-tertiary bg-surface-1" : "hover:text-tertiary"
            )}
          >
            Labels
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content
          value="priority-issues"
          className="flex h-52 w-full flex-col gap-1 overflow-y-auto text-secondary vertical-scrollbar scrollbar-sm"
        >
          <div className="flex flex-col gap-1 h-full w-full overflow-y-auto vertical-scrollbar scrollbar-sm">
            {loadingTabs ? (
              loaders
            ) : issues.length > 0 ? (
              issues.map((issue) => (
                <div
                  key={issue.id}
                  className="group flex cursor-pointer items-center justify-between gap-2 rounded-md hover:bg-surface-2 p-1"
                  onClick={() => onIssueClick?.(issue.id)}
                >
                  <div className="flex items-center gap-1.5 flex-grow w-full min-w-24 truncate">
                    <span className="text-11 text-tertiary font-medium">#{issue.sequence_id}</span>
                    <Tooltip tooltipContent={issue.name}>
                      <span className="text-13 text-primary truncate">{issue.name}</span>
                    </Tooltip>
                  </div>
                  <PriorityIcon priority={issue.priority} withContainer size={12} />
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <div className="flex items-center gap-1.5 rounded-sm text-11 px-2 py-0.5 bg-layer-1 max-w-24 truncate">
                      <span
                        className="block h-2 w-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: issue.state_color }}
                      />
                      <span className="text-11 truncate">{issue.state_name}</span>
                    </div>
                    {issue.target_date && (
                      <Tooltip tooltipContent={`Target: ${issue.target_date}`}>
                        <div className="h-full flex truncate items-center gap-1.5 rounded-sm text-11 px-2 py-0.5 bg-layer-1 group-hover:bg-surface-1 cursor-pointer">
                          <CalendarCheck className="h-3 w-3 flex-shrink-0" />
                          <span className="text-11 truncate">{issue.target_date}</span>
                        </div>
                      </Tooltip>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full w-full">
                <EmptyStateCompact assetKey="priority" title="No priority issues yet" />
              </div>
            )}
          </div>
        </Tabs.Content>

        <Tabs.Content
          value="assignees"
          className="flex h-52 w-full flex-col gap-1 overflow-y-auto text-secondary vertical-scrollbar scrollbar-sm"
        >
          {loadingTabs ? (
            loaders
          ) : assignees.length > 0 ? (
            assignees.map((assignee, index) => {
              // Show assigned users with avatar and name
              if (assignee.assignee_id) {
                return (
                  <SingleProgressStats
                    key={assignee.assignee_id}
                    title={
                      <div className="flex items-center gap-2">
                        <Avatar name={assignee.display_name ?? undefined} src={assignee.avatar_url ?? undefined} />
                        <span>{assignee.display_name}</span>
                      </div>
                    }
                    completed={assignee.completed_issues}
                    total={assignee.total_issues}
                    onClick={() => onAssigneeClick?.(assignee.assignee_id!)}
                  />
                );
              } else {
                // Show unassigned issues with a placeholder icon
                return (
                  <SingleProgressStats
                    key={`unassigned-${index}`}
                    title={
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full border-2 border-subtle bg-layer-1 flex items-center justify-center">
                          <span className="text-[8px] text-tertiary">?</span>
                        </div>
                        <span>No Assignee</span>
                      </div>
                    }
                    completed={assignee.completed_issues}
                    total={assignee.total_issues}
                  />
                );
              }
            })
          ) : (
            <div className="flex items-center justify-center h-full w-full">
              <EmptyStateCompact assetKey="members" title="No assignees yet" />
            </div>
          )}
        </Tabs.Content>

        <Tabs.Content
          value="labels"
          className="flex h-52 w-full flex-col gap-1 overflow-y-auto text-secondary vertical-scrollbar scrollbar-sm"
        >
          {loadingTabs ? (
            loaders
          ) : labels.length > 0 ? (
            labels.map((label, index) => (
              <SingleProgressStats
                key={label.label_id ?? `no-label-${index}`}
                title={
                  <div className="flex items-center gap-2 truncate">
                    <span
                      className="block h-3 w-3 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: label.color ?? "#000000",
                      }}
                    />
                    <span className="text-11 text-ellipsis truncate">{label.label_name ?? "No labels"}</span>
                  </div>
                }
                completed={label.completed_issues}
                total={label.total_issues}
                onClick={label.label_id ? () => onLabelClick?.(label.label_id!) : undefined}
              />
            ))
          ) : (
            <div className="flex items-center justify-center h-full w-full">
              <EmptyStateCompact assetKey="label" title="No labels yet" />
            </div>
          )}
        </Tabs.Content>
      </Tabs>
    </div>
  );
}

// ========== Mock Data ==========

const mockIssues: MockIssue[] = [
  {
    id: "issue-1",
    sequence_id: 142,
    name: "Critical API endpoint failing in production",
    priority: "urgent",
    state_name: "In Progress",
    state_color: "#3b82f6",
    target_date: "Mar 15",
  },
  {
    id: "issue-2",
    sequence_id: 138,
    name: "Database migration blocking new feature deployment",
    priority: "urgent",
    state_name: "To Do",
    state_color: "#94a3b8",
    target_date: "Mar 12",
  },
  {
    id: "issue-3",
    sequence_id: 135,
    name: "User authentication flow needs security improvements",
    priority: "high",
    state_name: "In Progress",
    state_color: "#3b82f6",
    target_date: "Mar 18",
  },
  {
    id: "issue-4",
    sequence_id: 130,
    name: "Performance degradation on dashboard load",
    priority: "high",
    state_name: "In Review",
    state_color: "#f59e0b",
  },
  {
    id: "issue-5",
    sequence_id: 125,
    name: "Add rate limiting to public API endpoints",
    priority: "high",
    state_name: "To Do",
    state_color: "#94a3b8",
    target_date: "Mar 20",
  },
];

const mockAssignees: MockAssignee[] = [
  {
    assignee_id: "u1",
    display_name: "Alice Johnson",
    avatar_url: "https://i.pravatar.cc/150?img=1",
    first_name: "Alice",
    last_name: "Johnson",
    completed_issues: 8,
    total_issues: 12,
    pending_issues: 4,
  },
  {
    assignee_id: "u2",
    display_name: "Bob Smith",
    avatar_url: "https://i.pravatar.cc/150?img=2",
    first_name: "Bob",
    last_name: "Smith",
    completed_issues: 5,
    total_issues: 7,
    pending_issues: 2,
  },
  {
    assignee_id: "u3",
    display_name: "Carol Williams",
    avatar_url: "https://i.pravatar.cc/150?img=3",
    first_name: "Carol",
    last_name: "Williams",
    completed_issues: 10,
    total_issues: 15,
    pending_issues: 5,
  },
  {
    assignee_id: "u4",
    display_name: "David Chen",
    avatar_url: "https://i.pravatar.cc/150?img=4",
    first_name: "David",
    last_name: "Chen",
    completed_issues: 3,
    total_issues: 6,
    pending_issues: 3,
  },
  {
    assignee_id: null,
    display_name: null,
    avatar_url: null,
    first_name: null,
    last_name: null,
    completed_issues: 2,
    total_issues: 3,
    pending_issues: 1,
  },
];

const mockLabels: MockLabel[] = [
  {
    label_id: "l1",
    label_name: "Bug",
    color: "#ef4444",
    completed_issues: 6,
    total_issues: 8,
    pending_issues: 2,
  },
  {
    label_id: "l2",
    label_name: "Feature",
    color: "#3b82f6",
    completed_issues: 10,
    total_issues: 18,
    pending_issues: 8,
  },
  {
    label_id: "l3",
    label_name: "Design",
    color: "#8b5cf6",
    completed_issues: 4,
    total_issues: 4,
    pending_issues: 0,
  },
  {
    label_id: "l4",
    label_name: "Backend",
    color: "#f59e0b",
    completed_issues: 3,
    total_issues: 9,
    pending_issues: 6,
  },
  {
    label_id: "l5",
    label_name: "Documentation",
    color: "#10b981",
    completed_issues: 7,
    total_issues: 10,
    pending_issues: 3,
  },
  {
    label_id: "l6",
    label_name: "Testing",
    color: "#ec4899",
    completed_issues: 2,
    total_issues: 5,
    pending_issues: 3,
  },
];

// ========== Stories ==========

const meta = {
  title: "Components/ActiveCycleStats",
  component: ActiveCycleStatsPresentation,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Active Cycle Stats panel component showing priority issues, assignee distribution, and label distribution in a tabbed interface. Used in the active cycle dashboard to provide insights into cycle progress.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div data-theme="light" className="bg-canvas p-4 flex items-start justify-center">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof ActiveCycleStatsPresentation>;

export default meta;
type Story = StoryObj<typeof meta>;

// ========== Story: Loading ==========

export const Loading: Story = {
  args: {
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Full loading skeleton displayed when cycleId is null or the component is initially loading.",
      },
    },
  },
};

// ========== Story: LoadingTabs ==========

export const LoadingTabs: Story = {
  args: {
    loading: false,
    loadingTabs: true,
    defaultTab: "assignees",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Tab headers are visible but content area shows loading skeletons. Occurs when cycleId is set but distribution data hasn't loaded yet.",
      },
    },
  },
};

// ========== Story: PriorityIssuesEmpty ==========

export const PriorityIssuesEmpty: Story = {
  args: {
    loading: false,
    loadingTabs: false,
    issues: [],
    assignees: [],
    labels: [],
    defaultTab: "priority-issues",
  },
  parameters: {
    docs: {
      description: {
        story: "Priority Issues tab with no issues to display, showing an empty state.",
      },
    },
  },
};

// ========== Story: AssigneesEmpty ==========

export const AssigneesEmpty: Story = {
  args: {
    loading: false,
    loadingTabs: false,
    issues: [],
    assignees: [],
    labels: [],
    defaultTab: "assignees",
  },
  parameters: {
    docs: {
      description: {
        story: "Assignees tab with no assignees in the cycle, showing an empty state.",
      },
    },
  },
};

// ========== Story: LabelsEmpty ==========

export const LabelsEmpty: Story = {
  args: {
    loading: false,
    loadingTabs: false,
    issues: [],
    assignees: [],
    labels: [],
    defaultTab: "labels",
  },
  parameters: {
    docs: {
      description: {
        story: "Labels tab with no labels assigned to issues in the cycle, showing an empty state.",
      },
    },
  },
};

// ========== Story: PriorityIssuesPopulated ==========

export const PriorityIssuesPopulated: Story = {
  args: {
    loading: false,
    loadingTabs: false,
    issues: mockIssues,
    assignees: mockAssignees,
    labels: mockLabels,
    defaultTab: "priority-issues",
    onIssueClick: (issueId) => {
      // Action handler would navigate to issue detail or trigger a modal
      alert(`Issue ${issueId} clicked`);
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Priority Issues tab populated with high and urgent priority issues. Each issue displays priority icon, state, and optional target date.",
      },
    },
  },
};

// ========== Story: AssigneesPopulated ==========

export const AssigneesPopulated: Story = {
  args: {
    loading: false,
    loadingTabs: false,
    issues: mockIssues,
    assignees: mockAssignees,
    labels: mockLabels,
    defaultTab: "assignees",
    onAssigneeClick: (assigneeId) => {
      // Action handler would filter issues by assignee or navigate to assignee profile
      alert(`Assignee ${assigneeId} clicked`);
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Assignees tab showing distribution of issues across team members with completion percentages. Includes an unassigned category for issues without assignees.",
      },
    },
  },
};

// ========== Story: LabelsPopulated ==========

export const LabelsPopulated: Story = {
  args: {
    loading: false,
    loadingTabs: false,
    issues: mockIssues,
    assignees: mockAssignees,
    labels: mockLabels,
    defaultTab: "labels",
    onLabelClick: (labelId) => {
      // Action handler would filter issues by label
      alert(`Label ${labelId} clicked`);
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Labels tab displaying the distribution of labeled issues with color-coded indicators and completion percentages.",
      },
    },
  },
};

// ========== Story: AssigneesLightTheme ==========

export const AssigneesLightTheme: Story = {
  args: {
    loading: false,
    loadingTabs: false,
    issues: mockIssues,
    assignees: mockAssignees,
    labels: mockLabels,
    defaultTab: "assignees",
  },
  render: (args) => (
    <div data-theme="light" className="p-6 bg-canvas">
      <ActiveCycleStatsPresentation {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Assignees tab in light theme demonstrating the component's appearance in light mode.",
      },
    },
  },
};

// ========== Story: AssigneesDarkTheme ==========

export const AssigneesDarkTheme: Story = {
  args: {
    loading: false,
    loadingTabs: false,
    issues: mockIssues,
    assignees: mockAssignees,
    labels: mockLabels,
    defaultTab: "assignees",
  },
  render: (args) => {
    // Dark tokens are scoped to :root/:host only, so set data-theme on the document
    // root (a nested wrapper would inherit light values). Restore on cleanup.
    function DarkThemeWrapper() {
      useEffect(() => {
        const root = document.documentElement;
        const prev = root.getAttribute("data-theme");
        root.setAttribute("data-theme", "dark");
        return () => {
          if (prev === null) root.removeAttribute("data-theme");
          else root.setAttribute("data-theme", prev);
        };
      }, []);
      return (
        <div data-theme="dark" className="p-6 bg-canvas">
          <ActiveCycleStatsPresentation {...args} />
        </div>
      );
    }
    return <DarkThemeWrapper />;
  },
  parameters: {
    docs: {
      description: {
        story: "Assignees tab in dark theme demonstrating the component's appearance in dark mode.",
      },
    },
  },
};
