import { NotepadText } from "lucide-react";

import { UserAvatar } from "./avatar";
import { ToggleTheme } from "@/components/darktheme/toggle-theme";
import { IconButton } from "@/components/common/icon-button";

export const Actions =  () => {
  return (
    <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
      <div className="flex items-center gap-x-8">
        <IconButton
          href="/"
          icon={NotepadText}
        />
        <ToggleTheme />
        <UserAvatar
          imageUrl=""
          isActive
          size="default"
        />
      </div>
    </div>
  );
};