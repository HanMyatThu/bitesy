import { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface IconButtonProps {
  icon: LucideIcon;
  label?: string;
  href: string;
}

export const IconButton = ({
  icon: Icon,
  label,
  href,
}: IconButtonProps) => {
  return (
    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary cursor-pointer">
      <a href={href} className="flex flex-col items-center justify-center">
        <Icon className="size-5" />
        {label && (
          <p className="text-xs text-muted-foreground font-light">
            {label}
          </p>
        )}
      </a>
    </Button>
  );
}