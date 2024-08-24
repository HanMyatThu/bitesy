import { Suspense } from "react";
import { Container } from "./containers/container";

export const HomePage = () => {
  return (
    <div className="flex h-full w-full flex-col p-8">
      <Suspense fallback={<></>}>
        <Container />
      </Suspense>
    </div>
  );
};
