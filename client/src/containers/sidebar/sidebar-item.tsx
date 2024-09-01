import { NotepadText, User } from "lucide-react";

import { useSidebar } from "@/store/use-sidebar";
import { MenuItem } from "./menu-item";

const MenuItems = [
  {
    id: 1,
    label: "User Settings",
    icon: User,
  },
  {
    id: 2,
    label: "Order Settings",
    icon: NotepadText,
  },
];

export const SidebarItem = () => {
  const { collapsed } = useSidebar();

  return (
    <div>
      <ul className="space-y-2 px-2">
        {MenuItems.map((menu) => (
          <MenuItem
            key={menu.id}
            label={menu.label}
            icon={menu.icon}
            collapsed={collapsed}
          />
        ))}
      </ul>
    </div>
  );
};

export const RecommendedSkeleton = () => {
  return <ul className="px-2"></ul>;
};
