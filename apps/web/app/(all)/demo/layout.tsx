import { Outlet } from "react-router";
import type { Route } from "./+types/layout";

export default function DemoLayout() {
  return <Outlet />;
}

export const meta: Route.MetaFunction = () => [{ title: "Demo Page" }];
