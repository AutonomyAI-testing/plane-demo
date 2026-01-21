import { Outlet } from "react-router";

export default function DemoPageLayout() {
  return <Outlet />;
}

export const meta = () => [{ title: "Demo Page" }];
