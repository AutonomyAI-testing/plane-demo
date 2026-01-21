import { Outlet } from "react-router";

export default function DemoNewLayout() {
  return <Outlet />;
}

export const meta = () => [{ title: "New Demo Page - Plane" }];
