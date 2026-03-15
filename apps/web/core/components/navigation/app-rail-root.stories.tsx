import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { createContext, useContext } from "react";
import { SettingsIcon, FolderIcon } from "lucide-react";
import { cn } from "@plane/utils";

// ============================================================================
// MOCKED TYPES
// ============================================================================
interface IAppRailVisibilityContext {
  isEnabled: boolean;
  isCollapsed: boolean;
  shouldRenderAppRail: boolean;
  toggleAppRail: () => void;
}

interface TAppRailPreferences {
  displayMode: "icon_only" | "icon_with_label";
}

// ============================================================================
// MOCKED CONTEXTS
// ============================================================================
const AppRailVisibilityContext = createContext<IAppRailVisibilityContext>({
  isEnabled: true,
  isCollapsed: false,
  shouldRenderAppRail: true,
  toggleAppRail: () => {},
});

const AppRailPreferencesContext = createContext<{
  preferences: TAppRailPreferences;
  updateDisplayMode: (mode: "icon_only" | "icon_with_label") => void;
}>({
  preferences: { displayMode: "icon_only" },
  updateDisplayMode: () => {},
});

// ============================================================================
// MOCKED COMPONENTS
// ============================================================================
const WorkspaceLogo = ({ logo, name, classNames }: { logo?: string | null; name?: string; classNames?: string }) => (
  <div
    className={cn(
      `relative grid h-6 w-6 flex-shrink-0 place-items-center uppercase rounded-md bg-accent-primary text-on-color`,
      classNames
    )}
  >
    {name?.[0] ?? "W"}
  </div>
);

const MockContextMenuItem = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="flex items-center justify-between w-full gap-2 px-3 py-2 text-13 text-tertiary hover:bg-layer-1 hover:text-secondary transition-colors outline-none"
  >
    {children}
  </button>
);

const MockContextMenuSeparator = () => <div className="h-px bg-subtle my-1" />;

const ContextMenu = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);
  
  return (
    <div 
      className="h-full"
      onContextMenu={(e) => {
        e.preventDefault();
        setOpen(!open);
      }}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if ((child.type as any)?.displayName === "ContextMenuTrigger") {
            return child;
          }
          if ((child.type as any)?.displayName === "ContextMenuPortal" && open) {
            return (
              <div className="absolute left-12 top-1/2 z-30">
                {child}
              </div>
            );
          }
        }
        return null;
      })}
    </div>
  );
};

const ContextMenuTrigger = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={className}>{children}</div>
);
ContextMenuTrigger.displayName = "ContextMenuTrigger";

const ContextMenuPortal = ({ children }: { children: React.ReactNode }) => <>{children}</>;
ContextMenuPortal.displayName = "ContextMenuPortal";

const ContextMenuContent = ({ children, className }: { children: React.ReactNode; className?: string; positionerClassName?: string }) => (
  <div className={cn("w-max min-w-[180px] flex flex-col divide-y divide-subtle rounded-md border-[0.5px] border-strong bg-surface-1 shadow-raised-200 outline-none p-1", className)}>
    {children}
  </div>
);

ContextMenu.Trigger = ContextMenuTrigger;
ContextMenu.Portal = ContextMenuPortal;
ContextMenu.Content = ContextMenuContent;
ContextMenu.Item = MockContextMenuItem;
ContextMenu.Separator = MockContextMenuSeparator;

// Check icon
const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor">
    <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
  </svg>
);

// AppSidebarItem mock
const AppSidebarItem = ({
  item,
}: {
  item?: {
    href?: string;
    label?: string;
    icon?: React.ReactNode;
    isActive?: boolean;
    onClick?: () => void;
    disabled?: boolean;
    showLabel?: boolean;
  };
  variant?: "link" | "button";
}) => {
  if (!item) return null;
  const { icon, isActive, label, showLabel = true } = item;

  return (
    <a href={item.href} className="group flex flex-col gap-0.5 items-center justify-center text-tertiary">
      <div
        className={cn("flex items-center justify-center gap-2 size-8 rounded-md text-tertiary", {
          "bg-layer-transparent-selected text-secondary !text-icon-primary": isActive,
          "group-hover:text-icon-secondary group-hover:bg-layer-transparent-hover !text-icon-tertiary": !isActive,
        })}
      >
        {icon}
      </div>
      {showLabel && (
        <span
          className={cn("text-11 font-medium", {
            "text-secondary": isActive,
            "group-hover:text-secondary text-tertiary": !isActive,
          })}
        >
          {label}
        </span>
      )}
    </a>
  );
};

// PlaneNewIcon mock
const PlaneNewIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

// Avatar mock
const Avatar = ({ name, size = 24 }: { name?: string; src?: string; size?: number; shape?: string }) => (
  <div
    className="rounded-full bg-accent-primary text-on-color flex items-center justify-center text-xs font-medium uppercase"
    style={{ width: size, height: size }}
  >
    {name?.[0] ?? "U"}
  </div>
);

// Tooltip mock
const Tooltip = ({ children }: { children: React.ReactNode; tooltipContent?: string; tooltipHeading?: string; disabled?: boolean }) => (
  <>{children}</>
);

// ============================================================================
// MOCKED DESKTOP COMPONENTS
// ============================================================================
const DesktopSidebarWorkspaceMenu = () => {
  const { preferences } = useContext(AppRailPreferencesContext);
  const showLabel = preferences.displayMode === "icon_with_label";
  const [isOpen, setIsOpen] = React.useState(false);

  const workspaces = [
    { id: "1", name: "Acme Corp", logo_url: null },
    { id: "2", name: "Beta Inc", logo_url: null },
    { id: "3", name: "Gamma LLC", logo_url: null },
  ];

  return (
    <div className="relative">
      <Tooltip tooltipContent="Acme Corp" disabled={showLabel}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "group flex flex-col gap-0.5 items-center justify-center text-tertiary w-full",
            { "bg-layer-transparent-selected text-secondary": isOpen }
          )}
        >
          <div
            className={cn(
              "flex items-center justify-center gap-2 size-8 rounded-md text-tertiary transition-all",
              {
                "bg-layer-transparent-selected text-secondary !text-icon-primary": isOpen,
                "group-hover:text-icon-secondary group-hover:bg-layer-transparent-hover !text-icon-tertiary": !isOpen,
              }
            )}
          >
            <WorkspaceLogo name="Acme Corp" classNames="size-6 rounded-sm border border-subtle" />
          </div>
          {showLabel && (
            <span className={cn("text-11 font-medium truncate px-1 transition-all", {
              "text-secondary": isOpen,
              "text-tertiary group-hover:text-secondary": !isOpen,
            })}>
              ACM
            </span>
          )}
        </button>
      </Tooltip>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} aria-hidden="true" />
          <div className={cn(
            "absolute top-full left-0 z-20 mt-1 w-max min-w-[180px] max-w-[240px] flex flex-col divide-y divide-subtle rounded-md border-[0.5px] border-strong bg-surface-1 shadow-raised-200 outline-none",
            { "mt-2": showLabel }
          )}>
            <div className="overflow-y-auto vertical-scrollbar scrollbar-sm flex max-h-64 flex-col">
              <span className="sticky top-0 z-20 h-full w-full bg-surface-1 px-3 py-2 text-11 font-medium text-placeholder flex-shrink-0">
                Workspaces
              </span>
              <div className="flex flex-col">
                {workspaces.map((workspace) => (
                  <button
                    key={workspace.id}
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "group flex items-center gap-2 px-3 py-2 text-13 transition-colors outline-none",
                      {
                        "bg-layer-1 text-secondary": workspace.id === "1",
                        "text-tertiary hover:bg-layer-1 hover:text-secondary": workspace.id !== "1",
                      }
                    )}
                  >
                    <WorkspaceLogo name={workspace.name} classNames="size-5 rounded-sm border border-subtle flex-shrink-0" />
                    <span className="truncate text-left flex-1">{workspace.name}</span>
                    {workspace.id === "1" && <CheckIcon className="size-3.5 flex-shrink-0 rotate-[-90deg]" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const DesktopUserMenu = () => {
  const { preferences } = useContext(AppRailPreferencesContext);
  const showLabel = preferences.displayMode === "icon_with_label";
  const [isOpen, setIsOpen] = React.useState(false);

  const currentUser = {
    display_name: "John Doe",
    email: "john@example.com",
    avatar_url: null,
  };

  return (
    <div className="relative w-full">
      <Tooltip tooltipContent={currentUser.display_name} disabled={showLabel || isOpen}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "group flex flex-col gap-0.5 items-center justify-center text-tertiary w-full",
            { "bg-layer-transparent-selected text-secondary": isOpen }
          )}
        >
          <div
            className={cn(
              "flex items-center justify-center size-8 rounded-md text-tertiary transition-all",
              {
                "bg-layer-transparent-selected text-secondary !text-icon-primary": isOpen,
                "group-hover:text-icon-secondary group-hover:bg-layer-transparent-hover !text-icon-tertiary": !isOpen,
              }
            )}
          >
            <Avatar name={currentUser.display_name} size={24} />
          </div>
          {showLabel && (
            <span className={cn("text-11 font-medium truncate px-1 transition-all", {
              "text-secondary": isOpen,
              "text-tertiary group-hover:text-secondary": !isOpen,
            })}>
              JOH
            </span>
          )}
        </button>
      </Tooltip>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} aria-hidden="true" />
          <div className={cn(
            "absolute bottom-12 left-0 z-20 w-max min-w-[200px] max-w-[240px] flex flex-col divide-y divide-subtle rounded-md border-[0.5px] border-strong bg-surface-1 shadow-raised-200 outline-none",
            { "bottom-14": showLabel }
          )}>
            {/* User info section */}
            <div className="px-3 py-2.5 flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Avatar name={currentUser.display_name} size={28} />
                <div className="flex flex-col gap-0.5 min-w-0">
                  <p className="text-13 font-medium text-secondary truncate">{currentUser.display_name}</p>
                  <p className="text-11 text-tertiary truncate">{currentUser.email}</p>
                </div>
              </div>
            </div>

            {/* Menu items section */}
            <div className="flex flex-col py-1">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-13 text-tertiary hover:bg-layer-1 hover:text-secondary transition-colors outline-none"
              >
                <SettingsIcon className="size-4 stroke-[1.5] flex-shrink-0" />
                <span>Settings</span>
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-13 text-tertiary hover:bg-layer-1 hover:text-secondary transition-colors outline-none"
              >
                <SettingsIcon className="size-4 stroke-[1.5] flex-shrink-0" />
                <span>Preferences</span>
              </button>
            </div>

            {/* Sign out section */}
            <div className="py-1">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-13 text-tertiary hover:bg-layer-1 hover:text-secondary transition-colors outline-none w-full"
              >
                <svg className="size-4 stroke-[1.5] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// AppSidebarItemsRoot mock
const AppSidebarItemsRoot = ({ showLabel = true }: { showLabel?: boolean }) => {
  const dockItems = [
    {
      label: "Projects",
      icon: <PlaneNewIcon className="size-5" />,
      href: "/acme/",
      isActive: true,
      shouldRender: true,
    },
  ];

  return (
    <>
      {dockItems
        .filter((item) => item.shouldRender)
        .map((item) => (
          <AppSidebarItem key={item.label} item={{ ...item, showLabel }} variant="link" />
        ))}
    </>
  );
};

// ============================================================================
// MOCKED AppRailRoot COMPONENT
// ============================================================================
const AppRailRoot = () => {
  const { preferences, updateDisplayMode } = useContext(AppRailPreferencesContext);
  const { isCollapsed, toggleAppRail } = useContext(AppRailVisibilityContext);

  const isSettingsPath = false;
  const showLabel = preferences.displayMode === "icon_with_label";
  const railWidth = showLabel ? "3.75rem" : "3rem";

  return (
    <div
      className="h-full flex-shrink-0 bg-canvas transition-all ease-in-out duration-300 z-[26]"
      style={{
        width: railWidth,
        display: "block",
      }}
    >
      <ContextMenu>
        <ContextMenu.Trigger className="h-full">
          <div
            className={cn("flex flex-col justify-between gap-4 px-2 py-3 h-full", {
              "gap-4": showLabel,
              "gap-3": !showLabel,
            })}
          >
            <div
              className={cn("flex flex-col", {
                "gap-4": showLabel,
                "gap-3": !showLabel,
              })}
            >
              <DesktopSidebarWorkspaceMenu />
              <AppSidebarItemsRoot showLabel={showLabel} />
              <div className="border-t border-strong mx-2" />
              <AppSidebarItem
                item={{
                  label: "Settings",
                  icon: <SettingsIcon className="size-5" />,
                  href: "/acme/settings",
                  isActive: isSettingsPath,
                  showLabel,
                }}
              />
            </div>
            <div className="mt-auto pt-2">
              <DesktopUserMenu />
            </div>
          </div>
        </ContextMenu.Trigger>
        <ContextMenu.Portal>
          <ContextMenu.Content positionerClassName="z-30" className="outline-none">
            <ContextMenu.Item onClick={() => updateDisplayMode("icon_only")}>
              <div className="flex items-center justify-between w-full gap-2">
                <span className="text-11">Icon only</span>
                {preferences.displayMode === "icon_only" && <CheckIcon className="size-3.5" />}
              </div>
            </ContextMenu.Item>
            <ContextMenu.Item onClick={() => updateDisplayMode("icon_with_label")}>
              <div className="flex items-center justify-between w-full gap-2">
                <span className="text-11">Icon with name</span>
                {preferences.displayMode === "icon_with_label" && <CheckIcon className="size-3.5" />}
              </div>
            </ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Item onClick={toggleAppRail}>
              <span className="text-11">{isCollapsed ? "Dock App Rail" : "Undock App Rail"}</span>
            </ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Portal>
      </ContextMenu>
    </div>
  );
};

// ============================================================================
// STORY DECORATORS
// ============================================================================
const createDecorator = (displayMode: "icon_only" | "icon_with_label") => {
  return function Decorator(Story: React.ComponentType) {
    const [mode, setMode] = React.useState<"icon_only" | "icon_with_label">(displayMode);
    const [isCollapsed, setIsCollapsed] = React.useState(false);

    return (
      <AppRailPreferencesContext.Provider
        value={{
          preferences: { displayMode: mode },
          updateDisplayMode: setMode,
        }}
      >
        <AppRailVisibilityContext.Provider
          value={{
            isEnabled: true,
            isCollapsed,
            shouldRenderAppRail: !isCollapsed,
            toggleAppRail: () => setIsCollapsed(!isCollapsed),
          }}
        >
          <div className="flex h-screen bg-layer-1">
            <Story />
            <div className="flex-1 p-4">
              <p className="text-secondary">Main content area</p>
              <p className="text-tertiary text-sm mt-2">Right-click on the rail to see context menu options.</p>
              <p className="text-tertiary text-sm mt-1">Click the workspace logo or user avatar to see dropdown menus.</p>
            </div>
          </div>
        </AppRailVisibilityContext.Provider>
      </AppRailPreferencesContext.Provider>
    );
  };
};

// ============================================================================
// META
// ============================================================================
const meta = {
  title: "Navigation/AppRailRoot",
  component: AppRailRoot,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof AppRailRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// STORIES
// ============================================================================
export const IconOnly: Story = {
  decorators: [createDecorator("icon_only")],
};

export const IconWithLabel: Story = {
  decorators: [createDecorator("icon_with_label")],
};
