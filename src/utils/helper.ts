import { useBoundStore } from "@/store/store";
import { clsx, type ClassValue } from "clsx";
import { ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createSearchParamsUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;
  return `${pathname}${queryString}`;
};

let persistedToken: string | null = null;

export const getToken = () => {
  if (!persistedToken) {
    const { token } = useBoundStore.getState();
    persistedToken = token;
    return token;
  } else {
    return persistedToken;
  }
};

export const getActualPrice = (price: number, discount: number) => {
  return Math.round(price / (1 - discount / 100));
};

export const getDiscountOnPrice = (price: number, discount: number) => {
  return Math.round(getActualPrice(price, discount) * (discount / 100));
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const generateProductUrl = (
  slug: string,
  batchCode: string,
  productId: string
): string => {
  return `/products/${slug}?id=${productId}&batch=${batchCode}`;
};

export function generateRandomNumber(n: number) {
  const min = Math.pow(10, n - 1); // minimum number with n digits
  const max = Math.pow(10, n) - 1; // maximum number with n digits
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


