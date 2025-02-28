"use client";

import { ADDRESS_TYPE } from "@/constants/api";
import AddressForm from "@/features/address/component/AddressForm";
import { IAddressFormFields } from "@/features/address/libs/validation";
import {
  useAddUserAddress,
  useEditUserAddress,
} from "@/hooks/mutation/address";
import { useGetAddress } from "@/hooks/query/address";
import { add } from "lodash";
import { useParams } from "next/navigation";
import React from "react";

const EditAddressPage = () => {
  const { id } = useParams();

  const addressMutation = useEditUserAddress();
  const { data: addressData, isLoading } = useGetAddress(id as string);

  function onSubmit(data: IAddressFormFields) {
    if (id && typeof id === "string") {
      addressMutation.mutate({
        address: data.address,
        id: id,
        isPrimary: data.isPrimary,
        type: data.type,
      });
    }
  }

  if (id === null || Array.isArray(id)) return <></>;

  return (
    <AddressForm
      isLoading={addressMutation.isPending || isLoading}
      onSubmit={onSubmit}
      isEditable={true}
      defaultValue={{
        address: addressData?.address,
        isPrimary: addressData?.isPrimary,
        type: addressData?.type as ADDRESS_TYPE,
      }}
    />
  );
};

export default EditAddressPage;
