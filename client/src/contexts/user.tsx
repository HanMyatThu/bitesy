import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import { EUserRole, IUser } from "@/interfaces/IUser";

interface IUserContextData {
  user: IUser;
  isAdmin: boolean;
  isAuthenticated: boolean;
  setUser: Dispatch<IUser>;
}

interface IProps {
  children: ReactNode;
}

const UserContext = createContext<IUserContextData>({} as IUserContextData);

const UserProvider = ({ children }: IProps) => {
  const [user, setUser] = useState({} as IUser);

  const value = useMemo(() => {
    return {
      user,
      isAuthenticated: !!user.role,
      isAdmin: user.role && user.role === EUserRole.ADMIN,
      setUser,
    };
  }, [user]);

  return (
    <UserContext.Provider value={{ ...value }}>{children}</UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useAuth must be used within a UserContextProvider");
  }

  return context;
};

export { UserProvider, useUser };
