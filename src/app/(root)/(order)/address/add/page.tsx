"use client"

import AddressForm from "@/features/address/component/AddressForm";
import { IAddressFormFields } from "@/features/address/libs/validation";
import { useAddUserAddress } from "@/hooks/mutation/address";
import React from "react";

const defaultValue = {
  address: {
    country: "India",
  },
};

const AddAddressPage = () => {
  const addressMutation = useAddUserAddress();

  function onSubmit(data: IAddressFormFields) {
    addressMutation.mutate(data);
  }

  return (
    <AddressForm
      isLoading={addressMutation.isPending}
      onSubmit={onSubmit}
      defaultValue={defaultValue}
    />
  );
};

export default AddAddressPage;
