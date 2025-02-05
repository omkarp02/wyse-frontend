import { IUpdateUserProfileApi } from "@/services/auth/user";
import {
  addToCartApi,
  IAddCartApi,
  IUpdateCartItemApi,
  updateCartItemApi,
} from "@/services/product/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { getMutationErrorMsg } from "@/utils/errors/errorHandler";
import { GET_CART_DETAILS } from "@/constants/reactquery";
import { ICartItem } from "@/types/api";
import _ from "lodash"
import { ERROR_STATUS } from "@/utils/errors/errors";

export const useAddToCart = () => {
  return useMutation({
    mutationFn: (payload: IAddCartApi) => addToCartApi(payload),
    onSuccess: (data, id) => {
      toast({
        title: "Added to Bag",
        variant: "default",
      });
    },
    onError: (error) => {
      let { msg,  status} = getMutationErrorMsg(error, "Item");
      if (status === ERROR_STATUS.ALREADY_EXIST) {
        msg = "Item already exist in the cart"
      }
      toast({
        title: msg,
        variant: "destructive",
      });
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IUpdateCartItemApi) => updateCartItemApi(payload),
    onSuccess: (data, id) => {
      // queryClient.setQueryData([GET_CART_DETAILS], (curElem: any) => {
      //   const index = curElem.items.findIndex(
      //     (e: ICartItem) => e.cartId === id.cartId
      //   );
      //   if (index != -1) {
      //     if (id.size) {
      //       curElem.items[index].size = id.size;
      //     } else if (id.quantity) {
      //       curElem.items[index].quantity = id.quantity;
      //     }
      //   }

      //   const deep = _.cloneDeep(curElem);
      //   console.log({deep})
      //   return deep;
      // });

      queryClient.refetchQueries({queryKey: [GET_CART_DETAILS]})
    },
    onError: (error) => {
      const { msg } = getMutationErrorMsg(error, "Item");
      toast({
        title: msg,
        variant: "destructive",
      });
    },
  });
};
