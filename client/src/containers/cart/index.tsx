import { useUser } from "@/contexts/user";
import { Container } from "./container";

export const Cart = () => {
  const { user, isAuthenticated } = useUser();

  if (!user || !isAuthenticated) {
    return null;
  }

  return <Container />;
};
