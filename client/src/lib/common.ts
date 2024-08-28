import { ICartItem } from "@/interfaces/ICartItem";
import { IProduct } from "@/interfaces/IProduct";

type ErrorWithMessage = {
  message: string;
};

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    return new Error(String(maybeError));
  }
}

export function getErrorMessage(error: unknown) {
  console.log(toErrorWithMessage(error));
  return toErrorWithMessage(error).message;
}

export function addCartItem(items: ICartItem[], data: IProduct) {
  const cartItem = {
    id: data._id,
    price: `${data.price}`,
    name: data.name,
    category: data.category,
    quantity: 1,
    imageUrl: data.image?.url,
  };
  const isItemExisted = items.find((item) => item.id === data._id);
  if (!isItemExisted) {
    items.push(cartItem);
  }
  return items;
}

export const getDayNameValue = (day?: number) => {
  switch (day) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "Sunday";
  }
};

export const subtractNonNegative = (a: number, b: number) => {
  return Math.max(a - b, 0);
};
