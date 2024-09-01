import { SideBar } from "@/containers/sidebar";
import { Container } from "./container";
import { Suspense } from "react";
import { OrderSettings } from "./order-settings";

export const DashBoard = () => {
  return (
    <div className="flex h-full w-full pt-20">
      <Suspense fallback={<></>}>
        <SideBar />
      </Suspense>
      <Container>
        <OrderSettings />
      </Container>
    </div>
  );
};
