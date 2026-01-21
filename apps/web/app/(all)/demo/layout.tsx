import React from "react";

interface DemoLayoutProps {
  children: React.ReactNode;
}

function DemoLayout({ children }: DemoLayoutProps) {
  return <div className="h-full w-full">{children}</div>;
}

export default DemoLayout;
