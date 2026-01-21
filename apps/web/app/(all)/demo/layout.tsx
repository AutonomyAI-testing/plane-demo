import { Outlet } from "react-router";
import type { Route } from "./+types/layout";

export const meta: Route.MetaFunction = () => [
  { title: "Demo - Plane" },
  { name: "robots", content: "noindex, nofollow" },
];

export default function DemoLayout() {
  return <Outlet />;
}
