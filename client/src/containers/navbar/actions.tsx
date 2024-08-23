import { NotepadText, ShoppingCart } from "lucide-react";

import { UserAvatar } from "./avatar";
import { ToggleTheme } from "@/components/darktheme/toggle-theme";
import { IconButton } from "@/components/common/icon-button";
import { ToolTipHint } from "@/components/common/tooltip-hint";

export const Actions = () => {
  return (
    <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex lg:flex xl:flex">
          <ToolTipHint label="Orders" side="bottom">
            <IconButton
              href="/"
              icon={NotepadText}
            />
          </ToolTipHint>
        </div>
        <ToggleTheme />
        <IconButton
          href="/"
          icon={ShoppingCart}
        />
        <div className="hidden md:flex lg:flex xl:flex">
          <UserAvatar
            imageUrl="/images/logo.png"
            isActive
            size="default"
          />
        </div>
      </div>
    </div>
  );
};