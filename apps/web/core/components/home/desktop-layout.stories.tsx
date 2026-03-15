import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeProvider } from "next-themes";
import React, { ReactNode } from "react";

// Since the actual DesktopLayout imports from @/plane-web which uses path aliases
// that Storybook can't resolve, we create a mock version of the layout
// that demonstrates the same structure and styling

interface DesktopLayoutProps {
  header: ReactNode;
  children: ReactNode;
  sidebarOpen?: boolean;
  sidebarWidth?: number;
}

// Mock DesktopWorkspaceMenu component
const MockDesktopWorkspaceMenu = () => (
  <div className="flex flex-col h-full w-full overflow-hidden bg-surface-1">
    {/* Workspace Section */}
    <div className="px-3 py-4 border-b border-subtle">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-semibold text-white flex-shrink-0">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate">Acme Corp</p>
          </div>
        </div>
        <button className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-500">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </button>
      </div>
    </div>

    {/* Favorites Section */}
    <div className="flex-1 overflow-y-auto">
      <div className="px-3 py-3">
        <div className="flex items-center justify-between gap-1 mb-2">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Favorites</p>
        </div>
        <div className="space-y-1">
          {[
            { name: "Website Redesign", color: "#3b82f6" },
            { name: "Mobile App", color: "#10b981" },
          ].map((project) => (
            <div
              key={project.name}
              className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer transition-colors group"
            >
              <div 
                className="w-4 h-4 rounded flex items-center justify-center text-xs font-semibold text-white flex-shrink-0" 
                style={{ backgroundColor: project.color }}
              >
                {project.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm text-neutral-900 dark:text-neutral-100 truncate flex-1">{project.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* All Projects */}
      <div className="px-3 py-3">
        <div className="flex items-center justify-between gap-1 mb-2">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Projects</p>
          <button className="p-0.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-500">
              <path d="M5 12h14"/>
              <path d="M12 5v14"/>
            </svg>
          </button>
        </div>
        <div className="space-y-1">
          {[
            { name: "API Development", color: "#f59e0b" },
            { name: "Documentation", color: "#8b5cf6" },
            { name: "Infrastructure", color: "#ef4444" },
          ].map((project) => (
            <div
              key={project.name}
              className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer transition-colors group"
            >
              <div 
                className="w-4 h-4 rounded flex items-center justify-center text-xs font-semibold text-white flex-shrink-0" 
                style={{ backgroundColor: project.color }}
              >
                {project.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm text-neutral-900 dark:text-neutral-100 truncate flex-1">{project.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Footer Actions */}
    <div className="border-t border-neutral-200 dark:border-neutral-700 px-3 py-3">
      <button className="w-full flex items-center gap-2 px-2 py-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-sm text-neutral-500 font-medium">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14"/>
          <path d="M12 5v14"/>
        </svg>
        <span>Create new project</span>
      </button>
    </div>
  </div>
);

// Mock DesktopLayout that matches the actual component structure
const MockDesktopLayout = ({
  header,
  children,
  sidebarOpen = true,
  sidebarWidth = 280,
}: DesktopLayoutProps) => {
  return (
    <div className="h-screen w-full flex flex-col bg-neutral-50 dark:bg-neutral-900">
      {/* Top Header */}
      <div className="flex-shrink-0 border-b border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 z-20">
        {header}
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        {sidebarOpen && (
          <div
            className="flex-shrink-0 border-r border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 overflow-hidden transition-all duration-300"
            style={{ width: `${sidebarWidth}px` }}
          >
            <MockDesktopWorkspaceMenu />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
};

// Mock header component for the story
const MockHeader = () => (
  <div className="flex items-center justify-between h-14 px-4">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
        <span className="text-white font-semibold text-sm">P</span>
      </div>
      <span className="font-semibold text-neutral-900 dark:text-neutral-100">Plane</span>
    </div>
    <div className="flex items-center gap-2">
      <button className="px-3 py-1.5 text-sm text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded transition-colors">
        Search
      </button>
      <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-700" />
    </div>
  </div>
);

// Mock children content
const MockContent = () => (
  <div className="flex-1 p-6 overflow-auto bg-neutral-50 dark:bg-neutral-900">
    <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Welcome to Plane</h1>
    <p className="text-neutral-600 dark:text-neutral-400 mb-6">
      Manage your projects and tasks efficiently with Plane's powerful features.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="h-4 w-3/4 bg-neutral-200 dark:bg-neutral-700 rounded mb-2" />
          <div className="h-3 w-1/2 bg-neutral-100 dark:bg-neutral-600 rounded" />
        </div>
      ))}
    </div>
  </div>
);

// Create wrapper with theme provider
const StoryWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" themes={["light", "dark"]}>
      {children}
    </ThemeProvider>
  );
};

const meta = {
  title: "Web/Layout/DesktopLayout",
  component: MockDesktopLayout,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <StoryWrapper>
        <Story />
      </StoryWrapper>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof MockDesktopLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    header: <MockHeader />,
    children: <MockContent />,
    sidebarOpen: true,
    sidebarWidth: 280,
  },
};

export const SidebarClosed: Story = {
  args: {
    header: <MockHeader />,
    children: <MockContent />,
    sidebarOpen: false,
  },
};

export const NarrowSidebar: Story = {
  args: {
    header: <MockHeader />,
    children: <MockContent />,
    sidebarOpen: true,
    sidebarWidth: 200,
  },
};

export const WideSidebar: Story = {
  args: {
    header: <MockHeader />,
    children: <MockContent />,
    sidebarOpen: true,
    sidebarWidth: 350,
  },
};
