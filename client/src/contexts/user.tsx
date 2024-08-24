import { ReactNode, createContext, useContext, useMemo, useState } from "react";

import { EUserRole, IUser } from "@/interfaces/Iuser";

interface IUserContextData {
  user: IUser;
  isNormalUser: boolean;
  isLoading: boolean;
}

interface IProps {
  children: ReactNode;
}

const UserContext = createContext<IUserContextData>({} as IUserContextData);

const UserProvider = ({ children }: IProps) => {
  const [user, setUser] = useState({} as IUser);

  //fetch API here
  const isLoading = false;
  const value = useMemo(() => {
    return {
      user,
      isNormalUser: user.role && user.role === EUserRole.USER,
    };
  }, [user]);

  return (
    <UserContext.Provider value={{ ...value, isLoading }}>
      {children}
    </UserContext.Provider>
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
