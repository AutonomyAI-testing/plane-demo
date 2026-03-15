import { observer } from "mobx-react";
// plane imports
import { useTranslation } from "@plane/i18n";
// hooks
import { useWorkspace } from "@/hooks/store/use-workspace";
import { useUser } from "@/hooks/store/user";
// local components
import { UserGreetingsView } from "./user-greetings";
import { DashboardWidgets } from "./home-dashboard-widgets";

export const DesktopHomeView = observer(function DesktopHomeView() {
  const { t } = useTranslation();
  const { data: currentUser } = useUser();
  const { currentWorkspace } = useWorkspace();

  return (
    <div className="w-full h-full flex flex-col overflow-y-auto">
      {/* Header Section */}
      <div className="sticky top-0 z-10 border-b border-subtle bg-surface-1 px-6 py-4">
        <h1 className="text-h1-semibold text-primary">{currentWorkspace?.name}</h1>
        <p className="text-sm text-tertiary mt-1">{t("home.title")}</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-surface-1 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {currentUser && <UserGreetingsView user={currentUser} />}
          <div className="mt-8">
            <DashboardWidgets />
          </div>
        </div>
      </div>
    </div>
  );
});
