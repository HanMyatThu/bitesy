import {
  HomeIcon,
  LucideIcon,
  TextSearch,
  User,
  NotepadText,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import { IconButton } from "@/components/common/icon-button";
import { useUser } from "@/contexts/user";
import { ProfileDrawer } from "./components/profile-drawer";
import { Button } from "@/components/ui/button";

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
    label: "HOME",
    href: "/",
  },
  {
    id: 2,
    icon: TextSearch,
    label: "BROWSE",
    href: "/",
  },
  {
    id: 3,
    icon: NotepadText,
    label: "ORDERS",
    href: "/orders",
  },
  {
    id: 4,
    icon: User,
    label: "ACCOUNT",
    href: "/",
  },
];

export const Footer = () => {
  const { t } = useTranslation();
  const { isAdmin, user } = useUser();

  if (isAdmin) {
    return null;
  }

  const bonusPoint = user?.bonus_point?.bonus_point || 0;
  const tier = user?.tier?.type || "";
  const tierpoint = user?.tier?.point || 0;

  return (
    <footer className="fixed bottom-0 z-50 flex h-16 w-full flex-row items-center justify-between border-t bg-background px-8 shadow-sm md:hidden">
      {footerMenu.map((menu) => {
        if (menu.id === 4) {
          return (
            <ProfileDrawer
              key={menu.id}
              bonuspoint={bonusPoint}
              tier={tier}
              tierpoint={tierpoint}
            >
              <Button
                variant="ghost"
                size="icon"
                className="relative flex cursor-pointer flex-col items-center justify-center text-muted-foreground hover:text-primary"
              >
                <User className="size-5" />
                <p className="text-xs font-light text-muted-foreground">
                  {t("ACCOUNT")}
                </p>
              </Button>
            </ProfileDrawer>
          );
        } else {
          return (
            <IconButton
              key={menu.id}
              icon={menu.icon}
              label={menu.label}
              href={menu.href}
            />
          );
        }
      })}
    </footer>
  );
};
