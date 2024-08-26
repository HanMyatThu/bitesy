import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
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
  component: SignIn,
});

export const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sign-up",
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
  },
  defaultNotFoundComponent: NotFoundPage,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
