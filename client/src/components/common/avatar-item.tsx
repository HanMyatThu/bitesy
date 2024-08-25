import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarItemProps extends VariantProps<typeof Avatar> {
  imageUrl: string;
  size?: "default" | "lg";
}

const avatarSizes = cva("", {
  variants: {
    size: {
      default: "size-20",
      lg: "size-32",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export const AvatarItem = ({ imageUrl, size }: AvatarItemProps) => {
  return (
    <div className="relative">
      <Avatar className={cn("border border-background", avatarSizes({ size }))}>
        <AvatarImage src={imageUrl} className="object-cover" />
        <AvatarFallback>{"Item"}</AvatarFallback>
      </Avatar>
    </div>
  );
};
