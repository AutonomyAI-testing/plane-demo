import { route, layout } from "@react-router/dev/routes";
import type { RouteConfigEntry } from "@react-router/dev/routes";

export const extendedRoutes: RouteConfigEntry[] = [
  // Desktop Home
  layout("./(all)/[workspaceSlug]/(projects)/desktop/layout.tsx", [
    route(":workspaceSlug/desktop", "./(all)/[workspaceSlug]/(projects)/desktop/page.tsx"),
  ]),
];
