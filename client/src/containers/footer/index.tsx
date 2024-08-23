import { IconButton } from "@/components/common/icon-button"
import { HomeIcon, LucideIcon, TextSearch, User, NotepadText } from "lucide-react"


interface FooterMenuProps {
  id: number,
  icon: LucideIcon,
  label: string,
  href: string,
}
const footerMenu: FooterMenuProps[] = [
  { 
    id: 1,
    icon: HomeIcon,
    label: "Home",
    href: "/"
  },
  { 
    id: 2,
    icon: TextSearch,
    label: "Browse",
    href: "/"
  },
  { 
    id: 3,
    icon: User,
    label: "Account",
    href: "/"
  },
  { 
    id: 4,
    icon: NotepadText,
    label: "Orders",
    href: "/"
  },
]

export const Footer = () => {
  return (
    <footer className="flex flex-row md:hidden fixed bottom-0 z-50 bg-background px-8 w-full h-16 justify-between items-center shadow-sm border-t">
      {footerMenu.map(menu => (
        <IconButton
          key={menu.id}
          icon={menu.icon}
          label={menu.label}
          href={menu.href}
        />
      ))}
    </footer>
  )
}