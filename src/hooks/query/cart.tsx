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

  if (token) {
    return useQuery<{ items: ICartItem[] }, Error>({
      queryKey: [GET_CART_DETAILS],
      queryFn: async () => {
        const data = await getCartApi();
        return data?.data;
      },
    });
  } else {
    return useQuery<{ items: ICartItem[] }, Error>({
      queryKey: [GET_CART_DETAILS_OFFLINE],
      queryFn: async () => {
        const payload: IGetCartApiOffline = {
          productCode: [],
          size: [],
          cartId: [],
        };

        if (cartItems.length === 0) {
          return { items: [] };
        }

        const productQuantity: {
          [key: string]: { quantity: number; cartId: string };
        } = {};

        for (let item of cartItems) {
          payload.productCode.push(item.productCode);
          payload.size.push(item.size);
          payload.cartId.push(item.cartId);
          productQuantity[item.cartId] = {
            quantity: item.quantity,
            cartId: item.cartId,
          };
        }

        const data = await getCartApiOffline(payload);
        const finalResult = data?.data;
        if (finalResult) {
          for (let item of finalResult) {
            item.quantity = productQuantity[item.cartId].quantity;
            item.cartId = productQuantity[item.cartId].cartId;
          }
          return { items: finalResult };
        }
        return { items: finalResult };
      },
    });
  }
};

export const useGetTotalCartCount = () => {
  const token = useBoundStore((state) => state.token);
  const setTotalCartItem = useBoundStore((state) => state.setTotalCartItem);

  if (token) {
    return useQuery<{ items: ICartItem[] }, Error>({
      queryKey: [GET_TOTAL_CART_COUNT],
      queryFn: async () => {
        const data = await getTotalCartItemApi();
        setTotalCartItem(data?.data?.totalItems);
        return data?.data;
      },
    });
  }
};
