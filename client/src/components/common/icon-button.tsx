import { LucideIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

interface IconButtonProps {
  icon: LucideIcon;
  label?: string;
  href: string;
}

export const IconButton = ({ icon: Icon, label, href }: IconButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="cursor-pointer text-muted-foreground hover:text-primary"
    >
      <Link to={href} className="flex flex-col items-center justify-center">
        <Icon className="size-5" />
        {label && (
          <p className="text-xs font-light text-muted-foreground">{label}</p>
        )}
      </Link>
    </Button>
  );
};
