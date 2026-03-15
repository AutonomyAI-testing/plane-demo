import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeProvider } from "next-themes";
import React from "react";

// Since the actual DesktopHomeView uses MobX stores (useWorkspace, useUser) and i18n,
// we create a mock version that demonstrates the same visual structure and styling

// Mock User type
interface MockUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  user_timezone: string;
  avatar?: string;
}

// Mock Workspace type
interface MockWorkspace {
  id: string;
  name: string;
  slug: string;
  logo?: string;
}

// Mock UserGreetingsView that matches the actual component's visual output
const MockUserGreetingsView = ({ user }: { user: MockUser }) => {
  const currentTime = new Date();
  
  const hour = new Intl.DateTimeFormat("en-US", {
    hour12: false,
    hour: "numeric",
  }).format(currentTime);

  const date = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(currentTime);

  const weekDay = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(currentTime);

  const timeString = new Intl.DateTimeFormat("en-US", {
    timeZone: user.user_timezone || "UTC",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  }).format(currentTime);

  const hourNum = parseInt(hour, 10);
  const greeting = hourNum < 12 ? "morning" : hourNum < 18 ? "afternoon" : "evening";
  const greetingEmoji = greeting === "morning" ? "🌤️" : greeting === "afternoon" ? "🌥️" : "🌙";

  return (
    <div className="flex flex-col items-center my-6">
      <h2 className="text-20 font-semibold text-center">
        Good {greeting}, {user.first_name} {user.last_name}
      </h2>
      <h5 className="flex items-center gap-2 font-medium text-placeholder">
        <div>{greetingEmoji}</div>
        <div>
          {weekDay}, {date} {timeString}
        </div>
      </h5>
    </div>
  );
};

// Mock widget components
const MockQuickLinksWidget = () => (
  <div className="bg-surface-1 border border-subtle rounded-lg p-4">
    <h3 className="text-sm font-medium text-secondary mb-3">Quick Links</h3>
    <div className="grid grid-cols-2 gap-3">
      {[
        { name: "My Issues", icon: "📋" },
        { name: "Active Sprint", icon: "🏃" },
        { name: "Documentation", icon: "📖" },
        { name: "Team Chat", icon: "💬" },
      ].map((link) => (
        <button
          key={link.name}
          className="flex items-center gap-2 px-3 py-2 bg-surface-2 hover:bg-surface-3 rounded-md transition-colors text-sm text-primary"
        >
          <span>{link.icon}</span>
          <span>{link.name}</span>
        </button>
      ))}
    </div>
  </div>
);

const MockRecentActivityWidget = () => (
  <div className="bg-surface-1 border border-subtle rounded-lg p-4">
    <h3 className="text-sm font-medium text-secondary mb-3">Recent Activity</h3>
    <div className="space-y-3">
      {[
        { action: "Updated issue", item: "PROJ-123: Fix login bug", time: "2 hours ago" },
        { action: "Created comment on", item: "PROJ-456: Add dark mode", time: "4 hours ago" },
        { action: "Completed", item: "PROJ-789: Update documentation", time: "Yesterday" },
        { action: "Assigned to you", item: "PROJ-101: API integration", time: "2 days ago" },
      ].map((activity, idx) => (
        <div key={idx} className="flex flex-col gap-1 pb-3 border-b border-subtle last:border-0 last:pb-0">
          <p className="text-sm text-primary">
            <span className="text-tertiary">{activity.action}</span> {activity.item}
          </p>
          <span className="text-xs text-tertiary">{activity.time}</span>
        </div>
      ))}
    </div>
  </div>
);

const MockStickiesWidget = () => (
  <div className="bg-surface-1 border border-subtle rounded-lg p-4">
    <h3 className="text-sm font-medium text-secondary mb-3">My Stickies</h3>
    <div className="grid grid-cols-2 gap-3">
      {[
        { content: "Review PR #234 before EOD", color: "bg-yellow-100 dark:bg-yellow-900/30" },
        { content: "Schedule meeting with design team", color: "bg-blue-100 dark:bg-blue-900/30" },
        { content: "Update project timeline", color: "bg-green-100 dark:bg-green-900/30" },
        { content: "Prepare demo for stakeholders", color: "bg-pink-100 dark:bg-pink-900/30" },
      ].map((sticky, idx) => (
        <div key={idx} className={`${sticky.color} rounded-md p-3 text-sm text-primary`}>
          {sticky.content}
        </div>
      ))}
    </div>
  </div>
);

// Mock DashboardWidgets component
const MockDashboardWidgets = () => (
  <div className="h-full w-full relative flex flex-col gap-7">
    {/* Header with settings */}
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold text-primary">Dashboard</h2>
      <button className="text-sm text-tertiary hover:text-secondary transition-colors flex items-center gap-1">
        <span>⚙️</span>
        <span>Customize</span>
      </button>
    </div>
    
    {/* Widgets grid */}
    <div className="flex flex-col gap-6">
      <MockQuickLinksWidget />
      <MockRecentActivityWidget />
      <MockStickiesWidget />
    </div>
  </div>
);

// Mock DesktopHomeView props
interface MockDesktopHomeViewProps {
  workspace: MockWorkspace;
  user: MockUser;
}

// Mock DesktopHomeView that matches the actual component structure
const MockDesktopHomeView = ({ workspace, user }: MockDesktopHomeViewProps) => {
  return (
    <div className="w-full h-full flex flex-col overflow-y-auto">
      {/* Header Section */}
      <div className="sticky top-0 z-10 border-b border-subtle bg-surface-1 px-6 py-4">
        <h1 className="text-h1-semibold text-primary">{workspace.name}</h1>
        <p className="text-sm text-tertiary mt-1">Home</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-surface-1 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <MockUserGreetingsView user={user} />
          <div className="mt-8">
            <MockDashboardWidgets />
          </div>
        </div>
      </div>
    </div>
  );
};

// Create wrapper with theme provider
const StoryWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" themes={["light", "dark"]}>
      <div className="bg-canvas min-h-screen">{children}</div>
    </ThemeProvider>
  );
};

// Mock data
const mockUser: MockUser = {
  id: "user-123",
  first_name: "Alex",
  last_name: "Johnson",
  email: "alex.johnson@example.com",
  user_timezone: "America/New_York",
};

const mockWorkspace: MockWorkspace = {
  id: "workspace-456",
  name: "Acme Corporation",
  slug: "acme-corp",
};

const meta = {
  title: "Web/Home/DesktopHomeView",
  component: MockDesktopHomeView,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <StoryWrapper>
        <div className="h-screen">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof MockDesktopHomeView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    workspace: mockWorkspace,
    user: mockUser,
  },
};

export const MorningGreeting: Story = {
  args: {
    workspace: mockWorkspace,
    user: mockUser,
  },
  name: "Morning Greeting",
};

export const DifferentWorkspace: Story = {
  args: {
    workspace: {
      id: "workspace-789",
      name: "Startup Inc",
      slug: "startup-inc",
    },
    user: {
      ...mockUser,
      first_name: "Sarah",
      last_name: "Chen",
    },
  },
  name: "Different Workspace",
};
