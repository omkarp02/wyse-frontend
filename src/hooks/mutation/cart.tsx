import { IUpdateUserProfileApi } from "@/services/auth/user";
import { addToCartApi, IAddCartApi } from "@/services/product/cart";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { getMutationErrorMsg } from "@/utils/errors/errorHandler";

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
      const { msg } = getMutationErrorMsg(error, "Item");
      toast({
        title: msg,
        variant: "destructive",
      });
    },
  });
};
