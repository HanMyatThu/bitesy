import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ToolTipHint } from "@/components/common/tooltip-hint";
import { useSidebar } from "@/store/use-sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export const ToggleSidebar = () => {
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);

  const label = collapsed ? "Expand" : "Collapse";

  return (
    <>
      {!collapsed && (
        <div className="mb-2 flex w-full items-center p-3 pl-6">
          <p className="font-semibold text-primary">Dashboard</p>
          <ToolTipHint label={label} side="right" asChild>
            <Button
              onClick={onCollapse}
              className="ml-auto h-auto p-2"
              size="sm"
              variant="ghost"
            >
              <ArrowLeftFromLine className="size-4" />
            </Button>
          </ToolTipHint>
        </div>
      )}
      {collapsed && (
        <div className="mb-4 hidden w-full items-center justify-center pt-4 lg:flex">
          <ToolTipHint label={label} side="right" asChild>
            <Button
              onClick={onExpand}
              className="h-auto p-2"
              size="sm"
              variant="ghost"
            >
              <ArrowRightFromLine className="size-4" />
            </Button>
          </ToolTipHint>
        </div>
      )}
    </>
  );
};

export const ToggleSidebarSkeleton = () => {
  return (
    <div className="mb-2 hidden w-full items-center justify-between p-3 pl-6 lg:flex">
      <Skeleton className="h-6 w-[100px]" />
      <Skeleton className="h-6 w-6" />
    </div>
  );
};
