import { Fragment, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";

import { UserProvider } from "@/contexts/user.tsx";
import { queryClient } from "@/services/query-client.ts";
import { router } from "./routes.ts";

import "./index.css";
import "@/services/i18n.ts";

// eslint-disable-next-line react-refresh/only-export-components
const AppProvider = () => (
  <Suspense fallback={<Fragment />}>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </QueryClientProvider>
  </Suspense>
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider />
  </StrictMode>,
);
