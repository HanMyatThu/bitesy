import { LogIn, NotepadText, ShoppingCart } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";

import { UserAvatar } from "./avatar";
import { ToggleTheme } from "@/components/darktheme/toggle-theme";
import { IconButton } from "@/components/common/icon-button";
import { ToolTipHint } from "@/components/common/tooltip-hint";
import { LanguagePicker } from "@/components/language/language-picker";
import { cn } from "@/lib/utils";
import { useUser } from "@/contexts/user";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Actions = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const { isAuthenticated } = useUser();

  console.log(isAuthenticated, "user");

  return (
    <div className="ml-4 flex items-center justify-end gap-x-2 lg:ml-0">
      <div
        className={cn(
          "flex items-center justify-center",
          isMobile ? "gap-x-2" : "gap-x-4",
        )}
      >
        <div className="hidden md:flex lg:flex xl:flex">
          <ToolTipHint label="Orders" side="bottom">
            <IconButton href="/orders" icon={NotepadText} />
          </ToolTipHint>
        </div>
        <IconButton href="/" icon={ShoppingCart} />
        <ToggleTheme />
        <LanguagePicker />
        <div className="hidden md:flex lg:flex xl:flex">
          {!isAuthenticated ? (
            <Link to="/sign-in" className="justify-center text-center">
              <Button variant="ghost">
                Sign In <LogIn className="ml-1 mt-1 size-4" />
              </Button>
            </Link>
          ) : (
            <UserAvatar imageUrl="/images/logo.png" isActive size="default" />
          )}
        </div>
      </div>
    </div>
  );
};
