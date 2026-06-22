import { useState } from "react";
import { CalendarCheck } from "lucide-react";
import { Tabs } from "../tabs";
import { Skeleton } from "../skeleton";
import { PriorityIcon } from "../icons";
import { Avatar } from "../avatar";
import { Tooltip } from "../tooltip";

export type TActiveCycleStatsTab = "priority-issues" | "assignees" | "labels";

export type TPriorityIssue = {
  id: string;
  name: string;
  priority: "urgent" | "high" | "medium" | "low" | "none";
  stateName: string;
  stateColor: string;
  targetDate?: string | null;
};

export type TAssigneeDistribution = {
  assigneeId: string | null;
  displayName: string | null;
  avatarUrl: string | null;
  completedIssues: number;
  totalIssues: number;
};

export type TLabelDistribution = {
  labelId: string | null;
  labelName: string | null;
  color: string | null;
  completedIssues: number;
  totalIssues: number;
};

export type ActiveCycleStatsViewProps = {
  priorityIssues?: TPriorityIssue[] | null;
  assignees?: TAssigneeDistribution[] | null;
  labels?: TLabelDistribution[] | null;
  defaultTab?: TActiveCycleStatsTab;
  onIssueClick?: (issueId: string) => void;
  onAssigneeClick?: (assigneeId: string) => void;
  onLabelClick?: (labelId: string) => void;
};

// Helper to calculate completion percentage for display
const calculateCompletionPercentage = (completed: number, total: number): number => {
  return total > 0 ? Math.round((completed / total) * 100) : 0;
};

const SkeletonRow = () => (
  <div className="flex w-full items-center justify-between gap-4 rounded-xs p-1">
    <div className="w-4/6">
      <Skeleton className="h-4 w-full rounded-sm">
        <Skeleton.Item height="h-4" width="w-full" className="rounded-sm" />
      </Skeleton>
    </div>
    <div className="flex w-2/6 items-center justify-end gap-1 px-2">
      <Skeleton className="h-4 w-12 rounded-sm">
        <Skeleton.Item height="h-4" width="w-12" className="rounded-sm" />
      </Skeleton>
    </div>
  </div>
);

export function ActiveCycleStats({
  priorityIssues,
  assignees,
  labels,
  defaultTab = "priority-issues",
  onIssueClick,
  onAssigneeClick,
  onLabelClick,
}: ActiveCycleStatsViewProps) {
  const [activeTab, setActiveTab] = useState<TActiveCycleStatsTab>(defaultTab);

  const renderPriorityIssuesTab = () => {
    // Show skeleton loaders while data is being fetched (null/undefined indicates loading state)
    if (priorityIssues === null || priorityIssues === undefined) {
      return (
        <div className="space-y-2">
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </div>
      );
    }

    // Show empty state when data is fully loaded but contains no items
    if (priorityIssues.length === 0) {
      return <div className="flex h-40 items-center justify-center text-secondary">No items to display.</div>;
    }

    return (
      <div className="space-y-1">
        {priorityIssues.map((issue) => (
          <div
            key={issue.id}
            className="flex w-full items-center gap-2 rounded-xs p-1 cursor-pointer hover:bg-layer-2 transition-colors"
            onClick={() => onIssueClick?.(issue.id)}
          >
            <PriorityIcon priority={issue.priority} size={14} />
            <div className="flex-1 min-w-0">
              <Tooltip tooltipContent={issue.name}>
                <div className="text-13 text-primary truncate">{issue.name}</div>
              </Tooltip>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: issue.stateColor || "#9CA3AF" }}
              />
              <span className="text-11 text-secondary whitespace-nowrap">{issue.stateName}</span>
            </div>
            {issue.targetDate && (
              <div className="flex items-center gap-1 text-secondary">
                <CalendarCheck size={12} />
                <span className="text-11 whitespace-nowrap">{issue.targetDate}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderAssigneesTab = () => {
    // Show skeleton loaders while data is being fetched (null/undefined indicates loading state)
    if (assignees === null || assignees === undefined) {
      return (
        <div className="space-y-2">
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </div>
      );
    }

    // Show empty state when data is fully loaded but contains no items
    if (assignees.length === 0) {
      return <div className="flex h-40 items-center justify-center text-secondary">No items to display.</div>;
    }

    return (
      <div className="space-y-1">
        {assignees.map((assignee) => {
          const percentage = calculateCompletionPercentage(assignee.completedIssues, assignee.totalIssues);
          return (
            <div
              key={assignee.assigneeId || "unassigned"}
              className="flex w-full items-center justify-between gap-4 rounded-xs p-1 text-11 cursor-pointer hover:bg-layer-2 transition-colors"
              onClick={() => onAssigneeClick?.(assignee.assigneeId || "")}
            >
              <div className="w-4/6 flex items-center gap-2 min-w-0">
                <Avatar name={assignee.displayName || "Unassigned"} src={assignee.avatarUrl || undefined} size="sm" />
                <Tooltip tooltipContent={assignee.displayName || "Unassigned"}>
                  <span className="truncate text-secondary">{assignee.displayName || "Unassigned"}</span>
                </Tooltip>
              </div>
              <div className="flex w-2/6 items-center justify-end gap-1 px-2">
                <span className="w-8 text-right text-secondary">{percentage}%</span>
                <span className="text-secondary whitespace-nowrap">of {assignee.totalIssues}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderLabelsTab = () => {
    // Show skeleton loaders while data is being fetched (null/undefined indicates loading state)
    if (labels === null || labels === undefined) {
      return (
        <div className="space-y-2">
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </div>
      );
    }

    // Show empty state when data is fully loaded but contains no items
    if (labels.length === 0) {
      return <div className="flex h-40 items-center justify-center text-secondary">No items to display.</div>;
    }

    return (
      <div className="space-y-1">
        {labels.map((label) => {
          const percentage = calculateCompletionPercentage(label.completedIssues, label.totalIssues);
          return (
            <div
              key={label.labelId || "unlabeled"}
              className="flex w-full items-center justify-between gap-4 rounded-xs p-1 text-11 cursor-pointer hover:bg-layer-2 transition-colors"
              onClick={() => onLabelClick?.(label.labelId || "")}
            >
              <div className="w-4/6 flex items-center gap-2 min-w-0">
                <div
                  className="h-2 w-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: label.color || "#9CA3AF" }}
                />
                <Tooltip tooltipContent={label.labelName || "Unlabeled"}>
                  <span className="truncate text-secondary">{label.labelName || "Unlabeled"}</span>
                </Tooltip>
              </div>
              <div className="flex w-2/6 items-center justify-end gap-1 px-2">
                <span className="w-8 text-right text-secondary">{percentage}%</span>
                <span className="text-secondary whitespace-nowrap">of {label.totalIssues}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 p-4 min-h-[17rem] bg-surface-1 border border-subtle rounded-lg overflow-hidden">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TActiveCycleStatsTab)}>
        <Tabs.List>
          <Tabs.Trigger value="assignees" size="sm">
            Assignees
          </Tabs.Trigger>
          <Tabs.Trigger value="priority-issues" size="sm">
            Priority Issues
          </Tabs.Trigger>
          <Tabs.Trigger value="labels" size="sm">
            Labels
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="priority-issues" className="flex-1 overflow-y-auto">
          {renderPriorityIssuesTab()}
        </Tabs.Content>

        <Tabs.Content value="assignees" className="flex-1 overflow-y-auto">
          {renderAssigneesTab()}
        </Tabs.Content>

        <Tabs.Content value="labels" className="flex-1 overflow-y-auto">
          {renderLabelsTab()}
        </Tabs.Content>
      </Tabs>
    </div>
  );
}

ActiveCycleStats.displayName = "plane-ui-active-cycle-stats";
