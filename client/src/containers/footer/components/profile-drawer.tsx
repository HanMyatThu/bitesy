import { ArrowLeft, ChevronRight, Gem, Star } from "lucide-react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { GiftBox } from "./gift-box";

interface ProfileDrawerProps {
  children: React.ReactNode;
  bonuspoint: number;
  tier: string;
  tierpoint: number;
}

const giftBoxes = [
  {
    id: 1,
    price: 5,
    point: 50,
  },
  {
    id: 2,
    price: 7,
    point: 70,
  },
  {
    id: 3,
    price: 10,
    point: 100,
  },
  {
    id: 4,
    price: 15,
    point: 150,
  },
];

export const ProfileDrawer = ({
  children,
  bonuspoint,
  tier,
  tierpoint,
}: ProfileDrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="m-0 h-[95%] p-0">
        <DrawerHeader className="relative justify-center text-center">
          <DrawerClose>
            <ArrowLeft className="absolute left-5 top-3 size-6 cursor-pointer rounded-full p-1 ring-1 ring-red-400" />
          </DrawerClose>
          <DrawerTitle>User Rewards</DrawerTitle>
        </DrawerHeader>
        <div className="px-4">
          <div className="mt-7 flex min-h-10 w-full flex-col items-center justify-center gap-y-2 rounded-lg border border-black/55 shadow-md">
            <h5 className="mt-5 text-xs font-thin text-muted-foreground md:text-sm">
              Bonus Points
            </h5>
            <div className="flex flex-row items-center justify-center gap-x-2">
              <Star
                className="size-4 rounded-full bg-white p-1 ring-1 ring-black"
                fill="black"
              />
              <h1 className="text-sm font-bold text-primary md:text-lg">
                {bonuspoint}
              </h1>
              <ChevronRight className="size-4 cursor-pointer" />
            </div>
            <p className="mb-5 text-xs font-thin text-muted-foreground md:text-sm">
              Points will be expired on 30 October 2024
            </p>
          </div>
        </div>
        <ScrollArea className="mt-5 h-full bg-cyan-50">
          <div className="flex h-52 w-full items-center justify-center">
            <p className="text-wrap px-4">
              Get Ready to earn points and redeem amazing rewards. Stay turned!
            </p>
          </div>
          <div className="flex flex-row gap-x-6 border-y border-black/10 p-4">
            <Gem className="size-10 animate-bounce" stroke="black" />
            <div className="flex flex-col justify-center text-left">
              <h5 className="text-sm font-semibold text-primary">
                {" "}
                Royalty Tier - <span className="text-blue-500">{tier}</span>
              </h5>
              <p className="text-sm text-muted-foreground">
                Complete more orders to earn points (Current Point: {tierpoint})
              </p>
            </div>
          </div>
          <Separator className="h-2" />
          <div className="mb-8 mt-8 flex flex-col gap-y-5">
            <div className="flex w-full items-center justify-center">
              <img src="/images/logo.png" className="size-20 object-cover" />
            </div>
            <div className="flex flex-col justify-center gap-y-5 text-center">
              <p className="font-semibold text-primary"> Ready to Win? </p>
              <p className="font-bold text-primary">
                Turn Points into your favourite rewards
              </p>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-5 p-4 py-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
              {giftBoxes.map((gift) => (
                <GiftBox
                  key={gift.id}
                  price={gift.price}
                  point={gift.point}
                  disabled={gift.point > bonuspoint}
                />
              ))}
            </div>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};
