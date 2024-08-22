import { EUserRole } from "@/enum/user-role";
import { IUser } from "@/interfaces/IUser";

export const mockUserData: IUser[] = [
  {
    name: "Draz",
    email: "draz.coding@gmail.com",
    password: "Pass123!@#",
    verified: true,
    tokens: [],
    role: EUserRole.ADMIN,
  },
  {
    name: "Han",
    email: "hanmyatthu111@gmail.com",
    password: "Pass123!@#",
    verified: true,
    tokens: [],
    role: EUserRole.USER,
  },
  {
    name: "test",
    email: "drazera123@gmail.com",
    password: "Pass123!@#",
    verified: true,
    tokens: [],
    role: EUserRole.USER,
  },
];
