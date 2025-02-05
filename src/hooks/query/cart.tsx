import {
  GET_CART_DETAILS,
  GET_CART_DETAILS_OFFLINE,
  GET_PRODUCT_BATCH,
} from "@/constants/reactquery";
import {
  getCartApi,
  getCartApiOffline,
  IGetCartApiOffline,
} from "@/services/product/cart";
import { useBoundStore } from "@/store/store";
import { useQuery } from "@tanstack/react-query";

export const useGetCart = () => {
  const token = useBoundStore((state) => state.token);
  const cartItems = useBoundStore((state) => state.cartItems);

  if (token) {
    return useQuery({
      queryKey: [GET_CART_DETAILS],
      queryFn: async () => {
        const data = await getCartApi();
        return data?.data;
      },
    });
  } else {
    return useQuery({
      queryKey: [GET_CART_DETAILS_OFFLINE],
      queryFn: async () => {
        const payload: IGetCartApiOffline = { productCode: [], size: [] };

        const productQuantity: {
          [key: string]: { quantity: number; cartId: string };
        } = {};

        for (let item of cartItems) {
          payload.productCode.push(item.productCode);
          payload.size.push(item.size);
          productQuantity[item.productCode] = {
            quantity: item.quantity,
            cartId: item.cartId,
          };
        }

        const data = await getCartApiOffline(payload);
        const finalResult = data?.data
        if (finalResult) {
          for (let item of finalResult) {
            item.quantity = productQuantity[item.productCode].quantity
            item.cartId= productQuantity[item.productCode].cartId
          }
          return { items: finalResult };
        }
        return {items: finalResult}
      },
    });
  }
};

