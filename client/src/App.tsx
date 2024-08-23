import { Navbar } from "@/containers/navbar";
import { ThemeProvider } from "@/components/darktheme/theme-provider";
import { Footer } from "@/containers/footer";

export const App = () => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <Footer />
      </ThemeProvider>
    </>
  );
};