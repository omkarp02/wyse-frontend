"use client";

import {
  addUserAddressApi,
  deleteAddressApi,
  deleteAddressByUserIdsApi,
  editUserAddressApi,
  IAddUserAddressApi,
  IDeleteAddressByUserIdsApi,
  IEditUserAddressApi,
  IResGetAddressApi,
  IToggleAddressIsPrimaryApi,
  toggleAddressIsPrimary,
} from "@/services/user/address";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "../use-toast";
import { getMutationErrorMsg } from "@/utils/errors/errorHandler";
import { useRouter } from "next/navigation";
import { GET_ADDRESS_LIST } from "@/constants/reactquery";

export const useAddUserAddress = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: IAddUserAddressApi) => addUserAddressApi(payload),
    onSuccess: (data, id) => {
      toast({
        title: "Address Added Successfully",
        variant: "default",
      });
      router.replace("/address/select");
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

export const useEditUserAddress = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IEditUserAddressApi) => editUserAddressApi(payload),
    onSuccess: (data, id) => {
      queryClient.setQueryData(
        [GET_ADDRESS_LIST],
        (curElem: IResGetAddressApi[]) => {
          const index = curElem.findIndex((e) => e.id === id.id);
          if (index != -1) {
            curElem[index] = id
          }
          return curElem;
        }
      );

      toast({
        title: "Address Edited Successfully",
        variant: "default",
      });
      router.replace("/address/select");
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

export const useUpdateAddressIsPrimary = () => {
  return useMutation({
    mutationFn: (payload: IToggleAddressIsPrimaryApi) =>
      toggleAddressIsPrimary(payload),
    onSuccess: (data, id) => {
      toast({
        title: "Address Updated Successfully",
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

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteAddressApi(id),
    onSuccess: (data, id) => {
      queryClient.setQueryData(
        [GET_ADDRESS_LIST],
        (curElem: IResGetAddressApi[]) => {
          const index = curElem.findIndex((e) => e.id === id);
          if (index != -1) {
            curElem.splice(index, 1);
          }

          return curElem;
        }
      );

      toast({
        title: "Address Deleted Successfully",
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

export const useDeleteAddressByUserIds = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IDeleteAddressByUserIdsApi) =>
      deleteAddressByUserIdsApi(payload),
    onSuccess: (data, id) => {
      queryClient.setQueryData(
        [GET_ADDRESS_LIST],
        (curElem: IResGetAddressApi[]) => {
          for (const item of id.ids) {
            const index = curElem.findIndex((e) => e.id === item);
            if (index != -1) {
              curElem.splice(index, 1);
            }
          }
          return curElem;
        }
      );

      toast({
        title: "Address Deleted Successfully",
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
