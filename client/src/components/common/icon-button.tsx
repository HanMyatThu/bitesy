import { LucideIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";

interface IconButtonProps {
  icon: LucideIcon;
  label?: string;
  href: string;
  onClick?: () => void;
  info?: number;
}

export const IconButton = ({
  icon: Icon,
  label,
  href,
  onClick,
  info,
}: IconButtonProps) => {
  const { t } = useTranslation();
  return (
    <Link
      to={href}
      className="relative flex flex-col items-center justify-center"
    >
      <Button
        onClick={onClick}
        variant="ghost"
        size="icon"
        className="relative flex cursor-pointer flex-col items-center justify-center text-muted-foreground hover:text-primary"
      >
        {info! > 0 && (
          <div className="absolute -right-1 -top-1 flex size-3 items-center justify-center rounded-full bg-red-700 text-white ring-1 ring-red-600">
            <p className="text-xs">{info}</p>
          </div>
        )}
        <Icon className="size-5" />
        {label && (
          <p className="text-xs font-light text-muted-foreground">{t(label)}</p>
        )}
      </Button>
    </Link>
  );
};
