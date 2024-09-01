import { useSidebar } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const { collapsed } = useSidebar((state) => state);

  // return (
  // //   <aside className="fixed left-0 z-50 flex h-full w-[70px] flex-col border-r border-[#2D2E35] bg-[#18191f] lg:w-60">
  // //     <ToggleSidebarSkeleton />
  // //   </aside>
  // // );

  return (
    <aside
      className={cn(
        "fixed left-0 z-50 flex h-full w-60 flex-col border-r bg-[#e4e6e5] dark:border-[#2D2E35] dark:bg-[#18191f]",
        collapsed && "w-[70px]",
      )}
    >
      {children}
    </aside>
  );
};
