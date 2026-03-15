import { observer } from "mobx-react";
// components
import { useTranslation } from "@plane/i18n";
import { AppHeader } from "@/components/core/app-header";
import { PageHead } from "@/components/core/page-title";
import { DesktopHomeView, DesktopLayout } from "@/components/home";
// hooks
import { useWorkspace } from "@/hooks/store/use-workspace";
// local components
import { WorkspaceDashboardHeader } from "../header";

function DesktopHomePage() {
  const { currentWorkspace } = useWorkspace();
  const { t } = useTranslation();
  // derived values
  const pageTitle = currentWorkspace?.name ? `${currentWorkspace?.name} - ${t("home.title")}` : undefined;

  return (
    <>
      <PageHead title={pageTitle} />
      <DesktopLayout header={<WorkspaceDashboardHeader />}>
        <DesktopHomeView />
      </DesktopLayout>
    </>
  );
}

export default observer(DesktopHomePage);
