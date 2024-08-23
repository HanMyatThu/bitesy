import { Navbar } from "@/containers/navbar";
import { ThemeProvider } from "@/components/darktheme/theme-provider";

export const App = () => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
      </ThemeProvider>
    </>
  );
};