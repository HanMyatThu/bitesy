import { Outlet } from "@tanstack/react-router";

import { ThemeProvider } from "@/components/darktheme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/containers/footer";
import { Navbar } from "@/containers/navbar";

export const App = () => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <div className="flex h-full">
          <Outlet />
        </div>
        <Footer />
        <Toaster />
      </ThemeProvider>
    </>
  );
};
