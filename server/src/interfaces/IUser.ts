import { EUserRole } from "@/enum/user-role";

export interface IUser {
  name: string;
  email: string;
  password: string;
  verified: boolean;
  tokens: string[];
  role: EUserRole;
}
