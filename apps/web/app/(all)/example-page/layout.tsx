import { Outlet } from "react-router";

export default function ExamplePageLayout() {
  return <Outlet />;
}

export const meta = () => [{ title: "Example Page" }];
