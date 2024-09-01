import { Loader2Icon } from "lucide-react";

export const Loading = () => {
  return (
    <div className="absolute z-50 my-auto flex h-full w-full flex-col justify-center bg-black bg-opacity-30 text-center">
      <div className="mx-auto">
        <Loader2Icon className="size-12 animate-spin" />
      </div>
    </div>
  );
};
