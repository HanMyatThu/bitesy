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
  promotions: string[];
}

export enum EUserRole {
  ADMIN = "Admin",
  USER = "User",
}
