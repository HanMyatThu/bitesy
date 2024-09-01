import { Wrapper } from "./wrapper";
import { ToggleSidebar, ToggleSidebarSkeleton } from "./toggle-sidebar";
import { SidebarItem } from "./sidebar-item";

export const SideBar = () => {
  return (
    <Wrapper>
      <ToggleSidebar />
      <div className="space-y-4 pt-4 lg:pt-0">
        <SidebarItem />
      </div>
    </Wrapper>
  );
};

export const SidebarSkeleton = () => {
  return (
    <aside className="z-60 fixed left-0 flex h-full w-[0px] flex-col border-r border-[#2D2E35] bg-[#18191f] lg:w-60">
      <ToggleSidebarSkeleton />
    </aside>
  );
};
