import { observer } from "mobx-react";
import { useParams } from "next/navigation";
// plane imports
import { useTranslation } from "@plane/i18n";
import { cn } from "@plane/utils";
// hooks
import { useWorkspace } from "@/hooks/store/use-workspace";
import { useProject } from "@/hooks/store/use-project";
// icons
import { ChevronDown, Plus, MoreVertical } from "lucide-react";

export const DesktopWorkspaceMenu = observer(function DesktopWorkspaceMenu() {
  const { t } = useTranslation();
  const { workspaceSlug } = useParams();
  const { currentWorkspace, workspaces } = useWorkspace();
  const { favoriteProjects, projects } = useProject();

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-surface-1">
      {/* Workspace Section */}
      <div className="px-3 py-4 border-b border-subtle">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-8 h-8 rounded-full bg-primary-subtle flex items-center justify-center text-xs font-semibold text-primary flex-shrink-0">
              {currentWorkspace?.name?.charAt(0)?.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-13 font-semibold text-primary truncate">{currentWorkspace?.name}</p>
            </div>
          </div>
          <button className="p-1 hover:bg-surface-2 rounded transition-colors flex-shrink-0">
            <ChevronDown size={16} className="text-tertiary" />
          </button>
        </div>
      </div>

      {/* Projects Section */}
      <div className="flex-1 overflow-y-auto">
        {/* Favorites */}
        {favoriteProjects && favoriteProjects.length > 0 && (
          <div className="px-3 py-3">
            <div className="flex items-center justify-between gap-1 mb-2">
              <p className="text-xs font-semibold text-tertiary uppercase tracking-wider">{t("favorites")}</p>
            </div>
            <div className="space-y-1">
              {favoriteProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-surface-2 cursor-pointer transition-colors group"
                >
                  <div className="w-4 h-4 rounded flex items-center justify-center text-xs font-semibold text-white flex-shrink-0" style={{ backgroundColor: project.color || "#3b82f6" }}>
                    {project.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <span className="text-13 text-primary truncate flex-1">{project.name}</span>
                  <button className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-surface-3 rounded transition-all">
                    <MoreVertical size={14} className="text-tertiary" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Projects */}
        {projects && projects.length > 0 && (
          <div className="px-3 py-3">
            <div className="flex items-center justify-between gap-1 mb-2">
              <p className="text-xs font-semibold text-tertiary uppercase tracking-wider">{t("projects")}</p>
              <button className="p-0.5 hover:bg-surface-2 rounded transition-colors opacity-0 hover:opacity-100">
                <Plus size={14} className="text-tertiary" />
              </button>
            </div>
            <div className="space-y-1">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-surface-2 cursor-pointer transition-colors group"
                >
                  <div className="w-4 h-4 rounded flex items-center justify-center text-xs font-semibold text-white flex-shrink-0" style={{ backgroundColor: project.color || "#3b82f6" }}>
                    {project.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <span className="text-13 text-primary truncate flex-1">{project.name}</span>
                  <button className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-surface-3 rounded transition-all">
                    <MoreVertical size={14} className="text-tertiary" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="border-t border-subtle px-3 py-3">
        <button className="w-full flex items-center gap-2 px-2 py-2 rounded hover:bg-surface-2 transition-colors text-13 text-tertiary font-medium">
          <Plus size={16} />
          <span>{t("create_new_project")}</span>
        </button>
      </div>
    </div>
  );
});
