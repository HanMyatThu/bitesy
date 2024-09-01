import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface MenuItemProps {
  label: string;
  icon: LucideIcon;
  collapsed: boolean;
}

export const MenuItem = ({ label, icon: Icon, collapsed }: MenuItemProps) => {
  return (
    <Button
      variant="ghost"
      className="flex w-full flex-row justify-start gap-x-4"
    >
      <Icon />
      {!collapsed && <p>{label}</p>}
    </Button>
  );
};
