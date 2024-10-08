import { Outlet } from "@tanstack/react-router";
import { Toaster } from "sonner";

import { ThemeProvider } from "@/components/darktheme/theme-provider";
import { Footer } from "@/containers/footer";
import { Navbar } from "@/containers/navbar";
import { Cart } from "@/containers/cart";

export const App = () => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <Cart />
        <div className="flex h-full">
          <Outlet />
        </div>
        <Footer />
        <Toaster />
      </ThemeProvider>
    </>
  );
};
