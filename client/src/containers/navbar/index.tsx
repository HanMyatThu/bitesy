import { useUser } from "@/contexts/user";
import { Actions } from "./actions";
import { Logo } from "./logo";
import { SearchInput } from "./search-input";

export const Navbar = () => {
  const { isAdmin } = useUser();
  return (
    <nav className="fixed top-0 z-50 flex h-20 w-full items-center justify-between bg-background px-2 shadow-sm dark:bg-[#18191f] lg:px-4">
      <Logo />
      {!isAdmin && <SearchInput />}
      <Actions />
    </nav>
  );
};
