import { Button } from "@/components/ui/button";
import { NotepadText } from "lucide-react";
import { UserAvatar } from "./avatar";
import { ToggleTheme } from "@/components/darktheme/toggle-theme";

export const Actions =  () => {
  return (
    <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
    <div className="flex items-center gap-x-8">
      <Button
        size="icon"
        variant="ghost"
        className="text-muted-foreground hover:text-primary"
      >
        <a href="/" className="flex flex-row gap-x-4">
            <NotepadText className="size-5" />
          </a>
      </Button>
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