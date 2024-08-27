import { Link } from "@tanstack/react-router";
import { CircleX, Loader2Icon, Mail, Verified } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { verifyRoute } from "@/routes";
import { useVerifyUser } from "@/hooks/verify-user";
import { useEffect } from "react";

export const VerifyUser = () => {
  const { id, token } = verifyRoute.useSearch();
  const { mutateAsync, data, isPending, isSuccess, isError } = useVerifyUser();

  useEffect(() => {
    if (id && token) {
      mutateAsync({ id, token });
    }
  }, [mutateAsync, id, token]);

  useEffect(() => {
    if (data) {
      toast.success(data?.message);
    }
  }, [data]);

  if (!id || !token || isError) {
    return (
      <div className="my-auto flex h-[500px] w-full flex-col justify-center text-center">
        <div className="mx-auto">
          <div className="flex flex-col items-center justify-center gap-y-9">
            <CircleX className="size-12" stroke="red" />
            <div className="flex flex-row gap-x-2 px-2">
              <p className="font-bold uppercase text-primary">
                Unable to verified your email. Please try again.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="my-auto flex h-[500px] w-full flex-col justify-center text-center">
        <div className="mx-auto">
          <Loader2Icon className="size-12 animate-spin" />
        </div>
      </div>
    );
  }

  if (isSuccess && data) {
    return (
      <div className="my-auto flex h-screen w-full flex-col justify-center bg-blue-100 text-center dark:bg-neutral-900">
        <div className="mx-auto flex w-[384px] flex-col items-center justify-center gap-y-4 rounded-3xl border bg-white/60 p-4 shadow-lg dark:bg-blue-950 md:gap-y-6">
          <div className="h-24 w-24">
            <img src="/images/logo.png" className="object-cover" />
          </div>
          <div className="flex justify-center gap-x-3 text-center">
            <Mail className="mt-1 size-5" stroke="green" />
            <p className="text-lg font-bold uppercase text-primary">
              Your Email is Verified
            </p>{" "}
            <Verified className="mt-1 size-5" stroke="green" />
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-muted-foreground md:text-sm">
              You have successfully verified your email. You can start using
              bitesy.
            </p>
          </div>
          <Link to="/sign-in">
            <Button variant="link" size="sm">
              Go to Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }
};
