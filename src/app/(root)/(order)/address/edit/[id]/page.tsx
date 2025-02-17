"use client";

import { ADDRESS_TYPE } from "@/constants/api";
import AddressForm from "@/features/address/component/AddressForm";
import { IAddressFormFields } from "@/features/address/libs/validation";
import { useAddUserAddress } from "@/hooks/mutation/address";
import { useGetAddress } from "@/hooks/query/address";
import { add } from "lodash";
import { useParams } from "next/navigation";
import React from "react";

const EditAddressPage = () => {
  const { id } = useParams();

  const addressMutation = useAddUserAddress();
  const { data: addressData, isLoading } = useGetAddress(id as string);

  function onSubmit(data: IAddressFormFields) {
    addressMutation.mutate(data);
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
