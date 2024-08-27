import { Suspense } from "react";
import { Container } from "./containers/container";

export const HomePage = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <Suspense fallback={<></>}>
        <Container />
      </Suspense>
    </div>
  );
};
