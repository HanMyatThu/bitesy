import { Fragment, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";

import { UserProvider } from "@/contexts/user.tsx";
import { router } from "./routes.ts";

import "./index.css";
import "@/services/i18n.ts";
import { RouterProvider } from "@tanstack/react-router";

// eslint-disable-next-line react-refresh/only-export-components
const AppProvider = () => (
  <Suspense fallback={<Fragment />}>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </Suspense>
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider />
  </StrictMode>,
);
