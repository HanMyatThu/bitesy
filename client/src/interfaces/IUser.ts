import { IPromotion } from "@/interfaces/IPromotion";

export interface IBonusPoint {
  _id: string;
  bonus_point: number;
  user: string;
}

export interface ITier {
  _id: string;
  type: string;
  point: number;
}

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
  tier: ITier;
  bonus_point: IBonusPoint;
}

export enum EUserRole {
  ADMIN = "admin",
  USER = "user",
}
