import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { routeTree } from "app/routeTree.gen";
import {
  getContext,
  Provider
} from "integrations/tanstack-query/root-provider";

export const getRouter = () => {
  const rqContext = getContext();

  const router = createRouter({
    routeTree,
    context: { ...rqContext },
    defaultPreload: "intent",
    Wrap: (props: { children: React.ReactNode }) => {
      return <Provider {...rqContext}>{props.children}</Provider>;
    }
  });
  setupRouterSsrQueryIntegration({
    router,
    queryClient: rqContext.queryClient
  });

  return router;
};
