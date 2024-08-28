import { Loader2Icon } from "lucide-react";

export const Loading = () => {
  return (
    <div className="my-auto flex h-[500px] w-full flex-col justify-center text-center">
      <div className="mx-auto">
        <Loader2Icon className="size-12 animate-spin" />
      </div>
    </div>
  );
};
