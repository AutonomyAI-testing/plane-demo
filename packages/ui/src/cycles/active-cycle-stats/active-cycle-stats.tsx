import React, { Fragment, useState } from "react";
import { Tab } from "@headlessui/react";
import { CalendarCheck } from "lucide-react";
// ui
import { Avatar } from "../../avatar";
import { Loader } from "../../loader";
// utils
import { cn } from "../../utils";

type AssigneeData = {
  assignee_id: string;
  display_name: string;
  avatar_url: string | null;
  completed_issues: number;
  total_issues: number;
};

type LabelData = {
  label_id: string;
  label_name: string;
  color: string;
  completed_issues: number;
  total_issues: number;
};

type PriorityIssueData = {
  id: string;
  identifier: string;
  name: string;
  priority: "urgent" | "high" | "medium" | "low" | "none";
  state: string;
  target_date: string | null;
};

type ActiveCycleStatsProps = {
  /**
   * Tab to display by default (0 = Priority Issues, 1 = Assignees, 2 = Labels)
   * @default 1
   */
  defaultTab?: number;
  /**
   * Assignee distribution data
   */
  assignees?: AssigneeData[];
  /**
   * Label distribution data
   */
  labels?: LabelData[];
  /**
   * Priority issues data
   */
  priorityIssues?: PriorityIssueData[];
  /**
   * Loading state
   * @default false
   */
  loading?: boolean;
};

/**
 * Calculate completion percentage, returning 0 for invalid divisions
 */
const calculatePercentage = (completed: number, total: number): number => {
  if (total === 0 || isNaN(completed) || isNaN(total)) return 0;
  return Math.round((completed / total) * 100);
};

const PriorityIcon = ({ priority }: { priority: string }) => {
  const priorityConfig = {
    urgent: { color: "#EF4444", label: "Urgent" },
    high: { color: "#F59E0B", label: "High" },
    medium: { color: "#3B82F6", label: "Medium" },
    low: { color: "#10B981", label: "Low" },
    none: { color: "#9CA3AF", label: "None" },
  };

  // Fallback to 'none' for unrecognized priority values
  const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.none;

  return (
    <div
      className="flex items-center justify-center rounded-sm border border-subtle h-5 w-5 flex-shrink-0"
      // Using inline styles for dynamic priority colors with 20% opacity background
      style={{ backgroundColor: `${config.color}20` }}
    >
      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: config.color }} />
    </div>
  );
};

const SingleProgressStats = ({
  title,
  completed,
  total,
  onClick,
}: {
  title: React.ReactNode;
  completed: number;
  total: number;
  onClick?: () => void;
}) => {
  const percentage = calculatePercentage(completed, total);

  return (
    <div
      className={`flex w-full items-center justify-between gap-4 rounded-xs p-1 text-11 ${
        onClick ? "cursor-pointer hover:bg-surface-2" : ""
      }`}
      onClick={onClick}
    >
      <div className="w-2/6">{title}</div>
      <div className="flex w-4/6 items-center justify-end gap-2 px-2">
        <div className="h-1.5 flex-grow overflow-hidden rounded-full bg-layer-1">
          <div
            className="h-full rounded-full bg-accent-primary"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>
        <div className="flex h-5 flex-shrink-0 items-center justify-center gap-1">
          <span className="w-8 text-right">{percentage}%</span>
        </div>
        <span className="flex-shrink-0">of {total}</span>
      </div>
    </div>
  );
};

export function ActiveCycleStats({
  defaultTab = 1,
  assignees = [],
  labels = [],
  priorityIssues = [],
  loading = false,
}: ActiveCycleStatsProps) {
  const [selectedTab, setSelectedTab] = useState(defaultTab);

  const loaders = (
    <Loader className="space-y-3">
      <Loader.Item height="30px" />
      <Loader.Item height="30px" />
      <Loader.Item height="30px" />
    </Loader>
  );

  if (loading) {
    return (
      <div className="flex flex-col gap-4 p-4 min-h-[17rem] overflow-hidden bg-surface-1 border border-subtle rounded-lg">
        {loaders}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4 min-h-[17rem] overflow-hidden bg-surface-1 border border-subtle rounded-lg">
      {/* Tab structure: Priority Issues (0), Assignees (1), Labels (2) */}
      <Tab.Group as={Fragment} defaultIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List
          as="div"
          className="relative border-[0.5px] border-subtle rounded-sm bg-layer-1 p-[1px] grid"
          style={{
            gridTemplateColumns: `repeat(3, 1fr)`,
          }}
        >
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
          {/* Priority Issues Tab */}
          <Tab.Panel
            as="div"
            className="flex h-52 w-full flex-col gap-1 overflow-y-auto text-secondary vertical-scrollbar scrollbar-sm"
          >
            {priorityIssues.length > 0 ? (
              priorityIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="group flex cursor-pointer items-center justify-between gap-2 rounded-md hover:bg-surface-2 p-1"
                >
                  <div className="flex items-center gap-1.5 flex-grow w-full min-w-24 truncate">
                    <span className="text-11 text-secondary font-medium flex-shrink-0">{issue.identifier}</span>
                    <span className="text-13 text-primary truncate">{issue.name}</span>
                  </div>
                  <PriorityIcon priority={issue.priority} />
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <div className="rounded-sm px-2 py-0.5 text-11 bg-layer-1 border border-subtle text-secondary">
                      {issue.state}
                    </div>
                    {issue.target_date && (
                      <div className="h-full flex truncate items-center gap-1.5 rounded-sm text-11 px-2 py-0.5 bg-layer-1 group-hover:bg-surface-1 cursor-pointer">
                        <CalendarCheck className="h-3 w-3 flex-shrink-0" />
                        <span className="text-11 truncate">
                          {new Date(issue.target_date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full w-full">
                <div className="text-center">
                  <p className="text-13 text-secondary">No priority issues</p>
                </div>
              </div>
            )}
          </Tab.Panel>

          {/* Assignees Tab */}
          <Tab.Panel
            as="div"
            className="flex h-52 w-full flex-col gap-1 overflow-y-auto text-secondary vertical-scrollbar scrollbar-sm"
          >
            {assignees.length > 0 ? (
              assignees.map((assignee) => (
                <SingleProgressStats
                  key={assignee.assignee_id}
                  title={
                    <div className="flex items-center gap-2">
                      <Avatar name={assignee.display_name} src={assignee.avatar_url ?? undefined} />
                      <span>{assignee.display_name}</span>
                    </div>
                  }
                  completed={assignee.completed_issues}
                  total={assignee.total_issues}
                  // Empty handler - parent component should wire up click behavior
                  onClick={() => {}}
                />
              ))
            ) : (
              <div className="flex items-center justify-center h-full w-full">
                <div className="text-center">
                  <p className="text-13 text-secondary">No assignees</p>
                </div>
              </div>
            )}
          </Tab.Panel>

          {/* Labels Tab */}
          <Tab.Panel
            as="div"
            className="flex h-52 w-full flex-col gap-1 overflow-y-auto text-secondary vertical-scrollbar scrollbar-sm"
          >
            {labels.length > 0 ? (
              labels.map((label) => (
                <SingleProgressStats
                  key={label.label_id}
                  title={
                    <div className="flex items-center gap-2 truncate">
                      <span
                        className="block h-3 w-3 rounded-full flex-shrink-0"
                        // Using inline style for dynamic label color from data
                        style={{
                          backgroundColor: label.color,
                        }}
                      />
                      <span className="text-11 text-ellipsis truncate">{label.label_name}</span>
                    </div>
                  }
                  completed={label.completed_issues}
                  total={label.total_issues}
                  // Empty handler - parent component should wire up click behavior
                  onClick={() => {}}
                />
              ))
            ) : (
              <div className="flex items-center justify-center h-full w-full">
                <div className="text-center">
                  <p className="text-13 text-secondary">No labels</p>
                </div>
              </div>
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
