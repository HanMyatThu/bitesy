import { Actions } from "./actions"
import { Logo } from "./logo"
import { SearchInput } from "./search-input"

export const Navbar = () => {
  return (
    <nav className="flex fixed top-0 w-full h-20 z-50 bg-background px-2 lg:px-4 justify-between items-center shadow-sm">
      <Logo />
      <SearchInput />
      <Actions />
    </nav>
  )
}