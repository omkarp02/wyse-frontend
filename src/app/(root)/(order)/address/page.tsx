"use client";

import { Button } from "@/components/ui/button";
import { useGetAddressList } from "@/hooks/query/address";
import Link from "next/link";
import React from "react";

const AddressPage = () => {
  const { data: addressData } = useGetAddressList();

  console.log(addressData, "<<<<<<<<<");

  return (
    <div className="px-1">
     
    </div>
  );
};

export default AddressPage;
