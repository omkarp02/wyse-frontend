import { addUserAddressApi, IAddUserAddressApi } from "@/services/user/address";
import { useMutation } from "@tanstack/react-query";
import { toast } from "../use-toast";
import { getMutationErrorMsg } from "@/utils/errors/errorHandler";

export const useAddUserAddress = () => {
  return useMutation({
    mutationFn: (payload: IAddUserAddressApi) => addUserAddressApi(payload),
    onSuccess: (data, id) => {
      toast({
        title: "Address Updated Successfully",
        variant: "default",
      });
    },
    onError: (error) => {
      let { msg } = getMutationErrorMsg(error, "Item");
      toast({
        title: msg,
        variant: "destructive",
      });
    },
  });
};
