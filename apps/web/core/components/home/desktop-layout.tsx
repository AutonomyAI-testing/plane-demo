import { ReactNode } from "react";
import { observer } from "mobx-react";
// plane imports
import { cn } from "@plane/utils";
// local components
import { DesktopWorkspaceMenu } from "@/plane-web/components/desktop";

interface DesktopLayoutProps {
  header: ReactNode;
  children: ReactNode;
  sidebarOpen?: boolean;
  sidebarWidth?: number;
}

export const DesktopLayout = observer(function DesktopLayout({
  header,
  children,
  sidebarOpen = true,
  sidebarWidth = 280,
}: DesktopLayoutProps) {
  return (
    <div className="h-screen w-full flex flex-col bg-canvas">
      {/* Top Header */}
      <div className="flex-shrink-0 border-b border-subtle bg-surface-1 z-20">
        {header}
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        {sidebarOpen && (
          <div
            className="flex-shrink-0 border-r border-subtle bg-surface-1 overflow-hidden transition-all duration-300"
            style={{ width: `${sidebarWidth}px` }}
          >
            <DesktopWorkspaceMenu />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
});
