import { useEffect } from "react";
import {
  ExternalLinkIcon,
  LogIn,
  NotepadText,
  ShoppingCart,
} from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@tanstack/react-router";

import { ToggleTheme } from "@/components/darktheme/toggle-theme";
import { IconButton } from "@/components/common/icon-button";
import { ToolTipHint } from "@/components/common/tooltip-hint";
import { LanguagePicker } from "@/components/language/language-picker";
import { cn } from "@/lib/utils";
import { useUser } from "@/contexts/user";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/use-cart";
import { useUserLogout } from "@/hooks/user";
import { IUser } from "@/interfaces/IUser";

export const Actions = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { isAuthenticated, setUser, isAdmin } = useUser();
  const { mutateAsync, reset, data, isSuccess, isPending } = useUserLogout();
  const { onExpend, items } = useCartStore((state) => state);

  useEffect(() => {
    if (data && isSuccess) {
      toast.success(data.message);
      reset();
      setUser({} as IUser);
      setTimeout(() => {
        navigate({
          to: "/sign-in",
        });
      }, 500);
    }
  }, [data, isSuccess, reset, setUser, navigate]);

  const handleOpenCart = () => {
    if (!isAuthenticated) {
      toast.error("Please Sign In First");
    } else {
      onExpend();
    }
  };

  const handleSignOut = async () => {
    if (isAuthenticated) {
      await mutateAsync();
    } else {
      toast.error("Please Sign In First");
    }
  };

  return (
    <div className="ml-4 flex items-center justify-end gap-x-2 lg:ml-0">
      <div
        className={cn(
          "flex items-center justify-center",
          isMobile ? "gap-x-2" : "gap-x-4",
        )}
      >
        {!isAdmin && (
          <>
            <div className="hidden md:flex lg:flex xl:flex">
              <ToolTipHint label={t("ORDERS")} side="bottom">
                <IconButton href="/orders" icon={NotepadText} />
              </ToolTipHint>
            </div>
            <Button
              onClick={handleOpenCart}
              variant="ghost"
              size="icon"
              className="relative flex cursor-pointer flex-col items-center justify-center text-muted-foreground hover:text-primary"
            >
              {items.length > 0 && (
                <div className="absolute right-1 top-1 flex size-3 items-center justify-center rounded-full bg-red-700 text-white ring-1 ring-red-600">
                  <p className="text-xs">{items.length}</p>
                </div>
              )}
              <ShoppingCart className="size-5" />
            </Button>
          </>
        )}
        <ToggleTheme />
        <LanguagePicker />
        <div className="hidden md:flex lg:flex xl:flex">
          {!isAuthenticated ? (
            <Link to="/sign-in" className="justify-center text-center">
              <Button variant="ghost">
                {t("SIGN_IN")} <LogIn className="ml-1 mt-1 size-4" />
              </Button>
            </Link>
          ) : (
            <Button
              size="default"
              variant="ghost"
              className="flex flex-row gap-x-1"
              disabled={isPending}
              onClick={handleSignOut}
            >
              <ExternalLinkIcon className="size-3" />
              <p className="text-sm text-primary">{t("SIGN_OUT")}</p>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
