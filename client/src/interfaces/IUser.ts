import { IPromotion } from "@/interfaces/IPromotion";

export interface IUser {
  id: string;
  name: string;
  email: string;
  address: string;
  verified: boolean;
  role: EUserRole;
  avatar: {
    id?: string;
    url?: string;
  };
  promotions: IPromotion[];
}

export enum EUserRole {
  ADMIN = "admin",
  USER = "user",
}
