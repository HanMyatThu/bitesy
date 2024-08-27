import { NotepadText, StretchHorizontal } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PastOrder } from "../components/past-order";
import { PastItems } from "../components/past-items";

export const Container = () => {
  return (
    <div className="mt-20">
      <Tabs defaultValue="pastorders" className="w-full">
        <TabsList className="flex w-full flex-row justify-between">
          <TabsTrigger className="w-full" value="pastorders">
            <NotepadText className="size-4" />
            <p className="ml-2 text-xs font-semibold text-primary">
              Past Orders
            </p>
          </TabsTrigger>
          <TabsTrigger className="w-full" value="pastitems">
            <StretchHorizontal className="size-4" />
            <p className="ml-2 text-xs font-semibold text-primary">
              Past Items
            </p>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="pastorders">
          <PastOrder />
        </TabsContent>
        <TabsContent value="pastitems">
          <PastItems />
        </TabsContent>
      </Tabs>
    </div>
  );
};
