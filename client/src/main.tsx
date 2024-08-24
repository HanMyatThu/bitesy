import { Fragment, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App.tsx";

import "./index.css";
import "@/services/i18n.ts";

// eslint-disable-next-line react-refresh/only-export-components
const AppProvider = () => (
  <Suspense fallback={<Fragment />}>
    <App />
  </Suspense>
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider />
  </StrictMode>,
);
