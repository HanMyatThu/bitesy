import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps extends VariantProps<typeof Avatar> {
  imageUrl: string;
  isActive: boolean;
  size: "default" | "lg";
}

const avatarSizes = cva("", {
  variants: {
    size: {
      default: "size-8",
      lg: "size-14",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export const UserAvatar = ({
  imageUrl,
  isActive,
  size,
}: UserAvatarProps) => {

  return (
    <div className="relative">
      <Avatar
        className={cn(
          isActive && "ring-2 ring-rose-500 border border-background",
          avatarSizes({ size })
        )}
      >
        <AvatarImage src={imageUrl} className="object-cover" />
        <AvatarFallback>
          {"Profile"}
        </AvatarFallback>
      </Avatar>
      
    </div>
  );
};