import { Info, NotepadText, StretchHorizontal } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PastOrder } from "../components/past-order";
import { PastItems } from "../components/past-items";
import { useUser } from "@/contexts/user";
import { useOrderList } from "@/hooks/order-list";
import { Loading } from "@/components/common/loading";

export const Container = () => {
  const { isAuthenticated } = useUser();
  const { data, isLoading } = useOrderList();
  const { t } = useTranslation();

  if (!isAuthenticated) {
    return (
      <div className="my-auto flex h-[500px] w-full flex-col justify-center text-center">
        <div className="mx-auto">
          <div className="flex flex-col items-center justify-center gap-y-9">
            <Info className="size-12" stroke="red" />
            <div className="flex flex-row justify-center gap-x-2 px-2 text-center">
              <p className="font-bold uppercase text-primary">
                Please Sign in first.{" "}
                <Link
                  className="text-xs text-green-500 underline"
                  to="/sign-in"
                >
                  {t("GO_TO_LOGIN")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mt-20">
      <Tabs defaultValue="pastorders" className="w-full">
        <TabsList className="flex w-full flex-row justify-between">
          <TabsTrigger className="w-full" value="pastorders">
            <NotepadText className="size-4" />
            <p className="ml-2 text-xs font-semibold text-primary">
              {t("PAST_ORDERS")}
            </p>
          </TabsTrigger>
          <TabsTrigger className="w-full" value="pastitems">
            <StretchHorizontal className="size-4" />
            <p className="ml-2 text-xs font-semibold text-primary">
              {t("PAST_ITEMS")}
            </p>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="pastorders">
          <PastOrder data={data} />
        </TabsContent>
        <TabsContent value="pastitems">
          <PastItems data={data} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
