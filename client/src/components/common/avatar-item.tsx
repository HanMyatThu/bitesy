import { type VariantProps } from "class-variance-authority";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps extends VariantProps<typeof Avatar> {
  imageUrl: string;
}

export const UserAvatar = ({ imageUrl }: UserAvatarProps) => {
  return (
    <div className="relative">
      <Avatar>
        <AvatarImage src={imageUrl} className="object-cover" />
        <AvatarFallback>{"Profile"}</AvatarFallback>
      </Avatar>
    </div>
  );
};
