import { IconButton } from "@/components/common/icon-button";
import {
  HomeIcon,
  LucideIcon,
  TextSearch,
  User,
  NotepadText,
} from "lucide-react";

interface FooterMenuProps {
  id: number;
  icon: LucideIcon;
  label: string;
  href: string;
}
const footerMenu: FooterMenuProps[] = [
  {
    id: 1,
    icon: HomeIcon,
    label: "Home",
    href: "/",
  },
  {
    id: 2,
    icon: TextSearch,
    label: "Browse",
    href: "/",
  },
  {
    id: 3,
    icon: NotepadText,
    label: "Orders",
    href: "/",
  },
  {
    id: 4,
    icon: User,
    label: "Account",
    href: "/",
  },
];

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 z-50 flex h-16 w-full flex-row items-center justify-between border-t bg-background px-8 shadow-sm md:hidden">
      {footerMenu.map((menu) => (
        <IconButton
          key={menu.id}
          icon={menu.icon}
          label={menu.label}
          href={menu.href}
        />
      ))}
    </footer>
  );
};
