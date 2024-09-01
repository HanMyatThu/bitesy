import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";

import { App } from "@/App";
import { HomePage } from "@/pages/home";
import { NotFoundPage } from "@/pages/notfound";
import { OrderPage } from "@/pages/orders";
import { IUser } from "@/interfaces/IUser";
import { SignIn } from "@/pages/auth/sign-in";
import { SignUp } from "@/pages/auth/sign-up";
import { VerifyUser } from "@/pages/verify";
import {
  productSearchSchema,
  verifyUserSchema,
} from "@/services/params-schema";
import { DashBoard } from "./pages/dashboard";

interface IRouterContext {
  user: IUser;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export const rootRoute = createRootRouteWithContext<IRouterContext>()({
  component: App,
});

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
  validateSearch: productSearchSchema,
  beforeLoad: ({ context }) => {
    if (context.isAdmin) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
});

export const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sign-in",
  beforeLoad: ({ context }) => {
    if (context.isAuthenticated) {
      throw redirect({
        to: "/",
        search: {
          pageNo: "1",
          category: "",
          limit: "8",
        },
      });
    }
  },
  component: SignIn,
});

export const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sign-up",
  beforeLoad: ({ context }) => {
    if (context.isAuthenticated) {
      throw redirect({
        to: "/",
        search: {
          pageNo: "1",
          category: "",
          limit: "8",
        },
      });
    }
  },
  component: SignUp,
});

export const orderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/orders",
  component: OrderPage,
});

export const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: NotFoundPage,
});

export const verifyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/verify-user",
  component: VerifyUser,
  validateSearch: verifyUserSchema,
});

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashBoard,
  beforeLoad: ({ context }) => {
    if (!context.isAuthenticated || !context.isAdmin) {
      throw redirect({
        to: "/",
        search: {
          pageNo: "1",
          category: "",
          limit: "8",
        },
      });
    }
  },
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  orderRoute,
  signInRoute,
  signUpRoute,
  verifyRoute,
  dashboardRoute,
]);

export const router = createRouter({
  routeTree,
  context: {
    user: {} as IUser,
    isAuthenticated: false,
    isAdmin: false,
  },
  defaultNotFoundComponent: NotFoundPage,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
