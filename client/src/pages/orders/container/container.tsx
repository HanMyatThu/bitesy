import { NotepadText, StretchHorizontal } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Container = () => {
  return (
    <div>
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="flex w-full flex-row justify-between">
          <TabsTrigger className="w-full" value="account">
            <NotepadText className="size-4" />
            <p className="ml-2 text-xs font-semibold text-primary">
              Past Orders
            </p>
          </TabsTrigger>
          <TabsTrigger className="w-full" value="password">
            <StretchHorizontal className="size-4" />
            <p className="ml-2 text-xs font-semibold text-primary">
              Past Items
            </p>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};
