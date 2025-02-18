import {
  GET_CART_DETAILS,
  GET_CART_DETAILS_OFFLINE,
  GET_PRODUCT_BATCH,
  GET_TOTAL_CART_COUNT,
} from "@/constants/reactquery";
import {
  getCartApi,
  getCartApiOffline,
  getTotalCartItemApi,
  IGetCartApiOffline,
} from "@/services/product/cart";
import { useBoundStore } from "@/store/store";
import { ICartItem } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export const useGetCart = () => {
  const token = useBoundStore((state) => state.token);
  const cartItems = useBoundStore((state) => state.cartItems);
  const hydrate = useBoundStore((state) => state.hydrated);

  if (token) {
    return useQuery<{ items: ICartItem[] }, Error>({
      queryKey: [GET_CART_DETAILS],
      queryFn: async () => {
        const data = await getCartApi();
        return data?.data;
      },
      enabled: hydrate,
    });
  } else {
    return useQuery<{ items: ICartItem[] }, Error>({
      queryKey: [GET_CART_DETAILS_OFFLINE],
      queryFn: async () => {
        console.log("<<<<<<<<<first>>>>>>>>>");
        const payload: IGetCartApiOffline = {
          productCode: [],
          size: [],
          cartId: [],
        };
        console.log("<<<<<<<<<second>>>>>>>>>");
        if (cartItems.length === 0) {
          console.log("<<<<<<<<<first>>>>>>>>>", cartItems.length);
          return { items: [] };
        }

        const productQuantity: {
          [key: string]: { quantity: number; cartId: string };
        } = {};
        console.log("<<<<<<<<<third>>>>>>>>>");
        for (const item of cartItems) {
          payload.productCode.push(item.productCode);
          payload.size.push(item.size);
          payload.cartId.push(item.cartId);
          productQuantity[item.cartId] = {
            quantity: item.quantity,
            cartId: item.cartId,
          };
        }
        console.log("<<<<<<<<<four>>>>>>>>>");

        const data = await getCartApiOffline(payload);
        console.log("<<<<<<<<<five>>>>>>>>>");

        const finalResult = data?.data;
        if (finalResult) {
          for (const item of finalResult) {
            item.quantity = productQuantity[item.cartId].quantity;
            item.cartId = productQuantity[item.cartId].cartId;
          }
          return { items: finalResult };
        }
        return { items: finalResult };
      },
      enabled: hydrate,
    });
  }
};

export const useGetTotalCartCount = () => {
  const token = useBoundStore((state) => state.token);
  const setTotalCartItem = useBoundStore((state) => state.setTotalCartItem);

  return useQuery<{ items: ICartItem[] }, Error>({
    queryKey: [GET_TOTAL_CART_COUNT],
    queryFn: async () => {
      const data = await getTotalCartItemApi();
      setTotalCartItem(data?.data?.totalItems);
      return data?.data;
    },
    enabled: !!token
  });
};
