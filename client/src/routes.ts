import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { App } from "./App";

import { HomePage } from "@/pages/home";
import { NotFoundPage } from "@/pages/notfound";
import { OrderPage } from "@/pages/orders";
import { IUser } from "@/interfaces/IUser";
import { SignIn } from "@/pages/auth/sign-in";
import { SignUp } from "./pages/auth/sign-up";

interface IRouterContext {
  user: IUser;
  isAuthenticated: boolean;
}

export const rootRoute = createRootRouteWithContext<IRouterContext>()({
  component: App,
});

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

export const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sign-in",
  beforeLoad: ({ context, location }) => {
    if (context.isAuthenticated) {
      throw redirect({
        to: "/",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: SignIn,
});

export const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sign-up",
  beforeLoad: ({ context, location }) => {
    if (context.isAuthenticated) {
      throw redirect({
        to: "/",
        search: {
          redirect: location.href,
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

const routeTree = rootRoute.addChildren([
  homeRoute,
  orderRoute,
  signInRoute,
  signUpRoute,
]);

export const router = createRouter({
  routeTree,
  context: {
    user: {} as IUser,
    isAuthenticated: false,
  },
  defaultNotFoundComponent: NotFoundPage,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
