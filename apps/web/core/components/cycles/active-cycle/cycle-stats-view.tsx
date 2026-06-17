import type { FC } from "react";
import { Fragment } from "react";
import { CalendarCheck } from "lucide-react";
// headless ui
import { Tab } from "@headlessui/react";
// plane imports
import { useTranslation } from "@plane/i18n";
import { PriorityIcon } from "@plane/propel/icons";
import { Tooltip } from "@plane/propel/tooltip";
import type { ICycle } from "@plane/types";
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

export type PriorityIssueItem = {
  id: string;
  name: string;
  priority: "urgent" | "high" | "medium" | "low" | "none";
  targetDate?: string | null;
  state?: string;
};

export type ActiveCycleStatsViewProps = {
  cycle: ICycle | null;
  resolvedTheme: "light" | "dark";
  priorityIssues?: PriorityIssueItem[];
  currentTab?: "Priority-Issues" | "Assignees" | "Labels";
  isLoading?: boolean;
  isPanelLoading?: boolean;
  onTabChange?: (tab: "Priority-Issues" | "Assignees" | "Labels") => void;
  onIssueClick?: (issueId: string) => void;
  onAssigneeClick?: (assigneeId: string) => void;
  onLabelClick?: (labelId: string) => void;
};

export const ActiveCycleStatsView: FC<ActiveCycleStatsViewProps> = (props) => {
  const {
    cycle,
    resolvedTheme,
    priorityIssues = [],
    currentTab = "Assignees",
    isLoading = false,
    isPanelLoading = false,
    onTabChange,
    onIssueClick,
    onAssigneeClick,
    onLabelClick,
  } = props;

  // plane hooks
  const { t } = useTranslation();

  // derived values
  const priorityResolvedPath = resolvedTheme === "light" ? lightPriorityAsset : darkPriorityAsset;
  const assigneesResolvedPath = resolvedTheme === "light" ? lightAssigneeAsset : darkAssigneeAsset;
  const labelsResolvedPath = resolvedTheme === "light" ? lightLabelAsset : darkLabelAsset;

  // Maps tab names to their corresponding tab indices for Tab.Group
  const getTabIndex = (tab: string) => {
    switch (tab) {
      case "Priority-Issues":
        return 0;
      case "Assignees":
        return 1;
      case "Labels":
        return 2;
      default:
        return 0;
    }
  };

  // Inverse mapping: converts tab index back to tab name for onTabChange callback
  const getTabName = (index: number): "Priority-Issues" | "Assignees" | "Labels" => {
    switch (index) {
      case 0:
        return "Priority-Issues";
      case 1:
        return "Assignees";
      case 2:
        return "Labels";
      default:
        return "Priority-Issues";
    }
  };

  // Shared tab button styling
  const tabClassName = ({ selected }: { selected: boolean }) =>
    cn(
      "relative z-[1] font-semibold text-11 rounded-[3px] py-1.5 text-placeholder focus:outline-none transition duration-500",
      {
        "text-tertiary bg-surface-1": selected,
        "hover:text-tertiary": !selected,
      }
    );

  const loaders = (
    <Loader className="space-y-3">
      <Loader.Item height="30px" />
      <Loader.Item height="30px" />
      <Loader.Item height="30px" />
    </Loader>
  );

  return isLoading ? (
    <Loader className="flex flex-col gap-4 min-h-[17rem] overflow-hidden bg-surface-1 col-span-1 lg:col-span-2 xl:col-span-1">
      <Loader.Item width="100%" height="17rem" />
    </Loader>
  ) : (
    <div className="flex flex-col gap-4 p-4 min-h-[17rem] overflow-hidden bg-surface-1 col-span-1 lg:col-span-2 xl:col-span-1 border border-subtle rounded-lg">
      <Tab.Group
        as={Fragment}
        defaultIndex={getTabIndex(currentTab)}
        onChange={(i) => {
          if (onTabChange) {
            onTabChange(getTabName(i));
          }
        }}
      >
        <Tab.List
          as="div"
          className="relative border-[0.5px] border-subtle rounded-sm bg-layer-1 p-[1px] grid"
          style={{
            gridTemplateColumns: `repeat(3, 1fr)`,
          }}
        >
          <Tab className={tabClassName}>{t("project_cycles.active_cycle.priority_issue")}</Tab>
          <Tab className={tabClassName}>{t("project_cycles.active_cycle.assignees")}</Tab>
          <Tab className={tabClassName}>{t("project_cycles.active_cycle.labels")}</Tab>
        </Tab.List>

        <Tab.Panels as={Fragment}>
          {/* Priority Issues Panel */}
          <Tab.Panel
            as="div"
            className="flex h-52 w-full flex-col gap-1 overflow-y-auto text-secondary vertical-scrollbar scrollbar-sm"
          >
            <div className="flex flex-col gap-1 h-full w-full overflow-y-auto vertical-scrollbar scrollbar-sm">
              {isPanelLoading ? (
                loaders
              ) : priorityIssues.length > 0 ? (
                priorityIssues.map((issue) => (
                  <div
                    key={issue.id}
                    className="group flex cursor-pointer items-center justify-between gap-2 rounded-md hover:bg-surface-2 p-1"
                    onClick={() => {
                      if (onIssueClick) {
                        onIssueClick(issue.id);
                      }
                    }}
                  >
                    <div className="flex items-center gap-1.5 flex-grow w-full min-w-24 truncate">
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-layer-1 rounded text-11 text-secondary flex-shrink-0">
                        {issue.id}
                      </div>
                      <Tooltip position="top-start" tooltipHeading="Title" tooltipContent={issue.name}>
                        <span className="text-13 text-primary truncate">{issue.name}</span>
                      </Tooltip>
                    </div>
                    <PriorityIcon priority={issue.priority} withContainer size={12} />
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {issue.state && (
                        <div className="px-2 py-0.5 text-11 rounded text-secondary bg-layer-1 max-w-24 truncate">
                          {issue.state}
                        </div>
                      )}
                      {issue.targetDate && (
                        <Tooltip tooltipHeading="Target Date" tooltipContent={renderFormattedDate(issue.targetDate)}>
                          <div className="h-full flex truncate items-center gap-1.5 rounded-sm text-11 px-2 py-0.5 bg-layer-1 group-hover:bg-surface-1 cursor-pointer">
                            <CalendarCheck className="h-3 w-3 flex-shrink-0" />
                            <span className="text-11 truncate">{renderFormattedDateWithoutYear(issue.targetDate)}</span>
                          </div>
                        </Tooltip>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-full w-full">
                  <SimpleEmptyState
                    title={t("active_cycle.empty_state.priority_issue.title")}
                    assetPath={priorityResolvedPath}
                  />
                </div>
              )}
            </div>
          </Tab.Panel>

          {/* Assignees Panel */}
          <Tab.Panel
            as="div"
            className="flex h-52 w-full flex-col gap-1 overflow-y-auto text-secondary vertical-scrollbar scrollbar-sm"
          >
            {isPanelLoading ? (
              loaders
            ) : cycle?.distribution?.assignees && cycle.distribution.assignees.length > 0 ? (
              cycle.distribution.assignees.map((assignee, index) => {
                if (assignee.assignee_id)
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
                      onClick={() => {
                        if (assignee.assignee_id && onAssigneeClick) {
                          onAssigneeClick(assignee.assignee_id);
                        }
                      }}
                    />
                  );
                else
                  return (
                    <SingleProgressStats
                      key={`unassigned-${index}`}
                      title={
                        <div className="flex items-center gap-2">
                          <div className="h-5 w-5 rounded-full border-2 border-subtle bg-layer-1">
                            <img src={userImage} height="100%" width="100%" className="rounded-full" alt="User" />
                          </div>
                          <span>{t("no_assignee")}</span>
                        </div>
                      }
                      completed={assignee.completed_issues}
                      total={assignee.total_issues}
                    />
                  );
              })
            ) : (
              <div className="flex items-center justify-center h-full w-full">
                <SimpleEmptyState
                  title={t("active_cycle.empty_state.assignee.title")}
                  assetPath={assigneesResolvedPath}
                />
              </div>
            )}
          </Tab.Panel>

          {/* Labels Panel */}
          <Tab.Panel
            as="div"
            className="flex h-52 w-full flex-col gap-1 overflow-y-auto text-secondary vertical-scrollbar scrollbar-sm"
          >
            {isPanelLoading ? (
              loaders
            ) : cycle?.distribution?.labels && cycle.distribution.labels.length > 0 ? (
              cycle.distribution.labels.map((label, index) => (
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
                  onClick={label.label_id && onLabelClick ? () => onLabelClick(label.label_id!) : undefined}
                />
              ))
            ) : (
              <div className="flex items-center justify-center h-full w-full">
                <SimpleEmptyState title={t("active_cycle.empty_state.label.title")} assetPath={labelsResolvedPath} />
              </div>
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
