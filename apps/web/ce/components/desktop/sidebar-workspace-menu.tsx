"use client";
import { useMemo, useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/navigation";
// plane imports
import { useTranslation } from "@plane/i18n";
import { ChevronDownIcon } from "@plane/propel/icons";
import type { IWorkspace } from "@plane/types";
import { Loader, Tooltip } from "@plane/ui";
import { orderWorkspacesList, cn } from "@plane/utils";
// components
import { AppSidebarItem } from "@/components/sidebar/sidebar-item";
// hooks
import { useAppRailPreferences } from "@/hooks/use-navigation-preferences";
import { useWorkspace } from "@/hooks/store/use-workspace";
import { useUserProfile } from "@/hooks/store/user";
// local imports
import { WorkspaceLogo } from "@/components/workspace/logo";

export const DesktopSidebarWorkspaceMenu = observer(function DesktopSidebarWorkspaceMenu() {
  // hooks
  const router = useRouter();
  const { t } = useTranslation();
  const { preferences } = useAppRailPreferences();
  const { currentWorkspace, workspaces } = useWorkspace();
  const { updateUserProfile } = useUserProfile();

  // local state
  const [isWorkspaceMenuOpen, setIsWorkspaceMenuOpen] = useState(false);
  const showLabel = preferences.displayMode === "icon_with_label";

  // derived values
  const workspacesList = useMemo(
    () => orderWorkspacesList(Object.values(workspaces ?? {})),
    [workspaces]
  );

  const handleWorkspaceNavigation = (workspace: IWorkspace) => {
    updateUserProfile({ last_workspace_id: workspace?.id });
    setIsWorkspaceMenuOpen(false);
  };

  if (!currentWorkspace) {
    return (
      <Tooltip tooltipContent={t("loading") || "Loading"} disabled={showLabel}>
        <div className="flex items-center justify-center size-8 rounded-md">
          <Loader className="size-5" />
        </div>
      </Tooltip>
    );
  }

  return (
    <div className="relative">
      <Tooltip
        tooltipContent={currentWorkspace?.name}
        disabled={showLabel || isWorkspaceMenuOpen}
        tooltipHeading={currentWorkspace?.name}
        tooltipContent={currentWorkspace?.name}
      >
        <button
          type="button"
          onClick={() => setIsWorkspaceMenuOpen(!isWorkspaceMenuOpen)}
          className={cn(
            "group flex flex-col gap-0.5 items-center justify-center text-tertiary w-full",
            {
              "bg-layer-transparent-selected text-secondary": isWorkspaceMenuOpen,
            }
          )}
        >
          <div
            className={cn(
              "flex items-center justify-center gap-2 size-8 rounded-md text-tertiary transition-all",
              {
                "bg-layer-transparent-selected text-secondary !text-icon-primary":
                  isWorkspaceMenuOpen,
                "group-hover:text-icon-secondary group-hover:bg-layer-transparent-hover !text-icon-tertiary":
                  !isWorkspaceMenuOpen,
              }
            )}
          >
            <WorkspaceLogo
              logo={currentWorkspace?.logo_url}
              name={currentWorkspace?.name}
              classNames="size-6 rounded-sm border border-subtle"
            />
          </div>
          {showLabel && (
            <span
              className={cn(
                "text-11 font-medium truncate px-1 transition-all",
                {
                  "text-secondary": isWorkspaceMenuOpen,
                  "text-tertiary group-hover:text-secondary": !isWorkspaceMenuOpen,
                }
              )}
            >
              {currentWorkspace?.name?.substring(0, 3)?.toUpperCase() || "WS"}
            </span>
          )}
        </button>
      </Tooltip>

      {/* Workspace dropdown menu */}
      {isWorkspaceMenuOpen && workspacesList && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsWorkspaceMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            className={cn(
              "absolute top-full left-0 z-20 mt-1 w-max min-w-[180px] max-w-[240px] flex flex-col divide-y divide-subtle rounded-md border-[0.5px] border-strong bg-surface-1 shadow-raised-200 outline-none",
              {
                "mt-2": showLabel,
              }
            )}
          >
            <div className="overflow-y-auto vertical-scrollbar scrollbar-sm flex max-h-64 flex-col">
              <span className="sticky top-0 z-20 h-full w-full bg-surface-1 px-3 py-2 text-11 font-medium text-placeholder flex-shrink-0">
                {t("workspaces")}
              </span>
              {workspacesList.length > 0 ? (
                <div className="flex flex-col">
                  {(currentWorkspace
                    ? [
                        currentWorkspace,
                        ...workspacesList.filter(
                          (workspace) => workspace.id !== currentWorkspace?.id
                        ),
                      ]
                    : workspacesList
                  ).map((workspace) => (
                    <button
                      key={workspace.id}
                      type="button"
                      onClick={() => handleWorkspaceNavigation(workspace)}
                      className={cn(
                        "group flex items-center gap-2 px-3 py-2 text-13 transition-colors outline-none",
                        {
                          "bg-layer-1 text-secondary": workspace.id === currentWorkspace?.id,
                          "text-tertiary hover:bg-layer-1 hover:text-secondary":
                            workspace.id !== currentWorkspace?.id,
                        }
                      )}
                    >
                      <WorkspaceLogo
                        logo={workspace?.logo_url}
                        name={workspace?.name}
                        classNames="size-5 rounded-sm border border-subtle flex-shrink-0"
                      />
                      <span className="truncate text-left flex-1">{workspace?.name}</span>
                      {workspace.id === currentWorkspace?.id && (
                        <ChevronDownIcon className="size-3.5 flex-shrink-0 rotate-[-90deg]" />
                      )}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </>
      )}
    </div>
  );
});
