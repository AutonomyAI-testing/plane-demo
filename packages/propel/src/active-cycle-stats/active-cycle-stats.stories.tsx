import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CalendarCheck } from "lucide-react";
import { Avatar } from "../avatar/avatar";
import { PriorityIcon } from "../icons/priority-icon";

/** Calculate completion percentage, returning 0 if division by zero would occur */
const calculatePercentage = (completed: number, total: number): number => {
  if (isNaN(Math.round((completed / total) * 100))) return 0;
  return Math.round((completed / total) * 100);
};

/**
 * Self-contained mock of ActiveCycleStats component.
 * Replicates the UI from apps/web/core/components/cycles/active-cycle/cycle-stats.tsx
 * without store dependencies, MobX, or router context.
 */
function ActiveCycleStatsDemo() {
  const [activeTab, setActiveTab] = useState<"priority-issues" | "assignees" | "labels">("priority-issues");

  // Mock data
  const mockAssignees = [
    { id: "1", name: "Alice Johnson", avatarUrl: "https://i.pravatar.cc/150?img=1", completed: 8, total: 12 },
    { id: "2", name: "Bob Smith", avatarUrl: "https://i.pravatar.cc/150?img=2", completed: 5, total: 7 },
    { id: "3", name: "Carol Williams", avatarUrl: "https://i.pravatar.cc/150?img=3", completed: 2, total: 9 },
    { id: "4", name: "David Chen", avatarUrl: "https://i.pravatar.cc/150?img=4", completed: 3, total: 3 },
    { id: "5", name: "Eva Martinez", avatarUrl: "", completed: 0, total: 4 },
  ];

  const mockLabels = [
    { id: "1", name: "Bug", color: "#ef4444", completed: 4, total: 6 },
    { id: "2", name: "Feature", color: "#3b82f6", completed: 6, total: 10 },
    { id: "3", name: "Enhancement", color: "#10b981", completed: 2, total: 5 },
    { id: "4", name: "Documentation", color: "#f59e0b", completed: 1, total: 3 },
  ];

  const mockPriorityIssues = [
    {
      id: "1",
      identifier: "PROJ-42",
      title: "Fix critical authentication bypass vulnerability",
      priority: "urgent" as const,
      state: "In Progress",
      targetDate: "Jul 15",
    },
    {
      id: "2",
      identifier: "PROJ-38",
      title: "Payment processing fails for international cards",
      priority: "high" as const,
      state: "Todo",
      targetDate: "Jul 20",
    },
    {
      id: "3",
      identifier: "PROJ-51",
      title: "Dashboard load time exceeds 10 seconds on mobile",
      priority: "high" as const,
      state: "In Review",
      targetDate: "Jul 18",
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 min-h-[17rem] overflow-hidden bg-surface-1 col-span-1 lg:col-span-2 xl:col-span-1 border border-subtle rounded-lg">
      {/* Tab List */}
      <div
        className="relative border-[0.5px] border-subtle rounded-sm bg-layer-1 p-[1px] grid"
        style={{ gridTemplateColumns: `repeat(3, 1fr)` }}
      >
        {["priority-issues", "assignees", "labels"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as "priority-issues" | "assignees" | "labels")}
            className={`relative z-[1] font-semibold text-11 rounded-[3px] py-1.5 text-placeholder focus:outline-none transition duration-500 ${
              activeTab === tab ? "text-tertiary bg-surface-1" : "hover:text-tertiary"
            }`}
          >
            {tab === "priority-issues" && "Priority Issues"}
            {tab === "assignees" && "Assignees"}
            {tab === "labels" && "Labels"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex h-52 w-full flex-col gap-1 overflow-y-auto text-secondary vertical-scrollbar scrollbar-sm">
        {/* Priority Issues Tab */}
        {activeTab === "priority-issues" && (
          <div className="flex flex-col gap-1">
            {mockPriorityIssues.length > 0 ? (
              mockPriorityIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="group flex cursor-pointer items-center justify-between gap-2 rounded-md hover:bg-surface-2 p-1"
                >
                  <div className="flex items-center gap-1.5 flex-grow w-full min-w-24 truncate">
                    <span className="text-11 font-mono text-tertiary">{issue.identifier}</span>
                    <span className="text-13 text-primary truncate">{issue.title}</span>
                  </div>
                  <PriorityIcon priority={issue.priority} withContainer size={12} />
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="text-11 px-2 py-0.5 bg-layer-1 rounded-sm">{issue.state}</span>
                    <div className="h-full flex items-center gap-1.5 rounded-sm text-11 px-2 py-0.5 bg-layer-1 cursor-pointer group-hover:bg-surface-1">
                      <CalendarCheck className="h-3 w-3 flex-shrink-0" />
                      <span className="text-11">{issue.targetDate}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full w-full">
                <div className="text-center text-secondary">
                  <p className="text-13">No priority issues in this cycle</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Assignees Tab */}
        {activeTab === "assignees" && (
          <div className="flex flex-col gap-1">
            {mockAssignees.length > 0 ? (
              mockAssignees.map((assignee) => (
                <div key={assignee.id} className="flex items-center gap-2 p-1 cursor-pointer hover:bg-surface-2">
                  <Avatar name={assignee.name} src={assignee.avatarUrl || undefined} size="sm" />
                  <span className="text-13 text-secondary truncate flex-grow">{assignee.name}</span>
                  <div className="w-24 h-1.5 bg-layer-2 rounded-full overflow-hidden flex-shrink-0">
                    <div
                      className="h-full bg-accent-primary rounded-full"
                      style={{ width: `${calculatePercentage(assignee.completed, assignee.total)}%` }}
                    />
                  </div>
                  <span className="text-11 text-tertiary min-w-[28px] text-right">
                    {calculatePercentage(assignee.completed, assignee.total)}%
                  </span>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full w-full">
                <div className="text-center text-secondary">
                  <p className="text-13">No assignees in this cycle</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Labels Tab */}
        {activeTab === "labels" && (
          <div className="flex flex-col gap-1">
            {mockLabels.length > 0 ? (
              mockLabels.map((label) => (
                <div key={label.id} className="flex items-center gap-2 p-1 cursor-pointer hover:bg-surface-2">
                  <span className="h-2.5 w-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: label.color }} />
                  <span className="text-13 text-secondary truncate flex-grow">{label.name}</span>
                  <div className="w-24 h-1.5 bg-layer-2 rounded-full overflow-hidden flex-shrink-0">
                    <div
                      className="h-full bg-accent-primary rounded-full"
                      style={{ width: `${calculatePercentage(label.completed, label.total)}%` }}
                    />
                  </div>
                  <span className="text-11 text-tertiary min-w-[28px] text-right">
                    {calculatePercentage(label.completed, label.total)}%
                  </span>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full w-full">
                <div className="text-center text-secondary">
                  <p className="text-13">No labels in this cycle</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const meta = {
  title: "Components/ActiveCycleStats",
  component: ActiveCycleStatsDemo,
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ActiveCycleStatsDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Renders tab navigation with 3 tabs: Priority Issues, Assignees, Labels.
 * @param activeTab - Currently active tab
 * @param setActiveTab - Handler to change active tab
 */
function TabNavigation({
  activeTab,
  setActiveTab,
}: {
  activeTab: "priority-issues" | "assignees" | "labels";
  setActiveTab: (tab: "priority-issues" | "assignees" | "labels") => void;
}) {
  const tabs = ["priority-issues", "assignees", "labels"] as const;
  const tabLabels = {
    "priority-issues": "Priority Issues",
    assignees: "Assignees",
    labels: "Labels",
  };

  return (
    <div
      className="relative border-[0.5px] border-subtle rounded-sm bg-layer-1 p-[1px] grid"
      style={{ gridTemplateColumns: `repeat(3, 1fr)` }}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`relative z-[1] font-semibold text-11 rounded-[3px] py-1.5 text-placeholder focus:outline-none transition duration-500 ${
            activeTab === tab ? "text-tertiary bg-surface-1" : "hover:text-tertiary"
          }`}
        >
          {tabLabels[tab]}
        </button>
      ))}
    </div>
  );
}

/**
 * Renders an empty state message centered in the content area.
 * @param message - The message to display
 */
function EmptyStateContent({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="text-center text-secondary">
        <p className="text-13">{message}</p>
      </div>
    </div>
  );
}

/**
 * Renders a progress bar with label and percentage for assignees/labels.
 * @param displayName - Name to display (assignee or label name)
 * @param completed - Completed count
 * @param total - Total count
 * @param prefix - Optional prefix element (avatar or color swatch)
 */
function ProgressBarItem({
  displayName,
  completed,
  total,
  prefix,
}: {
  displayName: string;
  completed: number;
  total: number;
  prefix: React.ReactNode;
}) {
  const percentage = calculatePercentage(completed, total);
  return (
    <div className="flex items-center gap-2 p-1 cursor-pointer hover:bg-surface-2">
      {prefix}
      <span className="text-13 text-secondary truncate flex-grow">{displayName}</span>
      <div className="w-24 h-1.5 bg-layer-2 rounded-full overflow-hidden flex-shrink-0">
        <div className="h-full bg-accent-primary rounded-full" style={{ width: `${percentage}%` }} />
      </div>
      <span className="text-11 text-tertiary min-w-[28px] text-right">{percentage}%</span>
    </div>
  );
}

/**
 * Shows the Assignees tab with mock assignee data.
 * Displays progress bars for each team member with completed/total issue counts.
 */
function WithAssigneesSample() {
  const [activeTab, setActiveTab] = useState<"priority-issues" | "assignees" | "labels">("assignees");

  const mockAssignees = [
    { id: "1", name: "Alice Johnson", avatarUrl: "https://i.pravatar.cc/150?img=1", completed: 8, total: 12 },
    { id: "2", name: "Bob Smith", avatarUrl: "https://i.pravatar.cc/150?img=2", completed: 5, total: 7 },
    { id: "3", name: "Carol Williams", avatarUrl: "https://i.pravatar.cc/150?img=3", completed: 2, total: 9 },
    { id: "4", name: "David Chen", avatarUrl: "https://i.pravatar.cc/150?img=4", completed: 3, total: 3 },
  ];

  const mockLabels = [
    { id: "1", name: "Bug", color: "#ef4444", completed: 4, total: 6 },
    { id: "2", name: "Feature", color: "#3b82f6", completed: 6, total: 10 },
    { id: "3", name: "Enhancement", color: "#10b981", completed: 2, total: 5 },
    { id: "4", name: "Documentation", color: "#f59e0b", completed: 1, total: 3 },
  ];

  const mockPriorityIssues = [
    {
      id: "1",
      identifier: "PROJ-42",
      title: "Fix critical authentication bypass vulnerability",
      priority: "urgent" as const,
      state: "In Progress",
      targetDate: "Jul 15",
    },
    {
      id: "2",
      identifier: "PROJ-38",
      title: "Payment processing fails for international cards",
      priority: "high" as const,
      state: "In Progress",
      targetDate: "Jul 20",
    },
    {
      id: "3",
      identifier: "PROJ-51",
      title: "Dashboard load time exceeds 10 seconds on mobile",
      priority: "high" as const,
      state: "In Review",
      targetDate: "Jul 18",
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 min-h-[17rem] overflow-hidden bg-surface-1 col-span-1 lg:col-span-2 xl:col-span-1 border border-subtle rounded-lg">
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex h-52 w-full flex-col gap-1 overflow-y-auto text-secondary vertical-scrollbar scrollbar-sm">
        {/* Priority Issues Tab */}
        {activeTab === "priority-issues" && (
          <div className="flex flex-col gap-1">
            {mockPriorityIssues.length > 0 ? (
              mockPriorityIssues.map((issue) => <PriorityIssueRow key={issue.id} issue={issue} />)
            ) : (
              <EmptyStateContent message="No priority issues in this cycle" />
            )}
          </div>
        )}

        {/* Assignees Tab */}
        {activeTab === "assignees" && (
          <div className="flex flex-col gap-1">
            {mockAssignees.map((assignee) => (
              <ProgressBarItem
                key={assignee.id}
                displayName={assignee.name}
                completed={assignee.completed}
                total={assignee.total}
                prefix={<Avatar name={assignee.name} src={assignee.avatarUrl || undefined} size="sm" />}
              />
            ))}
          </div>
        )}

        {/* Labels Tab */}
        {activeTab === "labels" && (
          <div className="flex flex-col gap-1">
            {mockLabels.map((label) => (
              <ProgressBarItem
                key={label.id}
                displayName={label.name}
                completed={label.completed}
                total={label.total}
                prefix={
                  <span className="h-2.5 w-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: label.color }} />
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export const WithAssignees: Story = {
  render: () => <WithAssigneesSample />,
};

/**
 * Shows the Labels tab with mock label data.
 * Displays progress bars for each label with completed/total issue counts.
 */
function WithLabelsSample() {
  const [activeTab, setActiveTab] = useState<"priority-issues" | "assignees" | "labels">("labels");

  const mockLabels = [
    { id: "1", name: "Bug", color: "#ef4444", completed: 4, total: 6 },
    { id: "2", name: "Feature", color: "#3b82f6", completed: 6, total: 10 },
    { id: "3", name: "Enhancement", color: "#10b981", completed: 2, total: 5 },
    { id: "4", name: "Documentation", color: "#f59e0b", completed: 1, total: 3 },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 min-h-[17rem] overflow-hidden bg-surface-1 col-span-1 lg:col-span-2 xl:col-span-1 border border-subtle rounded-lg">
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex h-52 w-full flex-col gap-1 overflow-y-auto text-secondary vertical-scrollbar scrollbar-sm">
        <div className="flex flex-col gap-1">
          {mockLabels.map((label) => (
            <ProgressBarItem
              key={label.id}
              displayName={label.name}
              completed={label.completed}
              total={label.total}
              prefix={
                <span className="h-2.5 w-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: label.color }} />
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export const WithLabels: Story = {
  render: () => <WithLabelsSample />,
};

/**
 * Renders a single priority issue row with metadata badges.
 * @param issue - Issue object with identifier, title, priority, state, and targetDate
 */
function PriorityIssueRow({
  issue,
}: {
  issue: {
    id: string;
    identifier: string;
    title: string;
    priority: "urgent" | "high" | "medium" | "low";
    state: string;
    targetDate: string;
  };
}) {
  return (
    <div className="group flex cursor-pointer items-center justify-between gap-2 rounded-md hover:bg-surface-2 p-1">
      <div className="flex items-center gap-1.5 flex-grow w-full min-w-24 truncate">
        <span className="text-11 font-mono text-tertiary">{issue.identifier}</span>
        <span className="text-13 text-primary truncate">{issue.title}</span>
      </div>
      <PriorityIcon priority={issue.priority} withContainer size={12} />
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <span className="text-11 px-2 py-0.5 bg-layer-1 rounded-sm">{issue.state}</span>
        <div className="h-full flex items-center gap-1.5 rounded-sm text-11 px-2 py-0.5 bg-layer-1 cursor-pointer group-hover:bg-surface-1">
          <CalendarCheck className="h-3 w-3 flex-shrink-0" />
          <span className="text-11">{issue.targetDate}</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Shows the Priority Issues tab with mock urgent/high priority issues.
 * Displays issue identifiers, titles, priority icons, state badges, and target dates.
 */
function WithPriorityIssuesSample() {
  const [activeTab, setActiveTab] = useState<"priority-issues" | "assignees" | "labels">("priority-issues");

  const mockPriorityIssues = [
    {
      id: "1",
      identifier: "PROJ-42",
      title: "Fix critical authentication bypass vulnerability",
      priority: "urgent" as const,
      state: "In Progress",
      targetDate: "Jul 15",
    },
    {
      id: "2",
      identifier: "PROJ-38",
      title: "Payment processing fails for international cards",
      priority: "high" as const,
      state: "In Progress",
      targetDate: "Jul 20",
    },
    {
      id: "3",
      identifier: "PROJ-51",
      title: "Dashboard load time exceeds 10 seconds on mobile",
      priority: "high" as const,
      state: "In Review",
      targetDate: "Jul 18",
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 min-h-[17rem] overflow-hidden bg-surface-1 col-span-1 lg:col-span-2 xl:col-span-1 border border-subtle rounded-lg">
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex h-52 w-full flex-col gap-1 overflow-y-auto text-secondary vertical-scrollbar scrollbar-sm">
        <div className="flex flex-col gap-1">
          {mockPriorityIssues.length > 0 ? (
            mockPriorityIssues.map((issue) => <PriorityIssueRow key={issue.id} issue={issue} />)
          ) : (
            <EmptyStateContent message="No priority issues in this cycle" />
          )}
        </div>
      </div>
    </div>
  );
}

export const WithPriorityIssues: Story = {
  render: () => <WithPriorityIssuesSample />,
};

/**
 * Shows all three tabs with empty states (no data).
 * Demonstrates the empty state UI when a cycle has no issues, assignees, or labels.
 */
function EmptyStateSample() {
  const [activeTab, setActiveTab] = useState<"priority-issues" | "assignees" | "labels">("priority-issues");

  const emptyMessages = {
    "priority-issues": "No priority issues in this cycle",
    assignees: "No assignees in this cycle",
    labels: "No labels in this cycle",
  };

  return (
    <div className="flex flex-col gap-4 p-4 min-h-[17rem] overflow-hidden bg-surface-1 col-span-1 lg:col-span-2 xl:col-span-1 border border-subtle rounded-lg">
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex h-52 w-full flex-col gap-1 overflow-y-auto text-secondary vertical-scrollbar scrollbar-sm">
        <EmptyStateContent message={emptyMessages[activeTab]} />
      </div>
    </div>
  );
}

export const EmptyState: Story = {
  render: () => <EmptyStateSample />,
};
