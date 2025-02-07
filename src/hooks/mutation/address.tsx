import { addUserAddressApi, IAddUserAddressApi } from "@/services/user/address";
import { useMutation } from "@tanstack/react-query";
import { toast } from "../use-toast";
import { getMutationErrorMsg } from "@/utils/errors/errorHandler";
import { useRouter } from "next/navigation";

export const useAddUserAddress = () => {

  const router = useRouter()

  return useMutation({
    mutationFn: (payload: IAddUserAddressApi) => addUserAddressApi(payload),
    onSuccess: (data, id) => {
      toast({
        title: "Address Added Successfully",
        variant: "default",
      });
      router.push("/address/select")
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
