import { Actions } from "./actions"
import { Logo } from "./logo"

export const Navbar = () => {
  return (
    <nav className="hidden md:flex lg:flex xl:flex fixed top-0 w-full h-20 z-49 bg-background px-2 lg:px-4 justify-between items-center shadow-sm">
      <Logo />
      <Actions />
    </nav>
  )
}