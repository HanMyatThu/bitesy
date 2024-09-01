import { Badge } from "@/components/ui/badge";
import { EOrderStatus } from "@/interfaces/IOrderStatus";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: EOrderStatus;
}

const getBadgeColrs = (status: string) => {
  switch (status) {
    case EOrderStatus.PAYMENT_PROCESSING: {
      return "dark:bg-white/80 bg-primary";
    }
    case EOrderStatus.ORDER_COMPLETE: {
      return "bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600";
    }
    case EOrderStatus.PREPARING: {
      return "hover:bg-yellow-700 dark:bg-yellow-700 dark:hover:bg-yellow-600 bg-yellow-600 ";
    }
    default: {
      return "bg-primary dark:bg-white/70";
    }
  }
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const label = status.replace("_", " ");

  return (
    <Badge
      className={cn("py-2 text-center font-medium", getBadgeColrs(status))}
    >
      {label}
    </Badge>
  );
};
