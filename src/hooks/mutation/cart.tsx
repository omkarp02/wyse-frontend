import { IUpdateUserProfileApi } from "@/services/auth/user";
import {
  addToCartApi,
  deleteCartItemApi,
  IAddCartApi,
  IUpdateCartItemApi,
  updateCartItemApi,
} from "@/services/product/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { getMutationErrorMsg } from "@/utils/errors/errorHandler";
import {
  GET_CART_DETAILS,
  GET_CART_DETAILS_OFFLINE,
  GET_PRODUCT_VARIATION,
} from "@/constants/reactquery";
import { ICartItem } from "@/types/api";
import _, { update } from "lodash";
import { ERROR_STATUS } from "@/utils/errors/errors";
import { useBoundStore } from "@/store/store";

export const useAddToCart = () => {
  const setTotalCartItem = useBoundStore((state) => state.setTotalCartItem);
  const curTotalCartItem = useBoundStore((state) => state.totalCartItem);

  return useMutation({
    mutationFn: (payload: IAddCartApi) => addToCartApi(payload),
    onSuccess: (data, id) => {
      setTotalCartItem(curTotalCartItem + 1);
      toast({
        title: "Added to Bag",
        variant: "default",
      });
    },
    onError: (error) => {
      const { msg, status } = getMutationErrorMsg(error, "Item");
      let cMsg = msg
      if (status === ERROR_STATUS.ALREADY_EXIST) {
        cMsg = "Item already exist in the cart";
      }
      toast({
        title: msg,
        variant: "destructive",
      });
    },
  });
};

type IUpdateCartItem = {
  payload : IUpdateCartItemApi,
  prevQty?: number
}

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  const setTotalCartItem = useBoundStore((state) => state.setTotalCartItem);
  const curTotalCartItem = useBoundStore((state) => state.totalCartItem);


  return useMutation({
    mutationFn: (payload: IUpdateCartItem) => {
      return updateCartItemApi(payload.payload);
    },
    onSuccess: (data, id) => {
      if(id.prevQty && id.payload?.quantity){
        let totalItems = curTotalCartItem
        totalItems = id.prevQty
        setTotalCartItem(totalItems + id.payload.quantity)
      }
      // queryClient.setQueryData([GET_CART_DETAILS], (curElem: any) => {
      //   const index = curElem.items.findIndex(
      //     (e: ICartItem) => e.cartId === id.cartId
      //   );
      //   console.log(curElem.items[index], index, "<<<<<<<<")

      //   if (index != -1) {
      //     if (id.size) {
      //       curElem.items[index].size = id.size;
      //     } else if (id.quantity) {
      //       curElem.items[index].quantity = id.quantity;
      //     }
      //   }

      //   const deep = _.cloneDeep(curElem);
      //   console.log({ deep });
      //   return deep;
      // });

      queryClient.refetchQueries({ queryKey: [GET_CART_DETAILS] });
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

export const useDeleteCartItem = () => {
  const setTotalCartItem = useBoundStore((state) => state.setTotalCartItem);
  const curTotalCartItem = useBoundStore((state) => state.totalCartItem);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cartId: string) => deleteCartItemApi(cartId),
    onSuccess: (data, id) => {
      queryClient.setQueryData([GET_CART_DETAILS], (curElem: any) => {
        const index = curElem.items.findIndex(
          (e: ICartItem) => e.cartId === id
        );
        if (index != -1) {
          setTotalCartItem(curTotalCartItem - curElem.items[index].quantity);
          curElem.items.splice(index, 1);
        }
        return curElem;
      });
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
