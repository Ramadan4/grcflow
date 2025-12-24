import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  name: string;
  email: string;
  avatarUrl?: string;
  initials: string;
  bgColor?: string;
  className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  name,
  email,
  avatarUrl,
  initials,
  bgColor = "bg-primary",
  className,
}) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Avatar className={cn("h-10 w-10", bgColor)}>
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback className={cn(bgColor, "text-white font-medium text-sm")}>
          {initials}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="font-medium text-foreground">{name}</p>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>
    </div>
  );
};
