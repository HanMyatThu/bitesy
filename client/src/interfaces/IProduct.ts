export enum EOrderCategory {
  MEAL = "meal",
  DRINK = "drink",
  CANDY = "candy",
  CONVENIENCE = "convenience",
  OTHER = "other",
}

export type productImage = {
  url: string;
  id: string;
};

export interface IProduct {
  _id: string;
  name: string;
  category: string;
  image: productImage | null;
  description: string;
  price: number;
}
