import { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface CategoryIconProps {
  title: string;
  icon: LucideIcon;
  onClick: (category: string) => void;
  className?: string;
  value: string;
}

export const CategoryIcon = ({
  title,
  icon: Icon,
  onClick,
  className,
  value,
}: CategoryIconProps) => {
  return (
    <Button
      variant="ghost"
      className="flex h-full w-full flex-col gap-y-4"
      onClick={() => onClick(value)}
    >
      <Icon stroke="orange" className={cn("h-10 w-10", className)} />
      <p className="text-xs font-semibold text-muted-foreground">{title}</p>
    </Button>
  );
};

export const CategoryIconSeketon = () => {
  return (
    <div className="flex h-32 w-40 flex-col gap-y-4">
      <Skeleton className="full h-full" />
      <Skeleton className="h-4 w-full" />
    </div>
  );
};
