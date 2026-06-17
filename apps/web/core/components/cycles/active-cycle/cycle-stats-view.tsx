import type { FC } from "react";
import { Fragment } from "react";
import { CalendarCheck } from "lucide-react";
// headless ui
import { Tab } from "@headlessui/react";
// plane imports
import { PriorityIcon } from "@plane/propel/icons";
import { Tooltip } from "@plane/propel/tooltip";
// ui
import { Loader, Avatar } from "@plane/ui";
import { cn, renderFormattedDate, renderFormattedDateWithoutYear, getFileURL } from "@plane/utils";
// assets
import darkAssigneeAsset from "@/app/assets/empty-state/active-cycle/assignee-dark.webp?url";
import lightAssigneeAsset from "@/app/assets/empty-state/active-cycle/assignee-light.webp?url";
import darkLabelAsset from "@/app/assets/empty-state/active-cycle/label-dark.webp?url";
import lightLabelAsset from "@/app/assets/empty-state/active-cycle/label-light.webp?url";
import darkPriorityAsset from "@/app/assets/empty-state/active-cycle/priority-dark.webp?url";
import lightPriorityAsset from "@/app/assets/empty-state/active-cycle/priority-light.webp?url";
import userImage from "@/app/assets/user.png?url";
// components
import { SingleProgressStats } from "@/components/core/sidebar/single-progress-stats";
import { SimpleEmptyState } from "@/components/empty-state/simple-empty-state-root";

export type ActiveCycleStatsViewProps = {
  // Which tab is active: 0=Priority-Issues, 1=Assignees, 2=Labels
  activeTab?: number;
  onTabChange?: (index: number) => void;

  // Priority Issues tab
  priorityIssues?: Array<{
    id: string;
    name: string;
    priority: string; // 'urgent' | 'high' | 'medium' | 'low' | 'none'
    state_id: string;
    target_date: string | null;
    sequence_id: number;
    project_identifier: string; // e.g. 'DEMO'
  }>;
  hasMorePriorityIssues?: boolean; // show the loading skeleton at bottom
  priorityIssuesLoading?: boolean; // show skeleton loaders for whole tab

  // Assignees tab
  assignees?: Array<{
    assignee_id: string | null;
    display_name: string | null;
    avatar_url: string | null;
    completed_issues: number;
    total_issues: number;
  }>;
  assigneesLoading?: boolean;

  // Labels tab
  labels?: Array<{
    label_id: string | null;
    label_name: string | null;
    color: string | null;
    completed_issues: number;
    total_issues: number;
  }>;
  labelsLoading?: boolean;

  // Theme for empty state images
  theme?: "light" | "dark";

  onIssueClick?: (issueId: string) => void;
  onAssigneeClick?: (assigneeId: string) => void;
  onLabelClick?: (labelId: string) => void;
};

export const ActiveCycleStatsView: FC<ActiveCycleStatsViewProps> = (props) => {
  const {
    activeTab = 1,
    onTabChange,
    priorityIssues = [],
    hasMorePriorityIssues = false,
    priorityIssuesLoading = false,
    assignees = [],
    assigneesLoading = false,
    labels = [],
    labelsLoading = false,
    theme = "light",
    onIssueClick,
    onAssigneeClick,
    onLabelClick,
  } = props;

  // Resolve empty state assets based on theme
  const priorityResolvedPath = theme === "light" ? lightPriorityAsset : darkPriorityAsset;
  const assigneesResolvedPath = theme === "light" ? lightAssigneeAsset : darkAssigneeAsset;
  const labelsResolvedPath = theme === "light" ? lightLabelAsset : darkLabelAsset;

  const loaders = (
    <Loader className="space-y-3">
      <Loader.Item height="30px" />
      <Loader.Item height="30px" />
      <Loader.Item height="30px" />
    </Loader>
  );

  return (
    <div className="flex flex-col gap-4 p-4 min-h-[17rem] overflow-hidden bg-surface-1 col-span-1 lg:col-span-2 xl:col-span-1 border border-subtle rounded-lg">
      <Tab.Group
        as={Fragment}
        defaultIndex={activeTab}
        onChange={(i) => {
          onTabChange?.(i);
        }}
      >
        <Tab.List
          as="div"
          className="relative border-[0.5px] border-subtle rounded-sm bg-layer-1 p-[1px] grid"
          style={{
            gridTemplateColumns: `repeat(3, 1fr)`,
          }}
        >
          {/* Tab styling: selected tabs get emphasized text and background */}
          <Tab
            className={({ selected }) =>
              cn(
                "relative z-[1] font-semibold text-11 rounded-[3px] py-1.5 text-placeholder focus:outline-none transition duration-500",
                {
                  "text-tertiary bg-surface-1": selected,
                  "hover:text-tertiary": !selected,
                }
              )
            }
          >
            Priority Issues
          </Tab>
          <Tab
            className={({ selected }) =>
              cn(
                "relative z-[1] font-semibold text-11 rounded-[3px] py-1.5 text-placeholder focus:outline-none transition duration-500",
                {
                  "text-tertiary bg-surface-1": selected,
                  "hover:text-tertiary": !selected,
                }
              )
            }
          >
            Assignees
          </Tab>
          <Tab
            className={({ selected }) =>
              cn(
                "relative z-[1] font-semibold text-11 rounded-[3px] py-1.5 text-placeholder focus:outline-none transition duration-500",
                {
                  "text-tertiary bg-surface-1": selected,
                  "hover:text-tertiary": !selected,
                }
              )
            }
          >
            Labels
          </Tab>
        </Tab.List>

        <Tab.Panels as={Fragment}>
          <Tab.Panel
            as="div"
            className="flex h-52 w-full flex-col gap-1 overflow-y-auto  text-secondary vertical-scrollbar scrollbar-sm"
          >
            <div className="flex flex-col gap-1 h-full w-full overflow-y-auto vertical-scrollbar scrollbar-sm">
              {priorityIssuesLoading ? (
                loaders
              ) : priorityIssues.length > 0 ? (
                <>
                  {priorityIssues.map((issue) => (
                    <div
                      key={issue.id}
                      className="group flex cursor-pointer items-center justify-between gap-2 rounded-md hover:bg-surface-2 p-1"
                      onClick={() => onIssueClick?.(issue.id)}
                    >
                      <div className="flex items-center gap-1.5 flex-grow w-full min-w-24 truncate">
                        <span className="text-11 text-placeholder">
                          {issue.project_identifier}-{issue.sequence_id}
                        </span>
                        <Tooltip position="top-start" tooltipHeading="Title" tooltipContent={issue.name}>
                          <span className="text-13 text-primary truncate">{issue.name}</span>
                        </Tooltip>
                      </div>
                      <PriorityIcon priority={issue.priority} withContainer size={12} />
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <div className="px-2 py-0.5 text-11 rounded-sm bg-layer-1 text-placeholder max-w-24 truncate">
                          {issue.state_id}
                        </div>
                        {issue.target_date && (
                          <Tooltip tooltipHeading="Target Date" tooltipContent={renderFormattedDate(issue.target_date)}>
                            <div className="h-full flex truncate items-center gap-1.5 rounded-sm text-11 px-2 py-0.5 bg-layer-1 group-hover:bg-surface-1 cursor-pointer">
                              <CalendarCheck className="h-3 w-3 flex-shrink-0" />
                              <span className="text-11 truncate">
                                {renderFormattedDateWithoutYear(issue.target_date)}
                              </span>
                            </div>
                          </Tooltip>
                        )}
                      </div>
                    </div>
                  ))}
                  {/* Loading skeleton for infinite scroll "Load More" state */}
                  {hasMorePriorityIssues && (
                    <div className="h-11 relative flex items-center gap-3 bg-layer-1 p-3 text-13 cursor-pointer animate-pulse" />
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-full w-full">
                  <SimpleEmptyState title="No priority issues" assetPath={priorityResolvedPath} />
                </div>
              )}
            </div>
          </Tab.Panel>

          <Tab.Panel
            as="div"
            className="flex h-52 w-full flex-col gap-1 overflow-y-auto text-secondary vertical-scrollbar scrollbar-sm"
          >
            {assigneesLoading ? (
              loaders
            ) : assignees.length > 0 ? (
              assignees.map((assignee, index) => {
                if (assignee.assignee_id) {
                  return (
                    <SingleProgressStats
                      key={assignee.assignee_id}
                      title={
                        <div className="flex items-center gap-2">
                          <Avatar
                            name={assignee?.display_name ?? undefined}
                            src={getFileURL(assignee?.avatar_url ?? "")}
                          />
                          <span>{assignee.display_name}</span>
                        </div>
                      }
                      completed={assignee.completed_issues}
                      total={assignee.total_issues}
                      // assignee_id is already checked in the parent condition
                      onClick={() => onAssigneeClick?.(assignee.assignee_id)}
                    />
                  );
                } else {
                  return (
                    <SingleProgressStats
                      key={`unassigned-${index}`}
                      title={
                        <div className="flex items-center gap-2">
                          <div className="h-5 w-5 rounded-full border-2 border-subtle bg-layer-1">
                            <img src={userImage} height="100%" width="100%" className="rounded-full" alt="User" />
                          </div>
                          <span>No assignee</span>
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
                <SimpleEmptyState title="No assignees" assetPath={assigneesResolvedPath} />
              </div>
            )}
          </Tab.Panel>

          <Tab.Panel
            as="div"
            className="flex h-52 w-full flex-col gap-1 overflow-y-auto  text-secondary vertical-scrollbar scrollbar-sm"
          >
            {labelsLoading ? (
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
                  // Only provide onClick if label has an ID
                  onClick={label.label_id ? () => onLabelClick?.(label.label_id) : undefined}
                />
              ))
            ) : (
              <div className="flex items-center justify-center h-full w-full">
                <SimpleEmptyState title="No labels" assetPath={labelsResolvedPath} />
              </div>
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
