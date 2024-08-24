import { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CategoryIconProps {
  title: string;
  icon: LucideIcon;
  onClick: () => void;
  className?: string;
}

export const CategoryIcon = ({
  title,
  icon: Icon,
  onClick,
  className,
}: CategoryIconProps) => {
  return (
    <Button
      variant="ghost"
      className="flex h-full w-full flex-col gap-y-4"
      onClick={onClick}
    >
      <Icon stroke="orange" className={cn("h-10 w-10", className)} />
      <p className="text-xs font-semibold text-muted-foreground">{title}</p>
    </Button>
  );
};
